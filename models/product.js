const db = require('../util/database');
const cart = require('./cart');



module.exports = class Product {

    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;

    };

    save() {

        return db.execute('insert into products (title , imageUrl , description , price) value(?,?,?,?)'
        ,[this.title ,this.imageUrl, this.description,this.price]
        )

    }

    static fetchAll() {
        return db.execute('select * from products');
    }

    static fetchProduct(id) {
        return db.execute('select * from products where id = ? ',[id]);
    }

    static deleteProduct(id){
        const variable = path.require('path');
        const p = path.join(path.dirname(process.mainModule.filename),'data' , 'products.json');
        fs.readFile(p,(err, content)=>{
            if(!err){
                const products= JSON.parse(content);
                const product= products.find(p=> p.id===id);
                const updatedProducts =products.filter(p=>p.id != id)
                fs.writeFile(p,JSON.stringify(updatedProducts),(err)=>{
                    console.log(err);
                    if(!err){
                        cart.deleteCartProduct(product.id,product.price);
                    }
                });
            }else console.log(err+'no data yet'); 
        })
    }

}