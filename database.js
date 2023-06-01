const mysql = require('mysql');

//here we are connectong to the database
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
