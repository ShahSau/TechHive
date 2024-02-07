import Category from "../models/categories.model.js";
import Products from "../models/products.model.js";

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

export const createProduct = async (req, res, next) => {
    try {
        const product = new Products(req.body);
        const category = await Category.findOne({
            id: req.body.category_id
        });
        if (!category) {
            return res.status(404).json({ message: 'Parent category not found' });
        }
        product.parent_category_id = category.parent_category_id;
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllProducts = async (req, res, next) => {
    
    if (req.query.maincategoryid && req.query.keyword){
        try {
            const products = await Products.find({
                parent_category_id: req.query.maincategoryid,
                keywords: { $in: [req.query.keyword] }});
            res.status(200).json(products);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    else if(req.query.maincategoryid){
        try {
            const products = await Products.find({
                parent_category_id: req.query.maincategoryid});
            res.status(200).json(products);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    else if(req.query.subcategoryid){
        try {
            const products = await Products.find({
                category_id: req.query.subcategoryid});
            res.status(200).json(products);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    else if(req.query.keyword){
        try {
            const products = await Products.find({
                keywords: { $in: [req.query.keyword] }});
            res.status(200).json(products);
        }
        catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    else{
        try {
            const products = await Products.find();
            res.status(200).json(products);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}

export const getProductById = async (req, res, next) => {
    try {
        const product = await Products.findOne({id: req.params.id});
        res.status(200).json([product]);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}