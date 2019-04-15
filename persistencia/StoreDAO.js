//Definição da queryes

function StoreDAO(connection) {
    this._connection = connection;
}

StoreDAO.prototype.save = function(store,callback){
    this._connection.query("INSERT INTO stores SET ?", store, callback);
}

StoreDAO.prototype.update = function(store,callback) {
    this._connection.query("UPDATE stores SET ? WHERE id = ?",[store, store.id], callback);
}

StoreDAO.prototype.delete = function (store, callback){
    this._connection.query("DELETE FROM stores WHERE id = ?", store.id, callback);
}

StoreDAO.prototype.searchForID = function(id,callback){
    this._connection.query("SELECT * FROM stores where id = ?",[id],callback);
}

StoreDAO.prototype.listStores = function(state,cityes,callback){    
   
    //Esse conjunto de if definem a query que deve ser feita de acordo 
    //como que campos foram preenchidos na requisição.
    if(cityes == undefined && state == undefined){
        this._connection.query("SELECT * FROM stores",callback);
    }else if (state != undefined && cityes == undefined){
        this._connection.query("SELECT * FROM stores WHERE state = ? ", state, callback);
    }else if(state != undefined && cityes != undefined){       

        this._connection.query("SELECT * FROM stores WHERE state = ? AND city in (?)",[state, cityes],callback);
    }
}

module.exports = function(){
    return StoreDAO;
}