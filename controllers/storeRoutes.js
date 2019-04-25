//DEfinição de rotas

module.exports = function(app) {
    
    //use requisition of type get
    /*app.get("/stores" , function(req,res){
        res.send('OK');
    });*/

    //Metodo POST para adiciona lojas no banco
    app.post("/stores/store",function(req,res){

        //Verifica se os campos estão preenchidos (validator-express)
        req.assert("name", "O campo nome é obrigatório.").notEmpty();
        req.assert("address", "O campo endereço deve ser preenchido").notEmpty();
        req.assert("phone", "O campo telefone deve ser preenchido").notEmpty();
        req.assert("cnpj","O campo CNPJ deve ser preenchido").notEmpty();
        req.assert("workingHour","O campo horário de funcionamento deve ser preenchido").notEmpty();
        req.assert("cityId", "O campo CityId deve ser preenchido").notEmpty();

        let errors = req.validationErrors();
        if(errors) {
            let saidaErro = {
                "errorCode":"400",
                "msg": errors
            }         
            res.status(400).send(saidaErro);
            console.log(saidaErro);
            return;
        }
        
        let store = req.body;

        let connection = new app.src.DataBaseAdmin();
        connection.insertStoreDb(store, res);       

    });

    //rota para adicionar uma cidade no banco de dados
    app.post("/stores/city",function(req,res){

        req.assert("cityName", "O nome da cidade deve ser preenchido").notEmpty();
        req.assert("stateId", "O Id do estado deve ser prenchido").notEmpty();

        let errors = req.validationErrors();
        if(errors){
            let saidaErro = {
                "errorCode":"400",
                "msg": errors
            }         
            res.status(400).send(saidaErro);
            console.log(saidaErro);
            return;
        }

        let city = req.body;
        let connection = new app.src.DataBaseAdmin();
        connection.insertCityDb(city,res);
    });
    
    /* <-- METODOS PUT para atualizartabelas --> */
    
    // Metodo PUT para atualizar as cidades do banco
    app.put("/stores/city/:id", function(req,res){
        let city = req.body;       
        let id = req.params.id;
        //store.id = id;

        let connection = new app.src.DataBaseAdmin();
        connection.updateCityDb(id,city, res);
    });    


    // Metodo PUT para atualizar as lojas do banco
    app.put("/stores/store/:id", function(req,res){
        let store = req.body;       
        let id = req.params.id;
        //store.id = id;

        let connection = new app.src.DataBaseAdmin();
        connection.updateStoreDb(id,store, res);
    });

    // Metodo PUT para atualizar as lojas do banco
    app.put("/stores/state/:id", function(req,res){
        let state = req.body;       
        let id = req.params.id;

        let connection = new app.src.DataBaseAdmin();
        connection.updateStateDb(id,state, res);
    });



    /*<-- METODOS DE DELETE --> */

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

    //Lista estado e cidades
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
}