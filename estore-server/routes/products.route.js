import express from 'express'
import { getCategories, createCategories } from '../controllers/products.controller.js';


const router = express.Router();
router.get('/categories/all', getCategories)
router.post('/categories/add', createCategories)



export default router;