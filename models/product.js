const products = [];

module.exports = class Product{
    constructor(title,imageUrl,description,price){
     this.title = title;
     this.imageUrl = imageUrl;
     this.description = description;
     this.price = price;
 };

    save(){
    this.id = Math.random().toString();
     products.push({id:this.id,title:this.title,imageUrl:this.imageUrl, description:this.description, price: this.price});

 }

    static fetchAll(){
     return products;
 }

}