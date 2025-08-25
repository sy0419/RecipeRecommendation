// routes/recommend.js
const express = require('express');
const router = express.Router();
const { Recipe, Ingredient } = require('../models');

// POST /recommend - 추천 레시피 반환 API
// POST /recommend - Recommend recipes based on matched ingredients
router.post('/', async (req, res) => {
    try {
        const { ingredients } = req.body;

        // 유효성 검사: ingredients가 배열이고 비어있지 않은지 확인
        // Validate: Check if ingredients is a non-empty array
        if (!Array.isArray(ingredients) || ingredients.length === 0) {
            return res.status(400).json({ error: 'Ingredients array is required.' });
        }

        // 모든 레시피와 그에 연결된 재료 불러오기
        // Fetch all recipes with their ingredients
        const recipes = await Recipe.findAll({
            include: {
                model: Ingredient,
                as: 'ingredients'
            }
        });

        // 각 레시피별로 매칭된 재료 수 계산
        // Count matched ingredients for each recipe
        const recommended = recipes.map(recipe => {
            const matchCount = recipe.ingredients.filter(ing =>
                ingredients.includes(ing.name)
            ).length;

            return {
                id: recipe.id,
                title: recipe.title,
                description: recipe.description,
                matchCount
            };
        })
        // 매칭된 재료 수가 1개 이상인 레시피만 추천
        // Only include recipes with at least one match
        .filter(r => r.matchCount > 0)
        // 매칭된 수가 많은 순으로 정렬
        // Sort by matchCount descending
        .sort((a, b) => b.matchCount - a.matchCount);

        return res.json(recommended); // 추천 결과 반환
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;