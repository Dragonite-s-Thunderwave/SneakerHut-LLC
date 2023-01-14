const express = require('express');
const { getAllOrderHistories, createOrderHistory, updateOrders } = require('../db/models/orders');
const router = express.Router();
const { requireUser } = require('./utils');


//GET /api/orders

router.get('/', async (req, res, next) => {
    try {
        const allOrders = await getAllOrders();
        res.send(allOrders);
    } catch ({ name, message }) {
        next ({ name, message }); 
    }
})



//POST /api/orders

router.post('/', async (req, res, next) => {
    const {userId, isComplete, total, orderDate, productId} = req.body;
    try {
        const order = await createOrders({
            userId: userId,
            isComplete: isComplete,
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

router.patch('/:orderId', async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const { userId, isComplete, total } = req.body;

        const newOrder = {id: orderId, isComplete: isComplete, userId: userId };

        const updatedOrder = await updateOrders(newOrder)

        res.send(updatedOrder);
    } catch ({ name, message }) {
        next ({ name, message }); 
    }
})



//DELETE api/orders/:orderId