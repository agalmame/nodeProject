const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let db;

const mongoConnect = callback => {
    MongoClient.connect('mongodb+srv://yassune:'+process.env.pass+'@node-shop-ykwpi.mongodb.net/shop?retryWrites=true&w=majority', { useUnifiedTopology: true })
        .then(result => {
            db = result.db();
            // console.log(db)
            callback();
        })
        .catch(er => {
            Console.log(er)
        })
}

const getDb = () => {
    if (db) {
        return db;
    }
    throw "no database found";
}

exports.mongoConnect = mongoConnect;

exports.getDb = getDb;