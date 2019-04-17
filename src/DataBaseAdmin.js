"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Stores_1 = require("./entity/Stores");
const configs_json_1 = __importDefault(require("./config/configs.json"));
class DataBaseAdmin {
    insertDb(body) {
        typeorm_1.createConnection({
            type: "mysql",
            host: configs_json_1.default.host,
            port: 3306,
            username: configs_json_1.default.user,
            password: configs_json_1.default.password,
            database: configs_json_1.default.database,
            entities: [
                Stores_1.Stores
            ],
            synchronize: true,
        }).then((connection) => __awaiter(this, void 0, void 0, function* () {
            let stores = new Stores_1.Stores();
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
                console.log("Loja salva com sucesso", stores.id);
            });
        })).catch(error => console.log(error));
    }
}
exports.DataBaseAdmin = DataBaseAdmin;
module.exports = function () {
    return DataBaseAdmin;
};
