const knex = require('../BancoDeDados/conexao');

const CadastrarProduto = async (req, res) => {
    try {
      const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  
      await knex('produtos').insert({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
      });
  
      return res.status(200).json({ message: 'Produto cadastrado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  };
  const EditarProduto =  async (req, res) => {
    try {
      const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
      const { id } = req.params;
  
      await knex('produtos').where({ id }).update({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
      });
  
      return res.status(200).json({ message: 'Produto atualizado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  };

  const ListarProdutos = async (req, res) => {
    try {
      const produtos = await knex.select('*').from('produtos');
      return res.status(200).json(produtos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  };

  module.exports = {
    CadastrarProduto,
    EditarProduto,
    ListarProdutos
};
