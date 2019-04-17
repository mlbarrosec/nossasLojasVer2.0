"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Stores_1 = require("./entity/Stores");
require("reflect-metadata");
const configs_json_1 = __importDefault(require("./config/configs.json"));
typeorm_1.createConnection({
    type: "mysql",
    host: configs_json_1.default.host,
    port: 3306,
    username: configs_json_1.default.user,
    password: configs_json_1.default.password,
    database: configs_json_1.default.database,
    entities: [
        __dirname + "/entity/*.js"
    ],
    synchronize: true,
}).then(connection => {
    let stores = new Stores_1.Stores();
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
        console.log("Loja salva com sucesso", stores.id);
    });
}).catch(error => console.log(error));
//# sourceMappingURL=saveStore.js.map