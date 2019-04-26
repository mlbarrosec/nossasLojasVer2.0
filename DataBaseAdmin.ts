import "reflect-metadata";
import {createConnection,getConnection,Connection} from "typeorm";
import {Stores} from "./entity/Stores";
import {City} from "./entity/City";
import {State} from "./entity/State"
import configs from './config/configs.json';

//Casse reponsavel pela consultas ao bando de dados, usando a API typeorm

//cria uma constante de conexão como o banco de dados
const connection = createConnection({
    type: "mysql",
    host: configs.host,
    port: 3306,
    username: configs.user,
    password: configs.password,
    database: configs.database,
    entities: [
        Stores,
        City,
        State
    ],
    synchronize: true,
});



export class DataBaseAdmin{
    
    /*<---- SAVES IN DATABASES ------>*/

    //Função reponsavel por fazer a inserção de uma loja no banco
    insertStoreDb(body:any, res:any): void {
        connection
            .then(async connection => {
            
                //pega os valores das variaveis passa no body da requisição
                let stores = new Stores();            
                stores.name = body.name;
                stores.address = body.address;
                stores.phone = body.phone;
                stores.cnpj = body.cnpj;
                stores.workingHour = body.workingHour;
                stores.city = body.cityId;
                //stores.state = body.state;

                //salva loja no banco de dados
                return connection.manager
                    .save(stores)
                    .then(stores => {                   
                        console.log("Loja salva com sucesso",stores.id);
                        res.status(200).send(stores);
                });            
            
            }).catch(error => {
                //Caso algum erro ocorra retorna o erro 
                let saidaErro = {
                    "errorCode":"400",
                    "msg": 'Error connect to database'
                }         
                res.status(400).send(saidaErro);
                console.log(error);            
            });
    }


    insertCityDb(body:any, res:any): void{
        connection
            .then(async connection => {           
                
                let city = new City();            
                city.name = body.cityName;
                city.state = body.stateId;
                
                return connection.manager
                    .save(city)
                    .then(city => {                   
                        console.log("Cidade salva com sucesso",city.id);
                        res.status(200).send(city);
                });            
            
            }).catch(error => {                
                let saidaErro = {
                    "errorCode":"400",
                    "msg": 'Error connect to database'
                }         
                res.status(400).send(saidaErro);
                console.log(error);            
            });
    }

    /*<---- UPDATES IN DATABASES ------>*/

    //função responsavel por atualizar um registro no banco de dados
    //usa como parametro um id e o corpo da requisicao
    updateStoreDb(id:number, body:any, res:any) :void {
        
        connection
        .then( async connection => {
            
            //coloca todas as lojas na variavel allStores
            let allStores = connection.getRepository(Stores);
            
            let storeToAtualize = await allStores.findOne(id);            
            storeToAtualize.name = body.name;
            storeToAtualize.address = body.address;
            storeToAtualize.phone = body.phone;
            storeToAtualize.cnpj = body.cnpj;
            storeToAtualize.workingHour = body.workingHour;
            storeToAtualize.city = body.cityId;
            await allStores.save(storeToAtualize);
            
            console.log("Loja atualizada com sucesso");
            res.status(200).send(storeToAtualize);
            
        }).catch ( error => {
            let saidaErro = {
                "errorCode":"400",
                "msg": 'Error connect to database'
            }         
            res.status(400).send(saidaErro);
            console.log(error);
        });
        
    }

    updateCityDb(id:number, body:any, res:any):void{

        connection
        .then( async connection => {
            
            //coloca todas as lojas na variavel allStores
            let allCityes = connection.getRepository(City);
            
            let cityToAtualize = await allCityes.findOne(id); 
            cityToAtualize.name = body.cityName;           

            await allCityes.save(cityToAtualize);            
            console.log("Cidade atualizada com sucesso");
            res.status(200).send(cityToAtualize);
            
        }).catch ( error => {
            let saidaErro = {
                "errorCode":"400",
                "msg": 'Error connect to database'
            }         
            res.status(400).send(saidaErro);
            console.log(error);
        });
    }

    updateStateDb(id:number, body:any,res:any):void{
        connection
        .then( async connection => {
            
            //coloca todas as lojas na variavel allStores
            let allStates = connection.getRepository(State);
            
            let statesToAtualize = await allStates.findOne(id); 
            statesToAtualize.name = body.name;
            statesToAtualize.region = body.region;
            statesToAtualize.initials = body.initials;         

            await allStates.save(statesToAtualize);            
            console.log("Estado atualizada com sucesso");
            res.status(200).send(statesToAtualize);
            
        }).catch ( error => {
            let saidaErro = {
                "errorCode":"400",
                "msg": 'Error connect to database'
            }         
            res.status(400).send(saidaErro);
            console.log(error);
        });
    }

    /*<---- DELETES IN DATABASES ------>*/
    //funcao resposavel por deletar um registro da tabela por seu id
    deleteStoreDb(id:number, res:any):void{
        
        connection
        .then(async connection => {
            
            let allStores = connection.getRepository(Stores);
            let storeToRemove = await allStores.findOne(id);
                await allStores.remove(storeToRemove);
                
                console.log("Loja Excluida com sucesso");
                res.status(200).send("Loja excluida com sucesso: " + id);

            }).catch(error => {
                let saidaErro = {
                    "errorCode":"400",
                    "msg": 'Error connect to database'
                }         
                res.status(400).send(saidaErro);
                console.log(error);
            });
    }
    
    //função responsavel por buscar um registro atravez de seu id
    listStoreIdDb(id:number,res:any){
    
        connection
        .then(async connection => {

            //usa o get repository, que coloca todos os valores de store em uma variavel
            //e depois busca nela os registros
            let allStores = connection.getRepository(Stores);
            let storeToFind = await allStores.findOne(id);
            
            if(storeToFind != undefined){
                console.log('Loja Encontada'+ JSON.stringify(storeToFind));
                res.send(storeToFind);

            }else{
                console.log('Nenhuma loja encontrada');
                res.send("Nenhuma loja encontrada");
            }
            
        }).catch(error => {
            let saidaErro = {
                "errorCode":"400",
                "msg": 'Error connect to database'
            }         
            res.status(400).send(saidaErro);
            console.log(error);
        });
    
    }
    
    //funcao responsavel por listar todas as lojas, por estado e cidades
    listStateCityDb(body:any, res: any) {

        connection
            .then (async connection => {    
                
                if(body.state == undefined && body.cityes == undefined){
                    
                    let StoresToFind = await connection.createQueryBuilder(Stores, "stores")
                            .innerJoin("stores.city", "city")
                            .innerJoin("city.state", "state")                                
                            .getMany();
                
                    if(StoresToFind != undefined){
                        console.log('Loja Encontada'+ JSON.stringify(StoresToFind));
                        res.send(StoresToFind);
                    }else{
                        console.log('Nenhuma loja encontrada');
                        res.send("Nenhuma loja encontrada");
                    }
                
                }else if(body.state != undefined && body.cityes == undefined){
                    
                    let StoresToFind = await connection.createQueryBuilder(Stores, "stores")
                            .innerJoin("stores.city", "city")
                            .innerJoin("city.state", "state")
                            .where("state.initials in (:state)", { state : body.state })
                            .getMany();
                    
                    if(StoresToFind != undefined){
                        console.log('Loja Encontada'+ JSON.stringify(StoresToFind));
                        res.send(StoresToFind);
                    }else{
                        console.log('Nenhuma loja encontrada');
                        res.send("Nenhuma loja encontrada");
                    }
                    
                }else if(body.state != undefined && body.cityes != undefined){                        

                    let StoresToFind = await connection.createQueryBuilder(Stores, "stores")
                            .innerJoin("stores.city", "city")
                            .innerJoin("city.state", "state")
                            .where("city.name in (:city) and state.initials in (:state)", { city : body.cityes, state : body.state })
                            .getMany();
                    
                    if(StoresToFind != undefined){
                        console.log('Loja Encontada'+ JSON.stringify(StoresToFind));
                        res.send(StoresToFind);
                    }else{
                        console.log('Nenhuma loja encontrada');
                        res.send("Nenhuma loja encontrada");
                    }

                }

            }).catch (error => {
                let saidaErro = {
                    "errorCode":"400",
                    "msg": 'Error connect to database'
                }         
                res.status(400).send(saidaErro);
                console.log(error);
            });
    }

    

}

module.exports = function(){
    return DataBaseAdmin;
}