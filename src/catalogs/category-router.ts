/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import CategoryController from "./catalog-controller";

const router = express.Router();
const categoryController = new CategoryController();

router.post("/create", async (req, res) => {
    const resp = await categoryController.create(req);
    res.status(200).json(resp);
});

router.put("/update", async (req, res) => {
    const resp = await categoryController.update(req);
    res.status(200).json(resp);
});

router.get("/api/catalog/categories", async (req, res) => {
    const resp = await categoryController.getAll();
    res.status(200).json(resp);
});

router.get("/api/catalog/categories/:id", async (req, res) => {
    const id = req.params.id;
    console.log("hello", id);
    const resp = await categoryController.getById(id);
    res.status(200).json(resp);
});

export default router;
