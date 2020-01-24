const Products = require('../models/product');

exports.getAddProduct= (req, res, next)=>{
    res.render('admin/edit-product',{
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

exports.getEditProduct= (req, res, next)=>{
    const edit = req.query.edit;
    if(!edit){
        return res.render('/');
    }
    res.render('admin/edit-product',{
        pageTitle: 'Edit The Choosen Product',
        path: '/admin/add-product',
        editing: true,
    })
};

exports.getProducts = (req,res,next)=>{
    Products.fetchAll(prod=>{
        res.render('admin/products',{
            prods: prod,
            pageTitle: 'admin products', 
            activeAdminPro:true,
            hasProducts: prod.length >0,
        });
    });

}
