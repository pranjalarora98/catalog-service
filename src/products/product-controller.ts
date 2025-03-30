/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Request, Response } from "express";
import ProductModal from "./product-model";

interface PriceConfiguration {
    [key: string]: {
        priceType: string;
        availableOptions: Record<string, number>;
    };
}

interface productType {
    name: string;
    description: string;
    image: string;
    tenantId: number;
    isPublish: boolean;
    priceConfiguration: PriceConfiguration;
}

export class ProductController {
    async create(req: Request, res: Response) {
        console.log("control-body", req.body, req.files);
        try {
            const { priceConfiguration } = req.body;
            const parsedPriceConfiguration =
                typeof priceConfiguration === "string"
                    ? JSON.parse(priceConfiguration)
                    : priceConfiguration;
            const { name, description, image, tenantId, isPublish } =
                req.body as productType;
            const product = {
                name,
                description,
                image,
                tenantId,
                isPublish,
                priceConfiguration: parsedPriceConfiguration,
            };
            const newProduct = new ProductModal(product);
            const q = await newProduct.save();
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
