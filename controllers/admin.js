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
    const product = new Products(null,title,imageUrl,description,price);

    product.save().then(()=>{
        res.redirect('/products');
    }).catch(err=>{
        console.log(err);
    })
}

exports.getEditProduct= (req, res, next)=>{
    const edit = req.query.edit;
    if(!edit){
        return res.redirect('/');
    }
    const id = req.params.productID;
    Products.fetchProduct(id, pro=>{
        if(!pro){
            return res.redirect('/');
        }
        res.render('admin/edit-product',{
            pageTitle: 'Edit The Choosen Product',
            path: '/admin/edit-product',
            editing: edit,
            product: pro,
        })
    })
    
};

exports.editProduct = (req,res,next)=>{
    const id = req.body.productID;
    const updatedTitle = req.body.title;
    const updatedImage = req.body.imageUrl;
    const updatedDescription = req.body.description;
    const updatedPrice = req.body.price;

    const updatedProduct= new Products(id, updatedTitle, updatedImage, updatedDescription,updatedPrice);
    console.log(updatedProduct);

    updatedProduct.save();
    return res.redirect('/');

}

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

exports.deleteProduct= (req,res,next)=>{
    const id = req.body.productID;
    Products.deleteProduct(id);
     res.redirect('/');
}
