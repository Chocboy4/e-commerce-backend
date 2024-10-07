const Order = require('../models/orderModel'); 
const Product = require('../models/productsModels'); 

const createOrder = async (req, res) => {
    const {
        user,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    // Validate required fields
    if (
        !user || !orderItems || !shippingAddress || !paymentMethod ||
        !itemsPrice || !taxPrice || !shippingPrice || !totalPrice
    ) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Optional: Validate that all products in orderItems exist
        const productIds = orderItems.map(item => item.product);
        const products = await Product.find({ _id: { $in: productIds } });

        if (products.length !== orderItems.length) {
            return res.status(400).json({ message: "Some products in the order are invalid." });
        }

        // Create the new order
        const order = await Order.create({
            user,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        // Return the created order
        return res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({ message: "Error creating order", error });
    }
};

const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params; // Extract order ID from the request parameters

        // Find the order by its ID
        const order = await Order.findById(orderId);

        // If no order is found, return a 404 error
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Return the order details
        res.status(200).json({ order });
    } catch (error) {
        // If there's an error (e.g., invalid ID format), return a 500 server error
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getAllOrder = async (req, res) => {
    try {
        
        const order = await Order.find();

        // If no order is found, return a 404 error
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (order && order.length > 0) {
            // Return a successful response with the list of users
            res.status(200).json({
              message: "Orders fetched successfully",
              order
            });
          } else {
            // Return a message when no users are found
            response.status(404).json({ message: "No Orders found" });
          }
    } catch (error) {
        // If there's an error (e.g., invalid ID format), return a 500 server error
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateOrderToDelivered = async (req, res) => {
    try {
        const { orderId } = req.params; // Extract order ID from the request parameters

        // Find the order by its ID
        const order = await Order.findById(orderId);

        // If no order is found, return a 404 error
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if the order is already delivered
        if (order.isDelivered) {
            return res.status(400).json({ message: 'Order is already delivered' });
        }

        // Update the order status
        order.isDelivered = true;  // Set isDelivered to true
        order.deliveredAt = Date.now();  // Set the delivery timestamp

        // Save the updated order
        const updatedOrder = await order.save();

        // Return the updated order details
        res.status(200).json({ message: 'Order updated to delivered', order: updatedOrder });
    } catch (error) {
        // If there's an error, return a 500 server error
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const updateOrderToPaid = async (req, res) => {
    try {
        const { orderId } = req.params; // Extract order ID from the request parameters

        // Find the order by its ID
        const order = await Order.findById(orderId);

        // If no order is found, return a 404 error
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if the order is already delivered
        if (order.isPaid) {
            return res.status(400).json({ message: 'Order has already been paid for' });
        }

        // Update the order status
        order.isPaid = true;  // Set isDelivered to true
        order.deliveredAt = Date.now();  // Set the delivery timestamp

        // Save the updated order
        const updatedOrder = await order.save();

        // Return the updated order details
        res.status(200).json({ message: 'Order updated to delivered', order: updatedOrder });
    } catch (error) {
        // If there's an error, return a 500 server error
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


module.exports = {
    createOrder,
    getOrderById,
    updateOrderToDelivered,
    updateOrderToPaid,
    getAllOrder
};
