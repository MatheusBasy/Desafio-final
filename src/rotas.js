const express = require('express');
const usuarios = require('./componentes/usuarios')
const categorias = require('./componentes/categorias')
const rotas = express()

rotas.get('/user', usuarios.cadastrar)
rotas.get('/category', categorias.listar)

module.exports = rotas