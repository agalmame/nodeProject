const fs = require('fs');
const path = require('path');

const products = [];

module.exports = class Product{

    constructor(title,imageUrl,description,price){
        this.id = Math.random().toString();
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;

 };

    save(){
        const p = path.join(
            path.dirname(process.mainModule.filename),
            'data',
            'products.json'
        );

        fs.readFile(p, (err, fileContent)=>{
            let products = [];
            if(!err){
                products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(p,JSON.stringify(products),(err) => {
                console.log(err);
            })
        });
        
 }

    static fetchAll(cb){
       const p = path.join(path.dirname(process.mainModule.filename),'data','products.json');
       fs.readFile(p,(err,content)=>{
           if(err){
               cb([])
            } else cb(JSON.parse(content));
       });

 }

    static fetchProduct(id , cb){
        const p = path.join(path.dirname(process.mainModule.filename),'data','products.json');
        fs.readFile(p, (err,content)=>{
            if(err){
                console.log(err)
            }else {
                const prod =  JSON.parse(content).find(product=> product.id===id);
                cb(prod);
            }
        })
    }

}