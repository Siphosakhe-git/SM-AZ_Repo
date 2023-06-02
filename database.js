const mysql = require('mysql');

//here we are connectong to the database
const connection = mysql.createConnection({
    host: '10.100.15.124',
    database: 'cmtdb2',
    user: 'admin',
    password: 'password'
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
