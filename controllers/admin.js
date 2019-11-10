const Products = require('../models/product');

exports.getAddProduct= (req, res, next)=>{
    res.render('admin/add-product',{
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        activeProduct:true
    })
};

exports.postProduct = (req, res, next)=>{
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description  = req.body.description;
    const product = new Products(title,imageUrl,description,price);

    product.save();
    res.redirect('/admin/products');
}

exports.getProducts = (req,res,next)=>{
    const products = Products.fetchAll();
    res.render('admin/products',{
        prods: products,
        pageTitle: 'admin product', 
        hasProducts: products.length >0,
        activeAdminPro :true,
        testing : false,
    });
}