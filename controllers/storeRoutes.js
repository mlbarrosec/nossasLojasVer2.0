//DEfinição de rotas

module.exports = function(app) {
    
    //use requisition of type get
    /*app.get("/stores" , function(req,res){
        res.send('OK');
    });*/

    //MEtodo POST para adiciona lojas no banco
    app.post("/stores/store",function(req,res){

        //Verifica se os campos estão preenchidos (validator-express)
        req.assert("name", "O campo nome é obrigatório.").notEmpty();
        req.assert("address", "O campo endereço deve ser preenchido").notEmpty();
        req.assert("phone", "O campo telefone deve ser preenchido").notEmpty();
        req.assert("cnpj","O campo CNPJ deve ser preenchido").notEmpty();
        req.assert("workingHour","O campo horário de funcionamento deve ser preenchido").notEmpty();
        req.assert("city", "A campo cidade deve ser preenchido").notEmpty();
        req.assert("state", "O campo state tem que ser preenchido").notEmpty();

        
        var errors = req.validationErrors();
        if(errors) {
            let saidaErro = {
                "errorCode":"400",
                "msg": errors
            }         
            res.status(400).send(saidaErro);
            console.log(saidaErro);
            return;
        }
        
        var store = req.body;

        var connection = new app.src.DataBaseAdmin();
        connection.insertStoreDb(store, res);     
       

    });

    app.post('/stores/lista', function (req, res){

        var errors = req.validationErrors();
        if(errors) {
            console.log("Erros de validação encontrados");
            res.status(400).send(errors);
            return;
        }

        var list = req.body;
        //Cria a conexão com o banco de dados
        var connection = app.persistencia.ConnectionConfig();
        var storeDAO = new app.persistencia.StoreDAO(connection);

        storeDAO.listStores(list,function(error, result){
            if(error){
                
                var saidaErro = {
                    "errorCode":"500",
                    "msg":"Internal server error"
                }  
                res.status(500).send(saidaErro);
                console.log(saidaErro);

                return;
                /*console.log("Error insertion data base " + error);
                res.status(500).send(error);*/
            }else{
                console.log("Store founded");
                res.send(result);
                //res.status(201).json(list)
            }
        });


    });


    // Metodo PUT para atualizar os dados pasando
    app.put("/stores/store/:id", function(req,res){
        let store = req.body;       
        let id = req.params.id;
        //store.id = id;

        let connection = new app.src.DataBaseAdmin();
        connection.updateStoreDb(id,store, res);
    });

    //Metodo para deletar loja por ID
    app.delete("/stores/store/:id", function (req,res){
        //let store = {}
        //Pega o ID do parametro da requisição
        let id = req.params.id;
        //store.id = id;
        let connection = new app.src.DataBaseAdmin();
        connection.deleteStoreDb(id,res);
    });

    // Metodo GET para busca por ID
    app.get("/stores/store/:id", function(req, res){
        
        var id = req.params.id;       

        var connection = app.persistencia.ConnectionConfig();
        var storeDAO = new app.persistencia.StoreDAO(connection);

        storeDAO.searchForID(id, function(error,result){
            if(error){
                var saidaErro = {
                    "errorCode":"500",
                    "msg":"Internal server error"
                }  
                res.status(500).send(saidaErro);
                console.log(saidaErro);
                return;
            }else{
                //Caso naõ encontre retorna um erro ao usuário
                if(result == ""){
                    let saidaErro = {
                        "errorCode":"204",
                        "msg":"Store Found"
                    }  
                    res.send(saidaErro);
                    console.log(saidaErro);                    
                }else{
                    console.log('Loja Encontada'+ JSON.stringify(result));
                    res.send(result);
                    return;
                }
            }
        })
    
    });
}