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
<<<<<<< HEAD
);
=======
);
 
>>>>>>> e6bc2c4a0bf7334db6db5ff59042dbac98fbcd62
