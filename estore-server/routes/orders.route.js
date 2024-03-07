import express from 'express'
import { createOrders, getPastOrders, getAllOrders } from '../controllers/orders.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/add',verifyToken,createOrders);
router.get('/get',verifyToken,getPastOrders);
router.get('/getallorders',verifyToken,getAllOrders);
export default router;