const client = require("../client");

// create func createOrderProduct
async function createOrderProducts({ productId, shoeId, price, quantity }) {
    try {
      const {
        rows: [order_product],
      } = await client.query(
        `
        INSERT INTO order_products("productId", "shoeId", price, quantity)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `,
        [productId, shoeId, price, quantity]
      );
      console.log(order_product);
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

//create func addProductToOrder
// async function addProductToOrder({orderId, shoeId, price, quantity}){
//     try {

//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// }



//create func updateOrderProduct
async function updateOrderProduct({id, price, quantity}) {
    try {
        if (price && quantity) {
            const {rows: [updatedOrderProduct]} = await client.query(`
                UPDATE order_products
                SET price=$2, quantity=$3
                WHERE id=$1
                RETURNING *
            `,
                [id, price, quantity]
            );
            return updateOrderProduct;
            }

        if (price) {
            const {rows: [updatedOrderProduct]} = await clienty.query(`
                UPDATE order_products
                SET price=$2
                WHERE id=$1
                RETURNING *
            `,
                [id, price]
            );
            return updateOrderProduct
        }

        if (quantity) {
            const {rows: [updatedOrderProduct]} = await client.query(`
                UPDATE order_products
                SET quantity=$2
                WHERE id=$1
                RETURNING *
            `,
                [id, quantity]
            );
            return updateOrderProduct    
        }
        
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