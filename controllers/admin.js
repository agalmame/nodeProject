const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        activeProduct: true
    })
};

exports.postProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    Product.create({
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description,
    })
        .then(resp => {
            res.redirect('/admin/products')
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getEditProduct = (req, res, next) => {
    const edit = req.query.edit;
    if (!edit) {
        return res.redirect('/');
    }
    const id = req.params.productID;
    Product.findAll({where:{id:id}})
        .then(pro => {
            res.render('admin/edit-product', {
                pageTitle: 'Edit The Choosen Product',
                path: '/admin/edit-product',
                editing: edit,
                product: pro[0],
            })
        })
        .catch(err=>{
            console.log(err);
        })
};

exports.editProduct = (req, res, next) => {
    const id = req.body.productID;
    const updatedTitle = req.body.title;
    const updatedImage = req.body.imageUrl;
    const updatedDescription = req.body.description;
    const updatedPrice = req.body.price;
    Product.findAll({where:{id:id}})
        .then(p=>{
            p[0].title = updatedTitle;
            p[0].imageUrl = updatedImage;
            p[0].description = updatedDescription;
            p[0].price = updatedPrice;
            return p[0].save();
        })
        .then(r=>{
            console.log(r);
            res.redirect('/admin/products')
        })
        .catch(err=>{
            console.log(err);
        })
   

}

exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then(p => {
            res.render('admin/products', {
                prods: p,
                pageTitle: 'admin products',
                activeAdminPro: true,
                hasProducts: p.length > 0,
            });
        })
        .catch(err => {
            console.log(err);
        })


}

exports.deleteProduct = (req, res, next) => {
    const id = req.body.productID;
    Product.destroy({where:{id:id}})
        .then(resp=>{
            console.log(resp);
            res.redirect('/admin/products');
        })
        .catch(err=>{
            console.log(err);
        });
}
