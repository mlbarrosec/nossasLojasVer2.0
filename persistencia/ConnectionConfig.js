var mysql = require('mysql');
//function fopr create conection db connection
function createDBConnection(){
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'ourstore'
    });
}

//export the connection
module.exports = function (){    
    return createDBConnection;   
}