const router = express.Router();
const { deleteCart } = require('../db/models/cart');
const { requireUser } = require('./utils');


//UPDATE /api/cart


//DELETE /api/cart
router.delete('/:cartId', async (req, res, next) => {
    try {
        const deletedCart = await deleteCart(req.params.cartId);
        res.send(deletedCart)
    } catch ({ name, message }) {
        next ({ name, message }); 
    }
})



module.exports = router;