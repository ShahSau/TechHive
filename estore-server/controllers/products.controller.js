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

export const deleteCategories = async (req, res, next) => {
    try {
        await Category.deleteOne({ id: req.params.id });
        res.status(200).json({ message: 'Category deleted' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createProduct = async (req, res, next) => {
    try {
        const product = new Products(req.body);
        console.log(req.body.category_id, typeof req.body.category_id);
        const category = await Category.findOne({
            id: req.body.category_id
        });
        console.log("DDDDD",category);
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

export const updateProduct = async (req, res, next) => {
    try {
        const product = await Products.findOne({ id: req.params.id });
        if (req.body.product_name) {
            product.product_name = req.body.product_name;
        }
        if (req.body.product_img) {
            product.product_img = req.body.product_img;
        }
        if (req.body.product_description) {
            product.product_description = req.body.product_description;
        }
        if (req.body.price) {
            product.price = req.body.price;
        }
        if (req.body.ratings) {
            product.ratings = req.body.ratings;
        }
        
        if (req.body.category_id) {
            product.category_id = req.body.category_id;
        }
        if (req.body.parent_category_id) {
            product.parent_category_id = req.body.parent_category_id;
        }
        if (req.body.keywords) {
            product.keywords = req.body.keywords;
        }
        await product.save();
        res.status(200).json({ message: 'Product updated', product });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        await Products.deleteOne({ id: req.params.id });
        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        res.status(404).json({ message: error.message });
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

export const updateRating = async (req, res, next) => {
    try {
        const product = await Products.findOne({ id: req.body.id });
        product.totalRatings = product.totalRatings + req.body.rating;
        product.numberOfVaotes = product.numberOfVaotes + 1;
        product.ratings = product.totalRatings / product.numberOfVaotes;
        await product.save();
        res.status(200).json({ message: 'Rating updated', product });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateComment = async (req, res, next) => {
    try {
        const product = await Products.findOne({ id: req.body.id });
        product.commentsList.push(req.body.comment);
        await product.save();
        res.status(200).json({ message: 'Comment updated', product });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}