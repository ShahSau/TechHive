import Orders from "../models/orders.model.js";

export const createOrders = async (req, res, next) => {
    try {
        
        const order = new Orders(req.body);
        
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}