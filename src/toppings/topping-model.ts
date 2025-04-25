import mongoose from "mongoose";

const ToppingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
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

const ToppingModel = mongoose.model("ToppingSchema", ToppingSchema);

export default ToppingModel;
