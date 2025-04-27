import express from "express";
import ToppingController from "./topping-controller";
import { Response } from "express";
import ToppingModel from "./topping-model";

const router = express.Router();
const toppingController = new ToppingController();

router.post("/topping/create", (req, res) => {
    toppingController.create(req, res);
});

router.get("/toppings", (req, res) => {
    toppingController.getAll(req, res);
});

export default router;
