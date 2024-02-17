import express from 'express'
import { createOrders, getPastOrders } from '../controllers/orders.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/add',verifyToken,createOrders);
router.get('/get',verifyToken,getPastOrders);
export default router;