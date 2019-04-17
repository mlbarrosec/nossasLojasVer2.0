//Arquivo de configuração do express
var express = require ('express'); //importa a biblióteca express
var consign = require('consign'); //import consign api

var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function() { //esse modulo exporta a variavel app com express e suas funcionalidades
    
    var app = express();

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.use(expressValidator());

    consign()
        .include('controllers') //include de folder controllers
        .then('persistencia')
        .then('src')
        .into(app);
    
    return app;
}