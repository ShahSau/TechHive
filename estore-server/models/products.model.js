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
    // once we start getting the new data this(ratings) will be removed
    ratings: {
        type: Number,
        required: true,
    },
    totalRatings:{
        type: Number,
        default: 0,
    },
    numberOfVaotes:{
        type: Number,
        default: 0,
    },
    commentsList: [{
        commenter: {
            type: String,
        },
        comment: {
            type: String,
        },
        ratings: {
            type: Number,
        }
    }],
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