const client = require();

// async function createCart({ shoeId, orderId, price, quantity }) {
//     try {
//       const {
//         rows: [cart],
//       } = await client.query(
//         `
//         INSERT INTO cart("shoeId", "orderId", price, quantity)
//         VALUES ($1, $2, $3, $4)
//         RETURNING *;
//       `,
//         [shoeId, orderId, price, quantity]
//       );

//       return cart;
//     } catch (error) {
//       throw error;
//     }
// };

// async function getCartById(id) {
//     try {
//       const {
//         rows: [cart],
//       } = await client.query(
//         `
//       SELECT *
//       FROM cart
//       WHERE id=$1
//       `,
//         [id]
//       );
//       return cart;
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
// };

// async function updateCartShoe({ id, price, quantity }) {
//     try {
//       if (price && quantity) {
//         const {
//           rows: [updatedCartShoe],
//         } = await client.query(
//           `
//         UPDATE cart
//         SET price=$2, quantity=$3
//         WHERE id=$1
//         RETURNING *
//         `,
//           [id, price, quantity]
//         );
//         return updatedCartShoe;
//       }
//       if(price) {
//         const {rows: [updatedCartShoe]} = await client.query(`
//         UPDATE cart
//         SET price=$2
//         WHERE id=$1
//         RETURNING *
//         `, [id, price])
//         return updatedCartShoe
//       }
//       if (quantity) {
//         const {rows: [updatedCartShoe]} = await client.query(`
//         UPDATE cart
//         SET quantity=$2
//         WHERE id=$1
//         RETURNING *
//         `, [id, quantity])
//         return updatedCartShoe
//       }
//     } catch (error) {
//       throw error
//     }
//   }

// async function deleteCart(id) {
//     try {
//       const {rows: [deletedCart]} = await client.query(`
//       DELETE FROM cart
//       WHERE id=$1
//       `, [id])
//     } catch (error) {
//       console.error(error)
//       throw error
//     }
//   }
 
// module.exports = {
//     createCart,
//     getCartById,
//     deleteCart,
// } 