import express from "express";
import { ProductController } from "./product-controller";

const router = express.Router();
const productController = new ProductController();

router.post("/api/catalog/products", (req, res) => {
    void productController.create(req, res);
});

router.get("/api/catalog/products", (req, res) => {
    void productController.getAllProducts(req, res);
});

router.get("/api/catalog/product/:productId", (req, res) => {
    void productController.getById(req, res);
});

export default router;
