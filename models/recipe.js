// Sequelize를 통해 Recipe 모델 정의
// Define the Recipe model using Sequelize
module.exports = (sequelize, DataTypes) => {
    // Recipe 테이블 정의 (title, description 컬럼 포함)
    // Define the Recipe table with title and description columns
    const Recipe = sequelize.define('Recipe', {
        title: {
            type: DataTypes.STRING,   // 문자열 타입
            allowNull: false          // 반드시 값이 있어야 함
        },
        description: {
            type: DataTypes.TEXT      // 긴 텍스트도 저장 가능
        },
    });

    // 모델 간 관계 설정 (Recipe ↔ Ingredient)
    // Define associations between Recipe and Ingredient models
    Recipe.associate = (models) => {
        // Recipe는 여러 Ingredient와 연결됨 (다대다 관계)
        // A Recipe can have many Ingredients (Many-to-Many)
        Recipe.belongsToMany(models.Ingredient, {
            through: 'RecipeIngredient', // 중간 테이블 이름
            foreignKey: 'recipeId'       // 중간 테이블에서 참조할 컬럼
        });
    };
    return Recipe;
};