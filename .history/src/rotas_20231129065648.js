const express = require('express');
const usuarios = require('./componentes/usuarios');
const listar = require('./componentes/categorias');
const auth = require("./intermediarios/auth");
const rotas = express();
require('dotenv').config()

rotas.post('/usuario', usuarios.cadastrar);
rotas.post('/login', usuarios.login);

//Autenticando usuario logado
//rotas.use(auth);

rotas.get('/perfil', usuario);
rotas.put('/perfil', usuarios.atualizarPerfil);

rotas.get("/categoria", listar);

module.exports = rotas;