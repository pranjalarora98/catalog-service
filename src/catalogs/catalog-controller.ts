/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Request } from "express";
import CatalogModel from "./catalog-model";

interface CatalogBody {
    name: string;
    priceConfiguration: object;
    attributes: object;
}

class CatalogController {
    async create(req: Request) {
        const { name, priceConfiguration, attributes } =
            req.body as CatalogBody;

        const newd = new CatalogModel({
            name,
            priceConfiguration,
            attributes,
        });

        const res1 = await newd.save();
        return res1;
    }

    async update(req: Request) {
        const { id } = req.query;
        const data: any = req.body;

        const updatedDoc = await CatalogModel.findByIdAndUpdate(
            id,
            { ...data },
            { new: true },
        );

        return updatedDoc;
    }

    async getAll() {
        const results = await CatalogModel.find();
        return results;
    }

    async getById(id: string) {
        const category = await CatalogModel.findById(id);
        return category;
    }
}

export default CatalogController;
