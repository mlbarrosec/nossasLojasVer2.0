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

        let connection = new app.src.DataBaseAdmin();
        connection.listStateCityDb(list,res);       


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
        
        let connection = new app.src.DataBaseAdmin();
        connection.listStoreIdDb(id,res);
    
    });
}