const path = require('path');
const fs =  require('fs');

const p = path.join(path.dirname(process.mainModule.filename),
        'data',
        'cart.json'
        );

module.exports = class cart{
    static addProduct (id,price){
        fs.readFile(p,(err,content)=>{
            let cart = {products:[],totalPrice:0};
            if(!err){
                cart = JSON.parse(content);
            }

            const existingProductIndex = cart.products.findIndex( p=>p.id===id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if(existingProduct){
                updatedProduct = {...existingProduct};
                updatedProduct.qty=updatedProduct+1;
                cart.products=[...cart.products,updatedProduct]
            }else{ 
                updatedProduct= { id:id , qty:1};
                cart.products=[...cart.products,updatedProduct];
            }

            cart.totalPrice = cart.totalPrice+ +price;

            fs.writeFile(p,JSON.stringify(cart),(err)=>{
                console.log(err);
            })

        })
    }
}