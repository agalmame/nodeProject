const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");

class Products {
  constructor(title, price, imageUrl, description, id, idUser) {
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this.idUser = idUser;
  }

  save() {
    let op;
    if (this._id) {
      op = getDb()
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      op = getDb()
        .collection("products")
        .insertOne(this);
    }
    return op;
  }

  static fetchAll() {
    return getDb()
      .collection("products")
      .find()
      .toArray();
  }

  static findProduct(id) {
    return getDb()
      .collection("products")
      .findOne({ _id: new mongodb.ObjectId(id) });

    // .then(p => {
    //     console.log("found");
    // return p;
    // })
    // .catch(err => {
    //     console.log(err);
    // })
  }

  static deleteProduct(id) {
    return getDb()
            .collection("products")
            .deleteOne({ _id: new mongodb.ObjectId(id) })
  }
}

module.exports = Products;
