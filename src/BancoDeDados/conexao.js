require('dotenv').config()
const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE,
    }
});

module.exports = knex