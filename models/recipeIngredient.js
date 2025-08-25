// Recipe와 Ingredient 사이의 중간 테이블 정의
// Define the join table between Recipe and Ingredient

module.exports = (sequelize, DataTypes) => {
    // RecipeIngredient 테이블 정의 (recipeId, ingredientId 필드 포함)
    // Define the RecipeIngredient table with recipeId and ingredientId fields
    const RecipeIngredient = sequelize.define('RecipeIngredient', {
        recipeId: {
            type: DataTypes.INTEGER, // Recipe를 참조하는 외래 키
                                     // Foreign key referring to Recipe
            references: {
                model: 'recipe',  // 참조하는 테이블 이름
                key: 'id'         // 참조하는 테이블의 기본 키
            }
        },
        ingredientId: {
            type: DataTypes.INTEGER, // Ingredient를 참조하는 외래 키
                                     // Foreign key referring to Ingredient
            references: {
                model: 'ingredient',  // 참조하는 테이블 이름
                key: 'id'             // 참조하는 테이블의 기본 키
            }
        },
    }, {
        // createdAt, updatedAt 같은 타임스탬프 필드 사용 안 함
        // Disable timestamps (no createdAt, updatedAt fields)
        timestamps: false,
        tableName: 'recipeingredient'
    });
    return RecipeIngredient;
};