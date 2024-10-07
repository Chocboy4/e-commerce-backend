const express = require('express');
const { createOrder, getOrderById, updateOrderToDelivered, updateOrderToPaid, getAllOrder } = require('../controllers/orderController');
const route = require('./userRoutes');
const router = express.Router();

router.post('/create-order', createOrder);
router.get('/orders/:orderId', getOrderById)
router.put('/orders/:orderId/delivered', updateOrderToDelivered)
router.put('/orders/:orderId/paid', updateOrderToPaid)
router.get('/', getAllOrder)

module.exports = router;
