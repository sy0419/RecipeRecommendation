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
  });

  Ingredient.associate = (models) => {
    Ingredient.belongsToMany(models.Recipe, {
      through: 'RecipeIngredient',
      foreignKey: 'ingredientId',
      otherKey: 'recipeId',
      as: 'recipes'
    });
  };

  return Ingredient;
};