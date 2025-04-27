import { Request, Response } from "express";
import ToppingModel from "./topping-model";
import KafkaFactory from "../KafkaFactory";

interface ToppingType {
    name: string;
    age: number;
    price: number;
    tenantId: string;
    isPublish: boolean;
}

let kafka = KafkaFactory();
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

        await kafka.sendMessage("topping", [
            {
                id: toppingRes._id,
                toppingRes,
            },
        ]);

        res.status(200).json({ data: toppingRes });
    }

    async getAll(req: Request, res: Response) {
        const toppingList = await ToppingModel.find().lean();
        const toppings = toppingList.map((item) => {
            const { _id, ...rest } = item;
            console.log("rest", rest);
            return { id: _id, ...rest };
        });
        res.status(200).json(toppings || []);
    }
}

export default ToppingController;
