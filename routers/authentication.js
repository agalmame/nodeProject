const express = require('express');
const route = express.Router();

const auth = require('../controllers/auth');


route.get('/login',auth.getLogin);

route.post('/login',auth.postLogin);

route.post('/logout',auth.postLogout);

route.get('/signUp',auth.getSignUp);

route.post('/signUp',auth.postSignUp);

module.exports=route;