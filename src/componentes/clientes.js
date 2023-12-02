const knex = require('../BancoDeDados/conexao');

const cadastrar = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body

    try {
        if (!nome || !email || !cpf) {
            return res.status(400).json({ mensagem: "Os campos Nome, Email e CPF são obrigatórios" })
        }


        const emailCadastrado = await knex('clientes').select('*').where('email', email)
        if (emailCadastrado.length > 0) {
            return res.status(400).json({ mensagem: "Email ou CPF já cadastrado" })
        }

        const cpfCadastrado = await knex('clientes').select('*').where('cpf', cpf)
        if (cpfCadastrado.length > 0) {
            return res.status(400).json({ mensagem: "Email ou CPF já cadastrado" })
        }

        await knex('clientes').insert({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado })
        return res.status(202).json({ mensagem: 'Cliente cadastrado com sucesso!' })

    } catch (erro) {
        return res.status(400).json({ mensagem: "Erro interno do servidor!" })
    }
}

const editar = async (req, res) => {
    const { id } = req.params
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body
    try {
        if (!nome, !email, !cpf) {
            return res.status(400).json({ mensagem: "Os campos Nome, Email e CPF são obrigatórios" })
        }

        const emailCadastrado = await knex('clientes').select('*').where('email', email)
        if (emailCadastrado.length > 0) {
            return res.status(400).json({ mensagem: "Email ou CPF já cadastrado" })
        }

        const cpfCadastrado = await knex('clientes').select('*').where('cpf', cpf)
        if (cpfCadastrado.length > 0) {
            return res.status(400).json({ mensagem: "Email ou CPF já cadastrado" })
        }

        await knex('clientes').update({ nome: nome, email: email, cpf: cpf, cep: cep, rua: rua, numero: numero, bairro: bairro, cidade: cidade, estado: estado }).where('id', id)
        return res.status(200).json({ mensagem: "Cliente atualizado com sucesso!" })
    } catch (erro) {
        return res.status(400).json({ mensagem: "Erro interno do servidor!" })
    }
}

const listar = async (req, res) => {
    try {
        const lista = await knex('clientes').select('id', 'nome')
        if (lista.length < 1) {
            return res.status(404).json({ mensagem: "Nenhum cliente cadastrado!" })
        }
        return res.status(200).json(lista)

    } catch (erro) {
        return res.status(400).json({ mensagem: "Erro interno do servidor!" })
    }
}

const detalhar = async (req, res) => {
    const { id } = req.params
    try {

        const detalhe = await knex('clientes').select('*').where('id', id)
        if (detalhe.length < 1) {
            return res.status(400).json({ mensagem: "ID não encontrado!" })
        }
        return res.status(200).json(detalhe)

    } catch (erro) {
        return res.status(400).json({ mensagem: "Erro interno do servidor!" })
    }
}


module.exports = {
    cadastrar,
    editar,
    listar,
    detalhar
}