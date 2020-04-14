const Products = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        activeProduct: true,
    })
};

exports.postProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Products(title, price, imageUrl, description,null,req.user._id)
    product.save()
        .then(result => {
            res.redirect('/admin/products');
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
    Products.findProduct(id)
        .then(pro => {
            res.render('admin/edit-product', {
                pageTitle: 'Edit The Choosen Product',
                path: '/admin/edit-product',
                editing: edit,
                product: pro,
            })
        })
        .catch(err => {
            console.log(err);
        })
};

exports.editProduct = (req, res, next) => {
    const id = req.body.productID;
    const updatedTitle = req.body.title;
    const updatedImage = req.body.imageUrl;
    const updatedDescription = req.body.description;
    const updatedPrice = req.body.price;
    const product = new Products(updatedTitle, updatedPrice, updatedImage, updatedDescription,id);
    product.save()
        .then(r => {
            res.redirect('/admin/products')
        })
        .catch(err => {
            console.log(err);
        })


}

exports.getProducts = (req, res, next) => {
    Products.fetchAll().then(p => {
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
    Products.deleteProduct(id)
        .then(resp => {
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
}
