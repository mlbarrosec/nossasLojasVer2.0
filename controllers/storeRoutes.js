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
            console.log("Erros de validação encontrados");
            res.status(400).send(errors);
            return;
        }

        //store recebe o corpo json da requisição
        //utiliza-se aqui a api body-parser
        var store = req.body;
       
        //Cria a conexão com o banco de dados
        var connection = app.persistencia.ConnectionConfig();
        var storeDAO = new app.persistencia.StoreDAO(connection);

        storeDAO.save(store, function (erro, resultado){
            if(erro){
                console.log("Erro ao inserir no banco: " + erro);
                res.status(500).send(erro);
            }else{
                console.log('Loja Cadastrada');
                res.location('/stores/store/' + resultado.insertId);

                res.status(201).json(store);
            }            
        });

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
                console.log("Error insertion data base " + error);
                res.status(500).send(error);
            }else{
                console.log("Lojas encontradas");
                res.send(result);
                //res.status(201).json(list)
            }
        });


    });


    // Metodo PUT para atualizar os dados pasando
    app.put("/stores/store/:id", function(req,res){
        var store = req.body;       
        var id = req.params.id;
        store.id = id;

        var connection = app.persistencia.ConnectionConfig();
        var storeDAO = new app.persistencia.StoreDAO(connection);

        storeDAO.update(store, function(erro){
            if(erro){
                res.status(500).send(erro);
                return;
            }else{
                console.log('Loja atualizada');
                //res.send(store);
                res.status(201).json(store);

            }
        });

    });

    //Metodo para deletar loja por ID
    app.delete("/stores/store/:id", function (req,res){
        var store = {}

        //Pega o ID do parametro da requisição
        var id = req.params.id;
        store.id = id;
        
        var connection = app.persistencia.ConnectionConfig();
        var storeDAO = new app.persistencia.StoreDAO(connection);

        storeDAO.delete(store, function(erro){
            if(erro){
                res.status(500).send(erro);
                return;
            }else{
                console.log('Loja deletada');
                res.send(store)
                res.status(204).json(store);
            }
        })

    });

    // Metodo GET para busca por ID
    app.get("/stores/store/:id", function(req, res){
        
        var id = req.params.id;       

        var connection = app.persistencia.ConnectionConfig();
        var storeDAO = new app.persistencia.StoreDAO(connection);

        storeDAO.searchForID(id, function(error,result){
            if(error){
                res.status(500).send(error);
                return;
            }else{
                //Caso naõ encontre retorna um erro ao usuário
                if(result == ""){
                    res.send("Loja não encontrada");
                }else{
                    console.log('Loja Encontada'+ JSON.stringify(result));
                    res.send(result);
                    return;
                }
            }
        })
    
    });

    

    //Metodo GET para busca por estado e cidade
    /*
        app.get("/stores/lista/:state?/:city?", function(req, res){
                
            var city = req.params.city;
            var state = req.params.state;        

            if(city != undefined){
                resposta = city.replace("&","-");
                var cityes = resposta.split("-");            
            }
            var connection = app.persistencia.ConnectionConfig();
            var storeDAO = new app.persistencia.StoreDAO(connection);

            storeDAO.listStores(state, cityes, function(error,result){
                if(error){
                    res.status(500).send(error);
                    return;
                }else{
                    //Caso não encontre resultado na busca, retorna ao usuario 
                    //que não encontrou
                    if(result == ""){
                        res.send("Loja não localizada");
                        return;
                    }else{
                        res.send(result);
                        return;
                    }
                }
            });
        });
    */

}