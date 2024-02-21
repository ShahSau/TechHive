import Coupon from "../models/coupon.model.js";

export const createCoupon = async (req, res, next) => {
    try {
        const coupon = new Coupon(req.body);
        await coupon.save();
        res.status(201).json({
            message: "Coupon created successfully",
            coupon: coupon,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllCoupons = async (req, res, next) => {
    try {
        const coupons = await Coupon.find();
        res.status(200).json({
            coupons: coupons,
            message: "All coupons fetched successfully",
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteCoupon = async (req, res, next) => {
    try {
        await Coupon.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Coupon deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}