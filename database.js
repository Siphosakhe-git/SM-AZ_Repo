const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'cmt',
    user: 'root',
    password: ''
});

connection.connect(function(error){
    if(error){
        throw error;
    }
    else{
        console.log("Mysql connected successfully!");
    }
});

module.exports = connection;