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
create table PEDIDOS (
	id serial primary key,
  CLIENTE_ID integer references CLIENTES(ID),
  OBSERVACAO text,
  VALOR_TOTAL decimal(10, 2) NOT NULL
);

create table PEDIDO_PRODUTOS (
	id serial primary key,
  PEDIDO_ID integer references PEDIDOS(ID),
  PRODUTO_ID integer references PRODUTOS(ID),
  QUANTIDADE_PRODUTO integer not null,
  VALOR_PRODUTO decimal(10, 2) NOT NULL
);

ALTER TABLE produtos
ADD COLUMN produto_imagem VARCHAR(255);