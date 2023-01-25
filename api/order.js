const express = require('express');
const { getAllOrders, getAllOrderHistories, createOrderHistory, updateOrders } = require('../db/models/orders');
const ordersRouter = express.Router();
const { requireUser } = require('./utils');


//GET /api/orders

ordersRouter.get('/', async (req, res, next) => {
    try {
        const allOrders = await getAllOrders();
        res.send(allOrders);
    } catch ({ name, message }) {
        next ({ name, message }); 
    }
})



//POST /api/orders

ordersRouter.post('/', async (req, res, next) => {
    const {userId, status, total, orderDate, productId} = req.body;
    try {
        const order = await createOrders({
            userId: userId,
            status: status,
            total: total,
            orderDate: orderDate,
            productId: productId,
        })
        res.send(order)
    } catch ({ name, message }) {
        next ({ name, message }); 
    }
})



//PATCH /api/orders/:orderId

ordersRouter.patch('/:orderId', async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const { userId, status, total } = req.body;

        const newOrder = {id: orderId, status: status, userId: userId };

        const updatedOrder = await updateOrders(newOrder)

        res.send(updatedOrder);
    } catch ({ name, message }) {
        next ({ name, message }); 
    }
})



//DELETE api/orders/:orderId




module.exports = ordersRouter;
