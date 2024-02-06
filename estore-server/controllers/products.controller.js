import Category from "../models/categories.model.js";

export const createCategories = async (req, res, next) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}