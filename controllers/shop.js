const Products = require('../models/product');
const cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Products.fetchAll().then((rows)=>{
        res.render('shop/product-list', {
            prods: rows[0],
            pageTitle: 'Shop',
            path: '/',
            hasProducts: rows[0].length > 0,
            activeProducts: true,
        });
    }).catch(err=>{
        console.log(err);
    })
    //res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
};

exports.getProduct = (req, res, next) => {
    let id = req.params.productID;
    Products.fetchProduct(id).then(p => {
        res.render('shop/product-detail', {
            pageTitle: 'product',
            activeProducts: true,
            prod: p[0][0],
        })
    }).catch(err=>{
        console.log(err);
    })
}

exports.postCart = (req, res, next) => {
    const idy = req.body.productID;
    console.log(idy);
    Products.fetchProduct(idy, (p) => {
        cart.addProduct(idy, p.price);
        res.render('shop/cart', {
            activeCart: true,
        });
    });


}

exports.getIndex = (req, res, next) => {
    Products.fetchAll(p => {
        res.render('shop/index', {
            prods: p,
            pageTitle: 'list product',
            hasProducts: p.length > 0,
            activeShop: true,
        });
    });

}

exports.getCart = (req, res, next) => {
    cart.getCart(cart => {
        if (cart) {
            Products.fetchAll(products => {
                const cartProductsData = [];
                for (pro of products) {
                    const cartProduct = cart.products.find(p => p.id === pro.id);
                    cartProductsData.push({ id: pro.id, product: pro.title, qty: cartProduct.qty });
                }
                res.render('shop/cart', {
                    pageTitle: 'cart',
                    activeCart: true,
                    products: cartProductsData,
                    hasProducts: cartProductsData.length > 0,

                });
            })
        }
    })

}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Your Orders',
        activeOrders: true,
    });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        activeCart: true,
    });
}


exports.deleteCartProduct = (req, res, next) => {
    const id = req.body.productID;
    Products.fetchProduct(id, pro => {
        cart.deleteCartProduct(id, pro.price);
        res.redirect('/cart');
    })

}