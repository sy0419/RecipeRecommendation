const express = require('express');
const router = express.Router();

// 모델 불러오기 (recipe → require 수정 완료)
// Import models (Fixed typo: recipe → require)
const { Recipe, Ingredient } = require('../models');

// 레시피 생성 API - POST /recipe
// Create a new recipe with ingredients - POST /recipe
router.post('/', async (req, res) => {
    try {
        // 클라이언트로부터 title, description, ingredients 받아오기
        // Extract title, description, and ingredients from request body
        const { title, description, ingredients } = req.body;

        // title이 없거나 ingredients가 배열이 아닐 경우 400 에러 반환
        // Return 400 error if title is missing or ingredients is not an array
        if (!title || !Array.isArray(ingredients)) {
            return res.status(400).json({ message: 'Title and ingredients are required.' });
        }

        // 레시피 생성 (title, description 저장)
        // Create a new recipe with title and description
        const recipe = await Recipe.create({ title, description });

        let ingredientIds = [];

        if (ingredients.length > 0) {
            if (typeof ingredients[0] === 'number') {
                // 재료가 ID 배열이면 그대로 사용
                // If ingredients are IDs, use them as is
                ingredientIds = ingredients;
            } else if (typeof ingredients[0] === 'string') {
                // 재료가 이름 배열이면 DB에서 해당 재료의 ID를 조회
                // If ingredients are names, find their IDs from DB
                const foundIngredients = await Ingredient.findAll({
                    where: { name: ingredients }
                });
                ingredientIds = foundIngredients.map(i => i.id);
            } else {
                // 형식이 맞지 않으면 400 에러 반환
                // If format is invalid, return 400 error
                return res.status(400).json({ message: 'Invalid ingredients format.' });
            }

            // 중간 테이블에 재료와 레시피 관계 저장
            // Save associations between recipe and ingredients in join table
            await recipe.setIngredients(ingredientIds);
        }

        // 재료 포함해서 생성된 레시피 재조회
        // Retrieve the created recipe including its ingredients
        const createdRecipe = await Recipe.findOne({
            where: { id: recipe.id },
            include: {
                model: Ingredient,
                as: 'ingredients'
            }
        });

        // 201 상태 코드와 함께 생성된 레시피 응답
        // Respond with 201 status and the created recipe
        return res.status(201).json(createdRecipe);

    } catch (error) {
        // 서버 에러 발생 시 로그 출력 후 500 에러 반환
        // Log server error and return 500 status on exception
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// 모든 레시피 조회 API - GET /recipe
// Get all recipes API - GET /recipe
router.get('/', async (req, res) => {
  try {
    // 레시피와 재료를 함께 조회
    // Fetch recipes with their associated ingredients
    const recipes = await Recipe.findAll({
      include: {
        model: Ingredient,
        as: 'ingredients'
      }
    });
    res.status(200).json(recipes);
  } catch (error) {
    // 에러 로그 출력 및 500 에러 반환
    // Log error and return 500 status
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// 이 라우터 모듈을 외부에서 사용할 수 있도록 내보냄
// Export the router to be used in app.js
module.exports = router;