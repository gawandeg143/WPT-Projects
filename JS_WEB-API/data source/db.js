'use strict';
const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Gdg@sql',
    database:'mern_proj'
});

connection.connect(function(err) {
    if(err) throw err;
    console.log("Database connected successfully...!!");
});

module.exports = connection;