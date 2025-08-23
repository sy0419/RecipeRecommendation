const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('recipe_db', 'root', '7203', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;