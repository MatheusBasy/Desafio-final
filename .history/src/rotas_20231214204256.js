require('dotenv').config()
const express = require('express');
const rotas = express();
const usuarios = require('./componentes/usuarios');
const clientes = require('./componentes/clientes');
const listar = require('./componentes/categorias');
const tokenVerify = require('./intermediarios/auth');
const { CadastrarProduto, EditarProduto, ListarProduto, DetalharProduto, DeletarProduto } = require('./componentes/produtos');
const upload = require('./intermediarios/upload');
const imagem

rotas.post('/usuario', usuarios.cadastrar);
rotas.post('/login', usuarios.login);
rotas.get("/categoria", listar);
rotas.get('/usuario', tokenVerify, usuarios.detalharPerfil)
rotas.put('/usuario', tokenVerify, usuarios.atualizarPerfil)
rotas.post('/cliente', tokenVerify, clientes.cadastrar)
rotas.put('/cliente/:id', tokenVerify, clientes.editar)
rotas.get('/cliente', tokenVerify, clientes.listar)
rotas.get('/cliente/:id', tokenVerify, clientes.detalhar)
rotas.post('/produto', tokenVerify, CadastrarProduto);
rotas.put('/produto/:id', upload.single('produto_imagem'), tokenVerify, EditarProduto);
rotas.get('/produto', tokenVerify, ListarProduto);
rotas.get('/produto/:id', tokenVerify, DetalharProduto);
rotas.delete('/produto/:id', tokenVerify, DeletarProduto);
rotas.get('/imagens',);

module.exports = rotas;
