
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database:'test',
    password: 'portable360*'
});

module.exports = pool.promise();