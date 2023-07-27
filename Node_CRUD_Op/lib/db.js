var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Gdg@sql',
    database:'node_CRUD',
    insecureAuth: true
});
connection.connect(function(error) {
    if (error) {
        console.log(error);
    } else {
        console.log('Database connected successfully...!!');
    }
});

module.exports = connection;