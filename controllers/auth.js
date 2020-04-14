const User = require("../models/user");
const bcryptjs = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  // const login = req
  //                 .get('Cookie')
  //                 .split('=')[1]
  //                 .trim();
  res.render("auth/login", {
    pageTitle: "login",
    path: "/login",
    activeLogin: true,
  });
};

exports.postLogin = (req, res, next) => {
  // res.setHeader('Set-Cookie',"logedIn=true");
  const email = req.body.email;
  const password = req.body.password;

  User.findUser({ email: email })
    .then(user => {
      if (!user) {
        res.redirect("/login");
      } else {
        bcryptjs.compare(password, user.password).then(result => {
          if (result) {
            req.session.user = new User(
              user.userName,
              user.email,
              user.cart,
              user._id
            );
            req.session.isLogedIn = true;
            req.session.save(err => {
              console.log(err);
              res.redirect("/");
            });
          } else {
            res.redirect("/login");
          }
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect("/");
  });
};

exports.getSignUp = (req, res, next) => {
  res.render("auth/signUp", {
    pageTitle: "Sign UP",
    path: "/signUp",
    activeSignUp: true,
  });
};

exports.postSignUp = (req, res, next) => {
  const userName = req.body.userName;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const cart = { items: [] };

  User.findUser({ email: email })
    .then(e => {
      if (e) {
        res.redirect("/signUp");
      } else {
        return bcryptjs.hash(password, 12).then(hashed => {
          const user = new User(userName, email, cart, hashed);
          return user.save();
        });
      }
    })
    .then(result => {
      res.redirect("/login");
    })
    .catch(err => {
      console.log(err);
      res.redirect("/signUp");
    });
};
