import { Request, Response } from "express";
import ToppingModel from "./topping-model";
import KafkaFactory from "../KafkaFactory";
import { ToppingType } from "../types";

const kafka = KafkaFactory();
class ToppingController {
    async create(req: Request, res: Response) {
        const { name, price, tenantId, isPublish } = req.body as ToppingType;

        const newTopping = {
            name,
            price,
            tenantId,
            isPublish,
        } as ToppingType;

        const topping = new ToppingModel(newTopping);
        const toppingRes = await topping.save();

        await kafka.sendMessage("topping", [
            {
                value: JSON.stringify({
                    id: toppingRes._id,
                    toppingRes,
                }),
            },
        ]);

        res.status(200).json({ data: toppingRes });
    }

    async getAll(req: Request, res: Response) {
        const toppingList = await ToppingModel.find().lean();
        const toppings = toppingList.map((item) => {
            const { _id, ...rest } = item;
            return { id: _id, ...rest };
        });
        res.status(200).json(toppings || []);
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params;
        const topping = await ToppingModel.findById(id);
        res.status(200).json({ data: topping });
    }
}

export default ToppingController;
