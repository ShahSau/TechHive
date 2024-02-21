import express from 'express'
import { verifyToken } from '../utils/verifyUser.js';
import { isAdmin } from '../utils/verifyUser.js'
import { createCoupon,getAllCoupons, deleteCoupon } from '../controllers/coupon.controller.js';

const router = express.Router()

router.post("/", verifyToken, isAdmin, createCoupon);
router.get("/", verifyToken, isAdmin, getAllCoupons);
router.delete("/:id", verifyToken, isAdmin, deleteCoupon);




export default router