const knex = require('../BancoDeDados/conexao');
const enviarEmail = require("../Utils/enviarEmail.js");

const cadastrarPedido = async (req, res) => {
    try {
        const { cliente_id, observacao, pedido_produtos } = req.body;

        if (!cliente_id) {
            return res.status(400).json({ mensagem: 'Por favor, forneça o ID do cliente.' });
        }

        const clienteEncontrado = await knex('clientes').where('id', cliente_id).first();

        if (!clienteEncontrado) {
            return res.status(400).json({ mensagem: 'Cliente não encontrado. Verifique o ID do cliente fornecido.' });
        }

        const itensDoPedido = [];
        const itensRegistrados = [];

        for (const itemPedido of pedido_produtos) {
            const produtoEncontrado = await knex('produtos').where('id', itemPedido.produto_id).first();

            if (!produtoEncontrado) {
                return res.status(400).json({ mensagem: 'Produto não cadastrado. Verifique o ID do produto fornecido.' });
            }

            if (produtoEncontrado.quantidade_estoque < itemPedido.quantidade_produto) {
                return res.status(400).json({ mensagem: 'Quantidade insuficiente em estoque para o produto solicitado.' });
            }
                     if (itemPedido.quantidade_produto < 1) {
                return res.status(400).json({ mensagem: 'A quantidade do produto é inválida.' });
            }

            const itemDoPedido = {
                pedido_id: null,
                produto_id: produtoEncontrado.id,
                quantidade: itemPedido.quantidade_produto,
                quantidadeEstoque: produtoEncontrado.quantidade_estoque,
                valorUnidade: produtoEncontrado.valor,
                valorTotal: produtoEncontrado.valor * itemPedido.quantidade_produto,
            };

            itensDoPedido.push(itemDoPedido);
        }

        const valorTotalPedido = itensDoPedido.map((item) => item.valorTotal).reduce((total, atual) => total + atual, 0);

        const pedidoInserido = await knex('pedidos').insert({
            cliente_id,
            observacao,
            valor_total: valorTotalPedido,
        }).returning('*');

        for (const itemDoPedido of itensDoPedido) {
            const itemRegistrado = await knex('pedido_produtos').insert({
                pedido_id: pedidoInserido[0].id,
                produto_id: itemDoPedido.produto_id,
                quantidade_produto: itemDoPedido.quantidade,
                valor_produto: itemDoPedido.valorUnidade,
            }).returning('*');

            itensRegistrados.push(itemRegistrado[0]);

            await knex('produtos')
                .update({ quantidade_estoque: itemDoPedido.quantidadeEstoque - itemDoPedido.quantidade })
                .where('id', itemDoPedido.produto_id);
        }
        enviarEmail(clienteEncontrado.email);


        const resultadoCadastro = {
            ...pedidoInserido[0],
            pedido_produtos: itensRegistrados,
        };


        return res.status(200).json(resultadoCadastro);
    } catch (erro) {
        console.error('Erro ao cadastrar pedido:', erro);
        return res.status(500).json({ mensagem: 'Erro interno no servidor. Por favor, tente novamente mais tarde.' });
    }
};

const listarPedidos = async (req, res) => {
    const { cliente_id } = req.body;
    try {

        if (cliente_id) {

            const clienteEncontrado = await knex('pedidos').where('cliente_id', cliente_id);

            if (clienteEncontrado.length < 1) {
                return res.status(200).json({ mensagem: 'Nenhum pedido encontrado para o cliente informado!' });
            }
            if (clienteEncontrado) {
                const todosPedidos = [];
                const pedidos = await knex('pedidos').select('*').where('cliente_id', cliente_id)
                console.log(pedidos);
                for (const itemPedido of pedidos) {
                    const pedido_produtos = await knex('pedido_produtos').where('pedido_id', itemPedido.id)

                    const itemDoPedido = {
                        pedido: {
                            id: itemPedido.id,
                            valor_total: itemPedido.valor_total,
                            observacao: null,
                            cliente_id: itemPedido.cliente_id
                        },
                        pedido_produtos
                    };

                    todosPedidos.push(itemDoPedido);
                }

                return res.status(200).json(todosPedidos);
            }
        }


        if (!cliente_id) {
            const todosPedidos = [];

            const pedidos = await knex('pedidos')
            for (const itemPedido of pedidos) {
                const pedido_produtos = await knex('pedido_produtos').where('pedido_id', itemPedido.id)

                const itemDoPedido = {
                    pedido: {
                        id: itemPedido.id,
                        valor_total: itemPedido.valor_total,
                        observacao: null,
                        cliente_id: itemPedido.cliente_id
                    },
                    pedido_produtos
                };

                todosPedidos.push(itemDoPedido);
            }

            return res.status(200).json(todosPedidos);
        }




    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor. Por favor, tente novamente mais tarde.' });
    }
}

module.exports = {
    cadastrarPedido,
    listarPedidos
};
