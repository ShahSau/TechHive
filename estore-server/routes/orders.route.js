import express from 'express'
import { createOrders } from '../controllers/orders.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/add',verifyToken,createOrders);
export default router;