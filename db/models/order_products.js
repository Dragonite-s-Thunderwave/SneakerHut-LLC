const { client } = require('../client');

// create func createOrderProduct
async function createOrderProducts({ shoeId, orderId, quantity }) {
    try {
      const {
        rows: [order_product],
      } = await client.query(
        `
        INSERT INTO order_products("shoeId", "orderId", quantity)
        VALUES ($1, $2, $3)
        RETURNING *;
      `,
        [shoeId, orderId, quantity]
      );
      return order_product;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  // creat func getOrderProductById
  async function getOrderProductById(id) {
    console.log("getting orderproduct by id...")
    try {
        const {rows: [orderProduct]} = await client.query(`
            SELECT *
            FROM order_products
            WHERE id=$1
        `,
            [id]
        );
        return orderProduct;
    } catch (error) {
        console.error(error);
        throw error;
    }
  }

  async function addProductToOrder({ orderId, shoeId, quantity }) {
    try {
      const [order] = await getOrderById(orderId);
      for (let i = 0; i <= order.products.length; i++) {
        let product = order.products[i];
        if (i === order.products.length) {
          const {
            rows: [orderProduct],
          } = await client.query(`
          INSERT INTO order_products ("orderId", "shoeId", quantity)
          VALUES ($1, $2, $3)
          RETURNING *
          `, [orderId, shoeId, quantity]);
          return orderProduct;
        }
        if (shoe.id === shoeId) {
          const newQuantity = product.quantity + quantity
          const { rows: [updatedOrderProduct]} = await client.query(
            `
          UPDATE order_products
          SET quantity=$2
          WHERE "orderId"=$1
          RETURNING *
          `,
            [orderId, newQuantity]
          );
          return updatedOrderProduct;
        }
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


//create func updateOrderProduct
async function updateOrderProduct({id, quantity}) {
    try {
            const {rows: [updatedOrderProduct]} = await client.query(`
                UPDATE order_products
                SET quantity=$2
                WHERE id=$1
                RETURNING *
            `,
                [id, quantity]
            );
            return updateOrderProduct    
        
    } catch (error) {
        console.error(error);
        throw error;
    }
}


//delete orderProduct
async function deleteOrderProduct(id) {
    try {
        const {rows: [deletedOrderProduct]} = await client.query(`
            DELETE FROM order_products
            WHERE id=$1
        `,
            [id]
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
}




  module.exports = {
    createOrderProducts,
    addProductToOrder,
    updateOrderProduct,
    deleteOrderProduct,
    getOrderProductById
  }