# API Nossas Lojas
Repositório da API REST para e-comerce "Minhas Lojas", utilizando Node e Banco de dados MYSQL

## Descrição
Essa aplicação tem como objetivo principal implementar um API REST, utilizando node.js e banco de dados MYSQL, responsavel por manilular 
informações de lojas físicas de um ecomerce.
Essa API deve ser capaz de cadastrar, editarm deletar, recuperar, listar e filtrar as lojas cadastradas em um banco. Nessa versão da aplicação esta sendo utilizado a api Typeorm para abstração de banco de dados, e a linguaguem de programação typescript para implementação da mesma.

## APIs Node Utilizadas
Para desenvolvimento da aplicação foi utilizada as seguistes APIs.

-Instalação das apis
Pelo prompt do node, você deve estar localizado na pasta local da sua aplicação e executar os npm listados abaixo.

-Body Parser 1.18.3 (npm install body-parse --save)<br>
-Cosign 0.1.6 (npm install cosign --save)<br>
-Express 4.16.4 (npm install express --save)<br>
-Express-Validator 4.3.1 (npm install express-validator --save)<br>
-Mysql 2.16.0 (npm install mysql --save)<br>
-Nodemon 1.18.10 (npm install nodemon --save)<br>
-Typescript (npm install typescript --save)<br>
-Typeorm (npm install typeorm --save)<br>
-Reflect-metadata (npm install reflect-metadata --save)<br>
-@types (npm install @types/node --save)<br>
-Jest (npm install --save-dev jest)
-Babel (npm install --save-dev babel-cli babel-preset-env jest supertest superagent)

## Compilação do typescript
para compilar o os arquivos typescrits e gerar apartir deles o java script a seguinte configuração deve ser feita no arquivo package.json<br>
>"scripts": { <br>
    "test": "jest", <br>
    "compile": "tsc", <br>
    "start": "tsc -w" <br>
  }<br><br>

Para compilar execute o comando<br> 
>npm start<br>

## Funcionamento
- Para execuar a aplicação é necessário ter o node instalado em seu computador.
você pode obter ele no endereço: https://nodejs.org/en/

- Após instalação execute o comando node index.js na pasta raiz do projeto
seu servidor estará rodando caso apareça no console o aviso "servidor rodando na porta 3000";

- Para testar as requisições é remondavel que use o puglin do postmam para o chrome
o mesmo se encontra para download em: https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop

## Coleção Postmann
- O Arquivo "API REST.postman_collection" contém coleção de requisições utilizadas no sistema, você pode importar ela pelo postmann.

## Teste das Rotas com JEST
- Na pasta test contem o arquivo que testa as requisições ao banco de dados, para executar o teste execute o comando:
>npm test

#### -POST (cadastra elemento loja no banco de dados)

Para utilizar o metodo POST você deve executar a seguinte requisição no postman
Requisição tipo: POST
endereço: http://localhost:3000/stores/store/

E no corpo da requição o json com os dados da loja que deseja cadastrar no banco de dados

<b>exemplo:</b><br>
>{<br>
		"name":"Loja A",<br>
		"address":"Rua Abc, 000",<br>
		"phone":"(00) 0000-0000",<br>
		"cnpj":"00.000.000/0000-00",<br>
		"workingHour":"Diariamente das 11hs às 23hs", <br>
		"city":"Cidade ABC",<br>
		"state":"A"<br>
}<br>

#### -PUT (Edita loja por ID)
Requisição tipo: PUT
Endereço: http://localhost:3000/stores/store/id (troque o id pelo id da linha a ser editada);

Para atualizar um campo no banco de dados você deve passar no postman, o json com os campos que deseja editar
Exemplo:<br>
>{<br>
	"name":"Loja J",<br>
	"address":"Demon teste, 666"<br>
}<br>

Esse comando editara o nome e endereço da loja de id 3 no banco.

#### -DELETE (Deleta uma loja pelo seu ID)
Requisição tipo: DELETE
Ederereço: http://localhost:3000/stores/store/id (troque o id pelo id da linha a ser editada);

Execute no postman a requisição do tipo DELETE com o endereço acima indicando o id da linha que deve ser deletada. 

#### -GET (Listar loja por por ID)
Requisição tipo: GET
Endereço: http://localhost:3000/stores/store/id (troque o id pelo id da linha a ser editada);

Ao executar a requisição do tipo GET pelo postman, você receberá os dados da loja de mesmo id ou a informação de que a loja não foi encontrada.

#### -POST (Listar lojas por cidade, estado, cidade e estado e todas)
Requisição tipo: POST
Endereço: http://localhost:3000/stores/lista

*Para consultar as lojas você deve passar no corpo da requisição os parametros a serem buscados<br>

>{<br>
	"state":"A",<br>
	"cityes": ["Cidade A","Cidade B"]<br>
}<br>

* Caso queira buscar somente por estado deixe o campo cityes sem preenchimento<br>

>{<br>
	"state":"A"<br>
}<br>

*E caso queira buscar todas as lojas não passe nada no corpo da requisição<br>


## Banco de dados

Nessa versão da aplicação o banco de dados é gerado pelas classes entidades (Store, City e State)
para isso basta executar a aplicação<br>

>nodemon index.js<br>

-Atenção: Você pode utilizar o arquivo ourstore.sql, que se encontra na raiz da aplicação, para popular o banco de dados.

## Documentação Swagger da Aplicação
A documentação Swagger da Aplicação está no arquivo <b>"NossasLojas.yaml"</b>
Você pode utilizar o site http://editor.swagger.io/ para importar e visualizar a documentação
