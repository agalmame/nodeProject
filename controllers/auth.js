const User = require('../models/user');
const bcryptjs = require('bcryptjs');


exports.getLogin = (req,res,next) => {
    // const login = req
    //                 .get('Cookie')
    //                 .split('=')[1]
    //                 .trim();
    res.render('auth/login',{
        pageTitle:'login',
        path:'/login',
        activeLogin:true,
        isAuthenticated: req.session.isLogedIn,
    });
};


exports.postLogin = (req , res , next) => {
    // res.setHeader('Set-Cookie',"logedIn=true");
    User.findUser(req.session.user._id)
        .then(user=>{
            req.session.user = new User(user.userName, user.email,user.cart, user._id);
            req.session.isLogedIn = true;
            req.session.save((err)=>{
                console.log(err);
                res.redirect('/');
            });
        })
        .catch(err=>{
            console.log(err);
        });
};


exports.postLogout = (req, res , next) => {
    req.session.destroy((err)=> {
        console.log(err);
        res.redirect('/');  
    })
};


exports.getSignUp = (req, res, next) => {
    res.render('auth/signUp',{
        pageTitle: 'Sign UP',
        path: '/signUp',
        activeSignUp: true,
        isAuthenticated:req.session.isLogedIn,
    });
};

exports.postSignUp = (req, res, next) => {
    User.findUser({email:req.body.email})
        .then(e=>{
            if(e){
                res.redirect('/signUp');
            }else{
                return bcryptjs.hash(req.body.password,12);
            }
        })
        .then(hashed=>{
            const email = req.body.email;
            const userName = req.body.userName;
            const password = hashed;
            const confirmPassword = req.body.confirmPassword;
            const cart = {items:[]};
            const user = new User(userName, email, cart,password);
            return user.save();
        })
        .then(result=>{
            res.redirect('/login');
        })
        .catch(err=>{
            console.log(err);
        });
};
