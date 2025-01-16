import { Schema, model } from "mongoose";

const product_schema = new Schema({
    name: String,
    price: Number,
    category: String,
    tags: [String],
    inStock: Boolean
});

const Product = model("Product", product_schema);

export default Product;