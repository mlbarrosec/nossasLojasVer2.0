var mysql = require('mysql');
var configs = require('../configs.json');
//function fopr create conection db connection
function createDBConnection(){
    return mysql.createConnection({
        host: configs.host,
        user: configs.user,
        password: configs.password,
        database: configs.database
    });
}

//export the connection
module.exports = function (){    
    return createDBConnection;   
}