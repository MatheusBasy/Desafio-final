require('dotenv').config()
const express = require('express');
const rotas = express();
const usuarios = require('./componentes/usuarios');
const listar = require('./componentes/categorias');
const tokenVerify = require('./intermediarios/auth');

rotas.post('/usuario', usuarios.cadastrar);
rotas.post('/login', usuarios.login);
rotas.get("/categoria", listar);
rotas.get('/usuario', tokenVerify, usuarios.detalharPerfil)
rotas.put('/usuario', tokenVerify, usuarios.atualizarPerfil)

module.exports = rotas;
