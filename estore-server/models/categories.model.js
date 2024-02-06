import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        required: true,
        unique: true,
    },
    // img: {
    //     type: String,
    //     required: true,
    // },
    parent_category_id: {
        type: Number,
        default:null,
    },
    });

const Category = mongoose.model('Category', categorySchema);

export default Category;