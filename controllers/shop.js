const Products = require('../models/product');
const cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Products.fetchAll(p => {
        res.render('shop/product-list',{
            prods: p,
            pageTitle: 'Shop', 
            path: '/', 
            hasProducts: p.length > 0, 
            activeProducts:true,
    });

    });
    //res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
};

exports.getProduct = (req,res,next) => {
    let id = req.params.productID;
    Products.fetchProduct(id, p => {
        console.log(p);
        res.render('shop/product-detail',{
            pageTitle:'product',
            activeProducts:true,
            prod:p
        })
    })
}

exports.postCart=(req,res,next) => {
    const idy = req.body.productID;
    console.log(idy);
    Products.fetchProduct(idy,(p) => {
        cart.addProduct(idy ,p.price);
    });

    res.render('shop/cart',{
        activeCart:true,
    });
}

exports.getIndex = (req,res,next) => {
    Products.fetchAll( p => {
        res.render('shop/index',{
            prods: p,
            pageTitle: 'list product', 
            hasProducts: p.length>0, 
            activeShop:true,  
        });
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