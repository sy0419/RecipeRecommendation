const express = require('express');  // 익스프레스 모듈 불러오기 (Import Express module)
const Ingredient = require('../models/Ingredient');  // Ingredient 모델 불러오기 (Import Ingredient model)

const router = express.Router();  // 익스프레스 라우터 생성 (Create Express router)

// GET / - 재료 목록 조회 API (API to get list of ingredients)
router.get('/', async (req, res) => {
    try {
        const ingredients = await Ingredient.findAll();  // DB에서 모든 재료 조회 (Fetch all ingredients from DB)
        res.json(ingredients);  // JSON 형식으로 응답 (Respond with JSON)
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch ingredients' });  // 에러 시 500 응답 (Respond 500 on error)
    }
});

// POST / - 재료 추가 API (API to add a new ingredient)
router.post('/', async (req, res) => {
    try {
        const { name, category } = req.body;  // 요청 본문에서 name, category 추출 (Extract name, category from request body)
        const newIngredient = await Ingredient.create({ name, category });  // DB에 새 재료 생성 (Create new ingredient in DB)
        res.status(201).json(newIngredient);  // 생성 완료 201 상태와 함께 새 재료 반환 (Return 201 status with new ingredient)
    } catch (err) {
        res.status(500).json({ error: 'Failed to create ingredient' });  // 에러 시 500 응답 (Respond 500 on error)
    }
});

module.exports = router;  // 라우터 모듈로 내보내기 (Export router module)