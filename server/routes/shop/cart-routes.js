const express = require('express');
const {addToCart , updateCartItemQuantity,deleteCartItem,fetchCartItems} = require('../../controllers/shop/cart-controller');

const router = express.Router();

router.post('/add' , addToCart);
router.put('/update-cart' , updateCartItemQuantity);
router.get('/get/:userId' ,fetchCartItems);
router.delete('/delete/:userId/:productId' , deleteCartItem);


module.exports = router;

