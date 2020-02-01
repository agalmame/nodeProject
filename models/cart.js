const path = require('path');
const fs = require('fs');

const p = path.join(path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class cart {
    static addProduct(id, price) {

        fs.readFile(p, (err, content) => {
            let cart = { products: [], totalPrice: 0 };

            if (!err) {
                console.log(content);
                cart = JSON.parse(content);
            }

            const existingProductIndex = cart.products.findIndex(p => p.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [updatedProduct]
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }

            cart.totalPrice = cart.totalPrice + +price;

            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err + 'HI');
            })

        })
    }

    static getCart(cb) {

        fs.readFile(p, (err, content) => {
            if (!err) {
               cb(JSON.parse(content)); 
            } else {
                console.log(err);
                cb(null);
            }
        });
    }

    static deleteCartProduct(id, price) {

        fs.readFile(p, (err, content) => {

            if (!err) {
                const cart = JSON.parse(content)
                const product = cart.products.find(p => p.id === id);
                if (!product) {return;}
                    let updatedCart = {}; 
                    updatedCart.products = cart.products.filter(p => p.id !== id);;
                    updatedCart.totalPrice = parseFloat(updatedCart.totalPrice) - (parseFloat(price)* parseInt(product.qty));
                    fs.writeFile(p, JSON.stringify(updatedCart),(err)=>{
                        console.log(err);
                    })
                
            }
        });
    }
}