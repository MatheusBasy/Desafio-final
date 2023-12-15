const express = require('express');
const usuarios = require('./componentes/usuarios');
const listar = require('./componentes/categorias');
const rotas = express();
require('dotenv').config()

rotas.post('/usuario', usuarios.cadastrar);
rotas.post('/login', usuarios.login);


rotas.put('/usuario', usuarios.atualizarPerfil);

rotas.get('/usuario', auth, usuarios.detalharPerfil);
rotas.get("/categoria", listar);

module.exports = rotas;