import Orders from "../models/orders.model.js";

export const createOrders = async (req, res, next) => {
    try {
        const totalPrice = req.body.orderItems.reduce((a, c) => a + c.amount * c.quantity, 0);
        const order = new Orders({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            address: req.body.address,
            paymentMethod: req.body.paymentMethod,
            orderItems: req.body.orderItems,
            totalPrice: totalPrice,
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getPastOrders = async (req, res, next) => {
    try {
        const orders = await Orders.find({ email : req.query.email});
        if (!orders) {
            return res.status(404).json({ message: "No orders found" });
        }else{
            res.status(200).json(orders);
        
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}