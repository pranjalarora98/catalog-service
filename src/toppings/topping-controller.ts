import { Request, Response } from "express";
import ToppingModel from "./topping-model";

interface ToppingType {
    name: string;
    age: number;
    price: number;
    tenantId: string;
    isPublish: boolean;
}

class ToppingController {
    async create(req: Request, res: Response) {
        const { name, age, price, tenantId, isPublish } =
            req.body as ToppingType;
        const newTopping = {
            name,
            age,
            price,
            tenantId,
            isPublish,
        } as ToppingType;
        const topping = new ToppingModel(newTopping);
        const toppingRes = await topping.save();
        res.status(200).json({ data: toppingRes });
    }

    async getAll(req: Request, res: Response) {
        const toppingList = await ToppingModel.find();
        res.status(200).json(toppingList || []);
    }
}

export default ToppingController;
