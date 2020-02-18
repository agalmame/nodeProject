const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

const objectId = mongodb.ObjectId;

class User {
  constructor(userName, email, cart, password, id) {
    this.userName = userName;
    this.email = email;
    this.cart = cart;
    this.password = password
    this._id = id;
  }

  save() {
    return getDb()
      .collection("user")
      .insertOne(this);
  }

  addToCart(product) {
    let updatedProductIndex = -1;
    let updatedCartItems = [];
    if (this.cart.items) {
      updatedCartItems = [...this.cart.items];
      updatedProductIndex = this.cart.items.findIndex(p => {
        return p.productId.toString() == product._id.toString();
      });
    }

    let newQuantity = 1;

    if (updatedProductIndex >= 0) {
      newQuantity = this.cart.items[updatedProductIndex].quantity + 1;
      updatedCartItems[updatedProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new objectId(product._id),
        quantity: newQuantity
      });
    }
    const cart = { items: updatedCartItems };

    return getDb()
      .collection("user")
      .updateOne({ _id: new objectId(this._id) }, { $set: { cart: cart } });
  }

  getCart() {
    const cartProductsIds = this.cart.items.map(p => {
      return p.productId;
    });

    const theCart = getDb()
      .collection("products")
      .find({ _id: { $in: cartProductsIds } })
      .toArray()
      .then(products => {
        const pq = products.map(p => {
          return {
            ...p,
            quantity: this.cart.items.find(i => {
              return p._id.toString() == i.productId.toString();
            }).quantity
          };
        });
        return pq;
      })
      .catch(err => {
        console.log(err);
      });
    if (theCart) {
      return theCart;
    } else return new Promise([]);
  }

  deleteProductCart(id) {
    const updatedCart = this.cart.items.filter(i => {
      return i.productId.toString() !== id;
    });

    return getDb()
      .collection("user")
      .updateOne(
        { _id: new objectId(this._id) },
        { $set: { cart: { items: updatedCart } } }
      );
  }

  addOrder() {
    return this.getCart()
      .then(products => {
        return getDb()
          .collection("order")
          .insertOne({
            items: products,
            user: { _id: new objectId(this._id), userName: this.userName }
          });
      })
      .then(r => {
        this.cart = { items: [] };
        return getDb()
          .collection("user")
          .updateOne(
            { _id: new objectId(this._id) },
            { $set: { cart: { items: [] } } }
          );
      })
      .catch(err => {
        console.log(err);
      });
  }

  getOrders() {
    return getDb()
      .collection("order")
      .find({ "user._id": new objectId(this._id) })
      .toArray();
  }

  static findUser(field) {
    if (typeof field == "string") {
      console.log('this is string')
      return getDb()
        .collection("user")
        .findOne({ _id: new objectId(field) });
    }else{
      console.log('this is object')
      return getDb()
          .collection('user')
          .findOne(field)
    }
  }
}

module.exports = User;
