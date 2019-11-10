const Products = require('../models/product');


exports.getProduct = (req, res, next) => {
    const products = Products.fetchAll();
    res.render('shop/product-list',{
        prods: products,
        pageTitle: 'Shop', 
        path: '/', 
        hasProducts: products.length > 0, 
        activeProducts:true,
    });
    //res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
};

exports.getIndex = (req,res,next) => {
    const products = Products.fetchAll();
    res.render('shop/index',{
        prods: products,
        pageTitle: 'list product', 
        activeShop:true, 
    });
}

exports.getCart =  (req,res,next) => {
    res.render('shop/cart',{

        pageTitle: 'cart', 
        activeCart:true,
    });
}

exports.getOrders = (req,res,next) => {
    res.render('shop/orders',{
        pageTitle: 'Your Orders',
        activeOrders: true,
    });
}

exports.getCheckout =  (req,res,next) => {
    res.render('shop/checkout',{
        pageTitle: 'Checkout', 
        activeCart:true,
    });
}