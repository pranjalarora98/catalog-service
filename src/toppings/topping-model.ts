import mongoose from "mongoose";
import { ToppingType } from "../types";

const ToppingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    tenantId: {
        type: String,
        required: true,
    },
    isPublish: {
        type: Boolean,
        required: true,
    },
});

const ToppingModel = mongoose.model<ToppingType>(
    "ToppingSchema",
    ToppingSchema,
);

export default ToppingModel;
