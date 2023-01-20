const express = require('express');
const { updateOrderProduct, deleteOrderProduct } = require('../db/models/order_products');
const router = express.Router();
const { requireUser } = require('./utils');

router.patch("/:orderProductId", async (req, res, next) => {
    const {orderProduct} = req.body
    try {
        const updatedOrderProduct = await updateOrderProduct(orderProduct)
        res.send(updatedOrderProduct) 
    } catch ({ name, message }) {
        next ({ name, message }); 
    }
})

router.delete("/:orderProductId", async (req, res, next) => {
    const { orderProductId } = req.params;
    try {
        const deletedOrderProduct = await deleteOrderProduct(orderProductId)
        res.send(deletedOrderProduct)
    } catch ({ name, message }) {
        next ({ name, message }); 
    }
})



module.exports = router