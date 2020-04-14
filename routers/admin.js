const express = require('express');
const path = require('path');
const router = express.Router();
const adminController = require('../controllers/admin');
const authCheck = require('../controllers/checkAuth');


router.get('/add-product',authCheck , adminController.getAddProduct);

router.get('/edit-product/:productID',adminController.getEditProduct);

router.get('/products',adminController.getProducts);

router.post('/add-product',adminController.postProduct);

router.post('/edit-product',adminController.editProduct);

router.post('/delete-product',adminController.deleteProduct)



module.exports = router;
