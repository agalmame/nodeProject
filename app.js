const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressHBS = require('express-handlebars')
const errorController = require('./controllers/error');
const adminRoutes = require('./routers/admin');
const shopRouter = require('./routers/shop');

const app = express();

app.engine('hbs', expressHBS({
    extname: "hbs",
    defaultLayout: "main-layout",
    layoutsDir: "",
 }));
 
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin',adminRoutes);

app.use(shopRouter);

app.use(errorController.get404Page);

app.listen(3010);