const Products = require("../models/product");
const cart = require("../models/cart");
const User = require("../models/user");

exports.getProducts = (req, res, next) => {
  Products.fetchAll()
    .then(rows => {
      res.render("shop/product-list", {
        prods: rows,
        pageTitle: "Shop",
        path: "/",
        hasProducts: rows.length > 0,
        activeProducts: true,
        isAuthenticated: req.session.isLogedIn,
      });
    })
    .catch(err => {
      console.log(err);
    });
  //res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
};

exports.getProduct = (req, res, next) => {
  let id = req.params.productID;

  Products.findProduct(id)
    .then(p => {
      res.render("shop/product-detail", {
        pageTitle: "product",
        activeProducts: true,
        prod: p,
        isAuthenticated: req.session.isLogedIn,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postCart = (req, res, next) => {
  const idy = req.body.productID;
  Products.findProduct(idy)
    .then(p => {
      return req.user.addToCart(p);
    })
    .then(p => {
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getIndex = (req, res, next) => {
  Products.fetchAll(p => {
    res.render("shop/index", {
      prods: p,
      pageTitle: "list product",
      hasProducts: p.length > 0,
      activeShop: true,
      isAuthenticated: req.session.isLogedIn,
    });
  });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cartProductsData => {
      res.render("shop/cart", {
        pageTitle: "cart",
        activeCart: true,
        products: cartProductsData,
        hasProducts: cartProductsData.length > 0,
        isAuthenticated: req.session.isLogedIn,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then(orders => {
      console.log(orders);
      res.render("shop/orders", {
        hasOrders: orders.length > 0,
        orders: orders,
        pageTitle: "Your Orders",
        activeOrder: true,
        isAuthenticated: req.session.isLogedIn,
      });
    })
    .catch(wee => {
      console.log(wee);
    });
};

exports.postOrder = (req, res, next) => {
  req.user
    .addOrder()
    .then(r => {
      res.redirect("/cart");
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    activeCart: true,
    isAuthenticated: req.session.isLogedIn,
  });
};

exports.deleteCartProduct = (req, res, next) => {
  const id = req.body.productID;
  req.user
    .deleteProductCart(id)
    .then(r => {
      res.redirect("/cart");
    })
    .catch(err => {
      console.log(err);
    });
};
