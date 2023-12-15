const knex = require('../BancoDeDados/conexao')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const cadastrar = async (req, res) => {
    const { nome, email, senha } = req.body

    try {

        if (!nome || !email || !senha) {
            return res.status(404).json({ mesangem: "Todos dados são obrigatórios" })
        }

        const emailExistente = await knex('usuarios').select('email').where('email', email)
        if (emailExistente.length > 0) {
            return res.status(400).json({ mesangem: "Email já cadastrado" })
        }

        const senhaCripto = await bcrypt.hash(senha, 10)

        await knex('usuarios').insert({ nome: nome, email: email, senha: senhaCripto })

        return res.status(200).json({ mesangem: "Usuário cadastrado com sucesso" })

    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const login = async (req, res) => {
    const { email, senha } = req.body

    try {
        const usuario = await knex('usuarios').select("*").where('email', email)

        if (!email) {
            return res.status(400).json({ mesangem: "O email é obrigatório" })
        }
        if (!senha) {
            return res.status(400).json({ mesangem: "A senha é obrigatória" })
        }

        const validarSenha = await bcrypt.compare(senha, usuario[0].senha)

        if (!validarSenha) {
            return res.status(404).json({ mensagem: "Usuário e/ou senha inválido(s)." })
        }

        const token = await jwt.sign(
            { id: usuario[0].id },
            process.env.JWT_PASS,
            { expiresIn: '12h' })

        const { senha: _, ...usuarioLogado } = usuario[0]
        return res.json({ usuario: usuarioLogado, token })

    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const detalharPerfil = async (req, res) => {
    const {authorization} = req.headers;
    try {
        let token = authorization.split(' ')[1];
        token = jwt.decode(token);
        
        const usuario = await knex('usuarios').select("*").where('id', token.id);
        const {senha: _, ...usuario}
        if(!usuario){
            return res.status(404).json({mensagem: "Nenhum perfil encontrado!"});
        }
        return res.json(usuario);

    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const atualizarPerfil = async (req, res) => {
    const {authorization} = req.headers;
    const { nome, email, senha } = req.body
    try {

        if (!nome || !email || !senha) {
            return res.status(404).json({ mesangem: "Todos os campos são obrigatórios" });
        }

        const senhaCripto = await bcrypt.hash(senha, 10);
        const usuarioAtualizado = await knex('usuarios').update({ nome: nome, email: email, senha: senhaCripto }).where({email});
        if(!usuarioAtualizado){
            return res.status(400).json({mensagem:"Usuario não atualizado!"});
        }
        return res.json({ mensagem: "Atualizado com êxito!" });

    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = {
    cadastrar,
    login,
    detalharPerfil,
    atualizarPerfil,
}