const request = require('supertest');

test('Testes de Rotas', (done) => {

    //Teste na rota para cadastrar uma loja por POST
    request('localhost:3000')
        .post('/stores/store')
        .send(
            {
                name:"Loja Rio Grande 8",
                address:"General Câmara, 568",
                phone:"(XX)XXXXX-XX",
                cnpj: "00.000.000/0000-00",
                workingHour: "Diariamente das 11hs às 23hs",
                cityId: 1
            }
        )
        .set('Accept', /application\/json/)
        .then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });

    //Teste para cadastrar uma cidade por POST
    request('localhost:3000')
        .post('/stores/city')
        .send({
            cityName:"Passo Fundo",
            stateId: 4
        })
        .set('Accept', /application\/json/)
        .then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        })
    
    //Teste para atualizar dados de uma loja por PUT
    request('localhost:3000')
        .put('/stores/store/1')
        .send(
            {
                name: "Loja Silva Paes",
                address: "Rua Nova"
            }
        )
        .set('Accept', /application\/json/)
        .then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        })
    
    //Teste para atualizar uma cidade por PUT
    request('localhost:3000')
        .put('/stores/city/1')
        .send(
            {
                cityName: "Rio Grande Novo"
            }
        )
        .set('Accept', /application\/json/)
        .then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        })
    
    //Teste para atualizar um estado por PUT
    request('localhost:3000')
        .put('/stores/state/4')
        .send (
            {
                name: "Rio Grande do Sul Novo",
                region: "Sul novo",
                initial: "RS"
            }
        )
        .set('Accept', /application\/json/)
        .then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        })
    
    //Teste para deletar uma loja pelo seu id usando DELETE
    request('localhost:3000')
        .delete('/stores/store/11')
        .then((response)=>{
            expect(response.statusCode).toBe(200);
            done();
        })
    
    //Teste para listar uma loja por seu id usando GET    
    request('localhost:3000')
        .get('/stores/store/1')
        .then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        })
    
    //Teste para listar todas as lojas usando POST
    request('localhost:3000')
        .post('/stores/lista')
        .then((response)=> {
            expect(response.statusCode).toBe(200);
            done();
        })
    
    //Teste para listar todas as lojas de um estado usando POST
    request('localhost:3000')
        .post('/stores/lista')
        .send(
            {
                state: "RS"
            }
        )
        .set('Accept', /application\/json/)
        .then( (response) => {
            expect(response.statusCode).toBe(200);
            done();
        })
    
    //Teste para listar todas as lojas de um estado e cidade(s) usando POST
    request('localhost:3000')
        .post('/stores/lista')
        .send(
            {
                state: "RS",
                cityes: ["Rio Grande Novo"]
            }
        )
        .set('Accept', /application\/json/)
        .then( (response) => {
            expect(response.statusCode).toBe(200);
            done();
        })

});
