import "reflect-metadata";
import {createConnection,getConnection,Connection} from "typeorm";
import {Stores} from "./entity/Stores";
import configs from './config/configs.json';

const connection = createConnection({
    type: "mysql",
    host: configs.host,
    port: 3306,
    username: configs.user,
    password: configs.password,
    database: configs.database,
    entities: [
        Stores
    ],
    synchronize: true,
});


export class DataBaseAdmin{  
    
    
    
    insertStoreDb(body:any, res:any): void {

      
        connection
            .then(async connection => {
            
                let stores = new Stores();            
                stores.name = body.name;
                stores.address = body.address;
                stores.phone = body.phone;
                stores.cnpj = body.cnpj;
                stores.workingHour = body.workingHour;
                stores.city = body.city;
                stores.state = body.state;        
                
                return connection.manager
                    .save(stores)
                    .then(stores => {                   
                        console.log("Loja salva com sucesso",stores.id);
                        res.status(200).send(stores);
                });
            
            
            }).catch(error => {
                let saidaErro = {
                    "errorCode":"400",
                    "msg": 'Error connect to database'
                }         
                res.status(400).send(saidaErro);
                console.log(error);
                //return 'error';            
            });

        }

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
                    storeToAtualize.city = body.city;
                    storeToAtualize.state = body.state;
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

}

module.exports = function(){
    return DataBaseAdmin;
}