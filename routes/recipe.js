const express = require('express');
const router = express.Router();

// 모델 불러오기 (오타 수정: recipe → require)
// Import models (Fix typo: recipe → require)
const { Recipe, Ingredient } = require('../models');


// 레시피 생성 API - POST /recipe
// Create a new recipe with ingredients - POST /recipe
router.post('/', async (req, res) => {
    try {
        // 클라이언트로부터 title, description, ingredients 받아오기
        // Extract data from request body
        const { title, description, ingredients } = req.body;

        // title이 없거나 ingredients가 배열이 아닐 경우 400 에러
        // Return 400 error if required fields are missing
        if (!title || !Array.isArray(ingredients)) {
            return res.status(400).json({ message: 'Title and ingredients are required.' });
        }

        // 1. 레시피 생성 (title, description 저장)
        // Create a new recipe
        const recipe = await Recipe.create({ title, description });

        // 2. 재료와 연결 (다대다 관계 설정)
        // Associate the recipe with ingredients (many-to-many relation)
        if (ingredients.length > 0) {
            await recipe.setIngredients(ingredients); // 중간 테이블에 자동으로 저장됨
        }

        // 3. 연관된 재료를 포함한 레시피 정보 다시 조회
        // Reload recipe with associated ingredients
        const createdRecipe = await Recipe.findOne({
            where: { id: recipe.id },
            include: {
                model: Ingredient,
                as: 'ingredients'
            }
        });

        // 201 Created 상태 코드와 함께 응답
        // Respond with 201 status and created recipe
        return res.status(201).json(createdRecipe);

    } catch (error) {
        // 서버 에러 처리
        // Handle unexpected server errors
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// 이 라우터 모듈을 외부에서 사용할 수 있도록 내보냄
// Export the router to be used in app.js
module.exports = router;    