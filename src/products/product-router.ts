import express from "express";
import { ProductController } from "./product-controller";

const router = express.Router();
const productController = new ProductController();

router.post("/api/catalog/products", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    productController.create(req, res);
});

router.get("/api/catalog/products", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    productController.getAllProducts(req, res);
});

export default router;
