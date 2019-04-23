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
const City_1 = require("./entity/City");
const State_1 = require("./entity/State");
const configs_json_1 = __importDefault(require("./config/configs.json"));
//Casse reponsavel pela consultas ao bando de dados, usando a API typeorm
//cria uma constante de conexão como o banco de dados
const connection = typeorm_1.createConnection({
    type: "mysql",
    host: configs_json_1.default.host,
    port: 3306,
    username: configs_json_1.default.user,
    password: configs_json_1.default.password,
    database: configs_json_1.default.database,
    entities: [
        Stores_1.Stores,
        City_1.City,
        State_1.State
    ],
    synchronize: true,
});
class DataBaseAdmin {
    //Função reponsavel por fazer a inserção de uma loja no banco
    insertStoreDb(body, res) {
        connection
            .then((connection) => __awaiter(this, void 0, void 0, function* () {
            //pega os valores das variaveis passa no body da requisição
            let stores = new Stores_1.Stores();
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
                console.log("Loja salva com sucesso", stores.id);
                res.status(200).send(stores);
            });
        })).catch(error => {
            //Caso algum erro ocorra retorna o erro 
            let saidaErro = {
                "errorCode": "400",
                "msg": 'Error connect to database'
            };
            res.status(400).send(saidaErro);
            console.log(error);
        });
    }
    //função responsavel por atualizar um registro no banco de dados
    //usa como parametro um id e o corpo da requisicao
    updateStoreDb(id, body, res) {
        connection
            .then((connection) => __awaiter(this, void 0, void 0, function* () {
            //coloca todas as lojas na variavel allStores
            let allStores = connection.getRepository(Stores_1.Stores);
            let storeToAtualize = yield allStores.findOne(id);
            storeToAtualize.name = body.name;
            storeToAtualize.address = body.address;
            storeToAtualize.phone = body.phone;
            storeToAtualize.cnpj = body.cnpj;
            storeToAtualize.workingHour = body.workingHour;
            storeToAtualize.city = body.cityId;
            //storeToAtualize.state = body.state;
            yield allStores.save(storeToAtualize);
            console.log("Loja atualizada com sucesso");
            res.status(200).send(storeToAtualize);
        })).catch(error => {
            let saidaErro = {
                "errorCode": "400",
                "msg": 'Error connect to database'
            };
            res.status(400).send(saidaErro);
            console.log(error);
        });
    }
    //função responsavel por buscar um registro atravez de seu id
    listStoreIdDb(id, res) {
        connection
            .then((connection) => __awaiter(this, void 0, void 0, function* () {
            //usa o get repository, que coloca todos os valores de store em uma variavel
            //e depois busca nela os registros
            let allStores = connection.getRepository(Stores_1.Stores);
            let storeToFind = yield allStores.findOne(id);
            if (storeToFind != undefined) {
                console.log('Loja Encontada' + JSON.stringify(storeToFind));
                res.send(storeToFind);
            }
            else {
                console.log('Nenhuma loja encontrada');
                res.send("Nenhuma loja encontrada");
            }
        })).catch(error => {
            let saidaErro = {
                "errorCode": "400",
                "msg": 'Error connect to database'
            };
            res.status(400).send(saidaErro);
            console.log(error);
        });
    }
    //funcao responsavel por listar todas as lojas, por estado e cidades
    listStateCityDb(body, res) {
        connection
            .then((connection) => __awaiter(this, void 0, void 0, function* () {
            if (body.state == undefined && body.cityes == undefined) {
                let StoresToFind = yield connection.createQueryBuilder(Stores_1.Stores, "stores")
                    .innerJoin("stores.city", "city")
                    .innerJoin("city.state", "state")
                    .getMany();
                if (StoresToFind != undefined) {
                    console.log('Loja Encontada' + JSON.stringify(StoresToFind));
                    res.send(StoresToFind);
                }
                else {
                    console.log('Nenhuma loja encontrada');
                    res.send("Nenhuma loja encontrada");
                }
            }
            else if (body.state != undefined && body.cityes == undefined) {
                let StoresToFind = yield connection.createQueryBuilder(Stores_1.Stores, "stores")
                    .innerJoin("stores.city", "city")
                    .innerJoin("city.state", "state")
                    .where("state.initials in (:state)", { state: body.state })
                    .getMany();
                if (StoresToFind != undefined) {
                    console.log('Loja Encontada' + JSON.stringify(StoresToFind));
                    res.send(StoresToFind);
                }
                else {
                    console.log('Nenhuma loja encontrada');
                    res.send("Nenhuma loja encontrada");
                }
            }
            else if (body.state != undefined && body.cityes != undefined) {
                let StoresToFind = yield connection.createQueryBuilder(Stores_1.Stores, "stores")
                    .innerJoin("stores.city", "city")
                    .innerJoin("city.state", "state")
                    .where("city.name in (:city) and state.initials in (:state)", { city: body.cityes, state: body.state })
                    .getMany();
                if (StoresToFind != undefined) {
                    console.log('Loja Encontada' + JSON.stringify(StoresToFind));
                    res.send(StoresToFind);
                }
                else {
                    console.log('Nenhuma loja encontrada');
                    res.send("Nenhuma loja encontrada");
                }
            }
        })).catch(error => {
            let saidaErro = {
                "errorCode": "400",
                "msg": 'Error connect to database'
            };
            res.status(400).send(saidaErro);
            console.log(error);
        });
    }
    //funcao resposavel por deletar um registro da tabela por seu id
    deleteStoreDb(id, res) {
        connection
            .then((connection) => __awaiter(this, void 0, void 0, function* () {
            let allStores = connection.getRepository(Stores_1.Stores);
            let storeToRemove = yield allStores.findOne(id);
            yield allStores.remove(storeToRemove);
            console.log("Loja Excluida com sucesso");
            res.status(200).send("Loja excluida com sucesso: " + id);
        })).catch(error => {
            let saidaErro = {
                "errorCode": "400",
                "msg": 'Error connect to database'
            };
            res.status(400).send(saidaErro);
            console.log(error);
        });
    }
}
exports.DataBaseAdmin = DataBaseAdmin;
module.exports = function () {
    return DataBaseAdmin;
};
