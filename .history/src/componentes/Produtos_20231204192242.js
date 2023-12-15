const knex = require('../BancoDeDados/conexao');

const CadastrarProduto = async (req, res) => {

  const usuario = req;
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
          

  if (!usuario) {
    return res.status(401).json({ messagem: 'Usuário não autenticado' });
  }

  if (!descricao || !quantidade_estoque || !valor || !categoria_id) {
    return res.status(400).json({ messagem: 'Todos os campos são obrigatórios' });
  }
    try {
     

      await knex('produtos').insert({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
      });
  
      return res.status(200).json({ messagem: 'Produto cadastrado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ messagem: 'Erro interno do servidor' });
    }
  };
  const EditarProduto =  async (req, res) => {
    
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    const { id } = req.params;

    const usuario = req;
  if (!usuario) {
    return res.status(401).json({ messagem: 'Usuário não autenticado' });
  }

 if (!descricao || !quantidade_estoque || !valor || !categoria_id || !id) {
    return res.status(400).json({ messagem: 'Todos os campos são obrigatórios' });
  } 
    try {
           await knex('produtos').where({ id }).update({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
      });
  
      return res.status(200).json({ messagem: 'Produto atualizado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ messagem: 'Erro interno do servidor' });
    }
  };

  const ListarProduto = async (req, res) => {
    try {
    const { categoria_id } = req.query;
    let query = knex.select('*').from('produtos');
    if (categoria_id) {
      query = query.where({ categoria_id });
    }
    const produtos = await query;
    return res.status(200).json(produtos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ messagem: 'Erro interno do servidor' });
  }
};

const detalharProduto = async (req, res) =>{
  const usuario = req;
  if (!usuario) {
    return res.status(401).json({ messagem: 'Usuário não autenticado' });
  }
  const { id } = req.params;
    try {
      const produto = await knex('usuarios').select("*").where('id', token.id);
    } catch (error) {
        return res.status(400).json({ mensagem: "Erro interno no servidor" })
    }
};

  module.exports = {
    CadastrarProduto,
    EditarProduto,
    ListarProduto
};
