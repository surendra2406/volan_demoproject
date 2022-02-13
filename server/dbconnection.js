var mysql =require('mysql');

var connection =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"db_demo"
})

connection.connect(function(error){
    if(error){
        console.log("error"+error)
    }
    else{
        console.log("MySql database connection done");
    }
})

module.exports = connection;
