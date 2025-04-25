import mongoose from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const priceConfigurationSchema = new mongoose.Schema({
    priceType: {
        type: String,
        required: true,
    },
    availableOptions: {
        type: Map,
        of: Number,
    },
});

const Category = new mongoose.Schema({
    name: {
        type: String,
    },
    priceConfiguration: {
        type: Object,
    },
    attributes: {
        type: Array,
        required: true,
    },
});

const productSchema = new mongoose.Schema(
    {
        categoryId: {
            type: String,
            required: true,
        },
        category: {
            type: Category,
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: false,
        },
        priceConfiguration: {
            type: Map,
            of: priceConfigurationSchema,
        },
        tenantId: {
            type: String,
            required: true,
        },
        isPublish: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

productSchema.plugin(aggregatePaginate);

const ProductModal = mongoose.model("ProductModel", productSchema);
export default ProductModal;
