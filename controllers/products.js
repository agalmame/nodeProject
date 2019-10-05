const Products = require('../models/product');

exports.getAddProduct= (req, res, next)=>{
    res.render('add-product',{
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        activeProduct:true
    });
    //res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
}
let t=1
exports.postProduct = (req, res, next)=>{
    
    const product = new Products(req.body.title,t.toString());
    ++t;
    product.save();
    res.redirect('/');
}

exports.getProduct = (req, res, next)=>{
    const products = Products.fetchAll();
    res.render('shop',{
        prods: products,
        pageTitle: 'Shop', 
        path: '/', 
        hasProducts: products.length > 0, 
        activeShop:true});
    //res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
};