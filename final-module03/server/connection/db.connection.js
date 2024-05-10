const mysql = require('mysql2');

const poot = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'final'
})

const db = root.promise();
module.exports = db;