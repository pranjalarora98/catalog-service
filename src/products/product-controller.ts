/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Request, Response } from "express";
import ProductModal from "./product-model";
import { S3Storage } from "../services/S3Storage";
import KafkaBroker from "../KafkaBroker";
import { UploadedFile } from "express-fileupload";
import KafkaFactory from "../KafkaFactory";

interface PriceConfiguration {
    [key: string]: {
        priceType: string;
        availableOptions: Record<string, number>;
    };
}

interface Category {
    name: string;
    priceConfiguration: object;
    attributes: unknown;
}

interface productType {
    name: string;
    description: string;
    image: string;
    tenantId: number;
    isPublish: boolean;
    priceConfiguration: PriceConfiguration;
    categoryId: string;
    category: Category;
    _id: string;
}

const kafka = KafkaFactory();

export class ProductController {
    s3 = new S3Storage();
    async create(req: Request, res: Response) {
        console.log("control-body", req.body, req.files);
        await kafka.connect();
        try {
            const { priceConfiguration, category } = req.body;

            const parsedPriceConfiguration =
                typeof priceConfiguration === "string"
                    ? JSON.parse(priceConfiguration)
                    : priceConfiguration;

            const parsedImage =
                typeof priceConfiguration === "string"
                    ? JSON.parse(category)
                    : category;
            const { name, description, tenantId, isPublish, categoryId } =
                req.body as productType;
            const image = req?.files?.image;
            if (!image) return;
            const uploadedFile = Array.isArray(image) ? image[0] : image;
            const buffer: Buffer = uploadedFile?.data;
            const res1 = await this.s3.upload(buffer, uploadedFile.name);
            const product = {
                name,
                description,
                tenantId,
                isPublish,
                image: res1,
                priceConfiguration: parsedPriceConfiguration,
                categoryId,
                category: parsedImage,
            };

            const newProduct = new ProductModal(product);
            const q: productType = await newProduct.save();

            await kafka.sendMessage("product", [
                {
                    id: q._id,
                    priceConfiguration,
                },
            ]);

            res.status(200).json({ data: q });
        } catch (err) {
            console.log(err);
        }
    }

    async getAllProducts(req: Request, res: Response) {
        const { page, limit } = req.query;

        const res1 = await ProductModal.find();
        res.status(200).json({ data: res1 });
    }
}
