const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressHBS = require('express-handlebars')
const errorController = require('./controllers/error');
const adminRoutes = require('./routers/admin');
const shopRouter = require('./routers/shop');
const db = require('./util/database')

const app = express();

// db.execute('select * from products').then((r)=>{console.log(r)}).catch((err)=>{console.log(err)});

app.engine('hbs', expressHBS({
    extname: "hbs",
    defaultLayout: "main-layout",
    layoutsDir: "",
 }));
 
app.set('view engine', 'hbs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(path.dirname(process.mainModule.filename), 'public')));

app.use('/admin',adminRoutes);

app.use(shopRouter);

app.use(errorController.get404Page);

app.listen(3010);