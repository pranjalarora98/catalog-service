import express from "express";
import ToppingController from "./topping-controller";
// import { Response } from "express";

const router = express.Router();
const toppingController = new ToppingController();

router.post("/topping/create", (req, res) => {
    void toppingController.create(req, res);
});

router.get("/toppings", (req, res) => {
    void toppingController.getAll(req, res);
});

router.get("/topping/:id", (req, res) => {
    void toppingController.getById(req, res);
});

export default router;
