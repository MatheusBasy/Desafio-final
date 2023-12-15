const express = require('express');
const usuarios = require('./componentes/usuarios');
const listar = require('./componentes/categorias');
const auth = require("./intermediarios/auth");
const rotas = express();
require('dotenv').config()

rotas.post('/usuario', usuarios.cadastrar);
rotas.post('/login', usuarios.login);

//AU
rotas.use(auth);

rotas.get("/categoria", listar);

module.exports = rotas;