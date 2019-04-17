import {createConnection} from "typeorm";
import {Stores} from "./entity/Stores"
import "reflect-metadata";
import configs from './config/configs.json';

createConnection({
    type: "mysql",
    host: configs.host,
    port: 3306,
    username: configs.user,
    password: configs.password,
    database: configs.database,
    entities: [
        __dirname + "/entity/*.js"
    ],
    synchronize: true,
}).then(connection => {
    
    let stores = new Stores();
    
    stores.name = "Loja F";
    stores.address = "Rua FGR";
    stores.phone = "99999-999";
    stores.cnpj = "00.000.000/0000-00";
    stores.workingHour = "Diariamente das 11hs às 23hs";
    stores.city = "Cidade LK";
    stores.state = "G";    

    return connection.manager
        .save(stores)
        .then(stores => {
            console.log("Loja salva com sucesso",stores.id);
    });


}).catch(error => console.log(error));