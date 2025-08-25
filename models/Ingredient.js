// models/ingredient.js

module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('Ingredient', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    category: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'ingredient'
  });

  Ingredient.associate = (models) => {
    Ingredient.belongsToMany(models.Recipe, {
      through: 'recipeingredient',
      foreignKey: 'ingredientId',
      otherKey: 'recipeId'
    });
  };

  return Ingredient;
};