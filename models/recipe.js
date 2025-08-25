// models/recipe.js

module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  }, {
    tableName: 'recipe'
  });

  Recipe.associate = (models) => {
    Recipe.belongsToMany(models.Ingredient, {
      through: 'recipeingredient',
      foreignKey: 'recipeId',
      otherKey: 'ingredientId'
    });
  };

  return Recipe;
};