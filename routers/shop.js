const express = require('express');
const path = require('path');
const router = express.Router();
const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex );

router.get('/cart',shopController.getCart);

router.post('/cart',shopController.postCart)

router.get('/products',shopController.getProducts);

router.get('/product/:productID', shopController.getProduct);

router.get('/checkout',shopController.getCheckout);

router.post('/cart-delete-cart',shopController.deleteCartProduct)




module.exports = router;