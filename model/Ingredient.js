const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { model } = require('mongoose');

const Ingredient = sequelize.define('ingredient', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = Ingredient;