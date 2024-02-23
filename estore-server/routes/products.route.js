import express from 'express'
import { 
    getCategories, 
    createCategories,
    deleteCategories,
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    updateRating,
    updateComment
 } from '../controllers/products.controller.js';
import { isAdmin, verifyToken } from '../utils/verifyUser.js';



const router = express.Router();
router.get('/categories/all',getCategories)
router.post('/categories/add',isAdmin ,createCategories)
router.delete('/categories/delete/:id',isAdmin ,deleteCategories)
router.get('/all',getAllProducts)
router.get('/:id',getProductById)
router.post('/add',isAdmin ,createProduct)
router.put('/update/:id',isAdmin ,updateProduct)
router.delete('/delete/:id',isAdmin ,deleteProduct)
router.post('/update-rating', verifyToken,updateRating)
router.post('/update-comment', verifyToken,updateComment)




export default router;