/* eslint-disable @typescript-eslint/no-unsafe-call */
import express from "express";
import { globalErrorHandler } from "./common/middlewares/globalErrorHandler";
import categoryRouter from "../src/catalogs/category-router";
import productRouter from "../src/products/product-router";
import toppingRouter from "../src/toppings/topping-router";
import fileUpload from "express-fileupload";
import cors from "cors";

const app = express();
app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(categoryRouter);
app.use(productRouter);
app.use(toppingRouter);
app.use(globalErrorHandler);

export default app;
