const Sequelize = require('sequelize');

const sequelize = new Sequelize('test','root','portable360*',{
    host:'localhost',
    dialect:'mysql'
});


module.exports = sequelize;