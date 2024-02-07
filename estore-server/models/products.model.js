import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true,
        unique: true,
    },
    product_name: {
        type: String,
        required: true,
    },
    product_img: {
        type: String,
        required: true,
    },
    product_description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    ratings: {
        type: Number,
        required: true,
    },
    category_id: {
        type: Number,
        required: true,
    },
    parent_category_id:{
        type: Number,
        required: true,
    },
    keywords: [{
        type: String,
    }]
    });

const Products = mongoose.model('Product', productSchema);

export default Products;