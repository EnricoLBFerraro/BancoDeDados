const Sequelize = require('sequelize')

const sequelize = new Sequelize('Nome_da_tabela', 'Nome_do_usuario', 'Senha', {
    host: 'localhost',//normalmente, em maquinas locais, é utilizado o localhost
    dialect: 'mysql',//Linguagem utilizada
});

module.exports = sequelize;