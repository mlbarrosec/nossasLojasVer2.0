import "reflect-metadata";
import {createConnection} from "typeorm";
import {Stores} from "./entity/Stores";
import configs from './config/configs.json';

export class DataBaseAdmin{    
    insertDb(body:any): void {

        createConnection({
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
        }).then(async connection => {
            
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
            });
        
        
        }).catch(error => console.log(error));

    }
}

module.exports = function(){
    return DataBaseAdmin;
}