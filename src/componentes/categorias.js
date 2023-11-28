const knex = require('../BancoDeDados/conexao');

const listar = async (req, res) => {
    try {
        const listaCateg = await knex('categorias').select('*')

        return res.status(200).json(listaCateg);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}

module.exports = listar;