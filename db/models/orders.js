//****where are we putting the client??***
const client = require('../client');

async function createOrders ({userId, isComplete, total, orderDate, productId}) {
    try {
        const { rows: [orders] } = await client.query(`
            INSERT INTO order("userId", "isComplete", total, "orderDate", "productId")
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `, [userId, isComplete, total, orderDate, productId]);

        return orders;

    } catch (error) {
        console.error('Error creating order history');
        throw error;
    }
};

async function getOrdersByUserId(userId){
    try {
        const {rows: [orders]} = await client.query(`
        SELECT *
        FROM order
        WHERE "userId"=$1;
        `, [userId]);

        return orders;

    } catch (error) {
        console.error("Error getting order history by 'userId'");
        throw error;
    }
};

async function getAllOrders (id) {
    try {
        const {rows: [orders]} = await client.query(`
        SELECT *
        FROM orders
        `);

        return orders;

    } catch (error) {
        console.error("Error getting all order histories");
        throw error;
    }
};

async function getOrdersById (id) {
    try {
        const {rows: [orders]} = await client.query(`
        SELECT *
        FROM orders
        WHERE id=$1;
        `, [userId]);

        return orders;

    } catch (error) {
        console.error("Error getting all order histories");
        throw error;
    }
};

async function updateOrders ({id, ...fields}) {
    const { update } = fields;

    const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

    try {
        if(setString.length > 0){
            await client.query(`
            UPDATE orders
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
            `, Object.values(fields));
        }
        if(update === undefined){
            return await getOrdersById(id);
        }
    } catch (error) {
        console.error('Error updating order history');
        throw error;
    }
};

async function deleteOrdersById (id) {
    try {
        const { rows: deletedOrder } = await client.query(`
            DELETE FROM orders
            WHERE id=$1
            RETURNING *;
        `, [id]);

        return deletedOrder;

    } catch (error) {
        console.error('Error deleting order history');
        throw error;
    }
};

module.exports = {
    createOrders,
    getOrdersByUserId,
    getAllOrders,
    updateOrders,
    deleteOrdersById,
    getOrdersById
}