const express = require('express');
const path = require('path');
const router = express.Router();
const adminController = require('../controllers/admin');


router.get('/add-product', adminController.getAddProduct);

router.get('/edit-product/:productID',adminController.getEditProduct);

router.get('/products',adminController.getProducts);

router.post('/add-product',adminController.postProduct);



module.exports = router;
