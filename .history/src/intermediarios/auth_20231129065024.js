const jws = require('jsonwebtoken')
const knex = require(')
require('dotenv').config()

const tokenVerify = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ mesangem: "Token não informado" })
    }

    const token = authorization.split(' ')[1]

    try {

        const { id } = jws.verify(token, process.env.JWT_PASS)
        const usuario = await knex('usuarios').select('*').where('id', id)
        if (usuario.length < 1) {
            return res.status(401).json({ mensagem: "Acesso não autorizado" })
        }

        next()

    } catch (error) {
        return res.status(401).json({ mensagem: "Acesso não autorizado" })
    }
}

module.exports = tokenVerify