/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
 name: {
    type: String,
    required: true,
 },
 priceConfiguration: {
    type: Object,
    required: true,
 },
 attributes: {
    type: Array,
    required: true,
 }
},{timestamps:true})

const CatalogModal = mongoose.model('CatalogModel',userSchema);
export default CatalogModal;