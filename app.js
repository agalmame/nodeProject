const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressHBS = require('express-handlebars');
const errorController = require('./controllers/error');
const adminRoutes = require('./routers/admin');
const shopRouter = require('./routers/shop');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');


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

app.use((req,res,next)=>{
    User.findAll({where:{id:1}})
        .then((user)=>{
            console.log('this is a user'+user[0])
            req.user=user[0];
            next();
        })
        .catch(err=>{
            console.log(err);
            next();
        })
        next();
})

app.use('/admin', adminRoutes);

app.use(shopRouter);

app.use(errorController.get404Page);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });

sequelize.sync()
    .then((r) => {
        return User.findAll({where:{id:1}});
    })
    .then(user => {
        if (!user[0]) {
            return User.create({
                email: 'yassineagalmame@gmail.com',
                name: 'yassine agalmame',
            })
        } else return user[0];
    })
    .then(user => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })
