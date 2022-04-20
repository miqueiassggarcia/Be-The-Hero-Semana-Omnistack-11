const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

// Rota / Recurso (rotas são passadas e montadas atraves da url)

/**
* Métodos HTTP:
*
* GET: Buscar/listar uma informação dp back-end
* POST: Criar uma informação no back-end
* PUT: Alterar uma informação no back-end
* DELETE: Deletar uma informação no back-end
*/

/**
 * Tipos de Parâmetro
 * 
 * Query Params: Parâmetros nomeados enviados na rota após "?" e usando & para adicionar cada(Filtros, Páginação) (metodo de acesso: request.query)
 * Route Params: Parâmetros utilizados para indentificar recursos (são adicionados na rota EX:post(/user:id) e na rota do navegador, apos a barra, então, /user/1) (metodo de acesso: request.params)
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos (metodo de acesso: request.body), para utilizar o corpo é necessario json, e tambem é necessario informar ao express que vai-se utilizar json
 */

/**
 * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server.
 * NoSQL: MongoDB, CouchDB, etc.
 */

/**
 * Driver: SELECT * FROM users
 * Query Builder: table('users').select('*').where()
 */

module.exports = app;