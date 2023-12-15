create database PDV;

create table usuarios (
    id serial primary key,
    nome text not null,
    email text not null unique,
    senha text);
  
  create table categorias (
    id serial primary key,
    descricao text not null
);
  
  insert into categorias
(descricao)
values
('Informática'),('Celulares'),('Beleza e Perfumaria'),
('Mercado'),('Livros e Papelaria'),('Brinquedos'),
('Moda'),('Bebê'),('Games');

CREATE TABLE produtos (
    id serial primary key,
    descricao text not null,
    quantidade_estoque INT not null,
    valor DECIMAL(10, 2) not null,
    categoria_id INT not null,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE TABLE clientes (
    id serial primary key,
    nome text not null,
    email text not null unique,
    cpf text not null unique,
    cep text,
    rua text,
    numero INT,
    bairro text,
    cidade text,
    estado text
);

CREATE TABLE pedidos (
    id serial PRIMARY KEY,
    cliente_id INT,
    observacao TEXT,
    valor_total DECIMAL(10, 2)
);


CREATE TABLE pedido_produtos (
    id serial PRIMARY KEY,
    pedido_id INT,
    produto_id INT,
    quantidade_produto INT,
    valor_produto DECIMAL(10, 2)
);


ALTER TABLE produtos
ADD COLUMN produto_imagem VARCHAR(255);