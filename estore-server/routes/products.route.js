import express from 'express'
import { 
    getCategories, 
    createCategories,
    createProduct,
    getAllProducts,
    getProductById
 } from '../controllers/products.controller.js';


const router = express.Router();
router.get('/categories/all', getCategories)
router.post('/categories/add', createCategories)
router.get('/all', getAllProducts)
router.get('/:id', getProductById)
router.post('/add', createProduct)




export default router;