"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Store_1 = require("./entity/Store");
//var configs = require('../config/configs.json');
typeorm_1.createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "ourstore",
    entities: [
        __dirname + "/persistencia/entity/*.js"
    ],
    synchronize: true,
}).then(connection => {
    let store = new Store_1.Store();
    store.name = "Loja F";
    store.anddress = "Rua FGR";
    store.phone = "99999-999";
    store.cnpj = "00.000.000/0000-00";
    store.workingHour = "Diariamente das 11hs às 23hs";
    store.city = "Cidade LK";
    store.state = "Estado G";
    return connection.manager
        .save(store)
        .then(store => {
        console.log("Loja salva com sucesso", store.id);
    });
}).catch(error => console.log(error));
//# sourceMappingURL=saveStore.js.map