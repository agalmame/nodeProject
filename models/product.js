const products = [];

module.exports = class Product{
    constructor(title,name){
     this.title = title;
     this.name = name;
 }

    save(){
     products.push({title:this.title,name:this.name});
 }

    static fetchAll(){
     return products;
 }

}