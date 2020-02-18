const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressHBS = require('express-handlebars');
const errorController = require('./controllers/error');
const adminRoutes = require('./routers/admin');
const shopRouter = require('./routers/shop');
const mongoConnect = require('./util/database');
const auth = require('./routers/authentication');
const User = require('./models/user');
const session =require('express-session');
const mongodbStore = require('connect-mongodb-session')(session);

const store = new mongodbStore({
    uri:'mongodb+srv://yassune:HCDre59ww2uD4YCo@node-shop-ykwpi.mongodb.net/shop',
    collection:'session',
})

const app = express();

// db.execute('select * from products').then((r)=>{console.log(r)}).catch((err)=>{console.log(err)});

app.engine('hbs', expressHBS({
    extname: "hbs",
    defaultLayout: "main-layout",
    layoutsDir: "",
}));

app.set('view engine', 'hbs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(path.dirname(process.mainModule.filename), 'public')));

app.use(session({secret:'my little secret',
                 resave:false ,
                saveUninitialized:false,
                store:store,
            }))

app.use((req, res, next)=>{
        // console.log(req.session.user.cart);
        if(!req.session.user){
            return next();
        }
        req.user =  new User(req.session.user.userName,req.session.user.email,req.session.user.cart,req.session.user._id);
        next();
})

app.use('/admin', adminRoutes);

app.use(shopRouter);

app.use(auth);

app.use(errorController.get404Page); 


mongoConnect.mongoConnect(()=>{
    app.listen(3011);
})