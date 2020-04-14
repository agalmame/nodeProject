const express = require('express');
const path = require('path');
const router = express.Router();
const shopController = require('../controllers/shop');
const authCheck = require('../controllers/checkAuth');

router.get('/', shopController.getProducts );

router.get('/cart', authCheck, shopController.getCart);

router.post('/cart',shopController.postCart)

router.get('/products', shopController.getProducts);

router.get('/product/:productID', authCheck, shopController.getProduct);

router.get('/checkout', authCheck ,shopController.getCheckout);

router.post('/cart-delete-cart',shopController.deleteCartProduct)

router.get('/order',authCheck ,shopController.getOrders);

router.post('/create-order',shopController.postOrder)




module.exports = router;