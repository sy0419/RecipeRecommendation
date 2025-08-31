// tests/recommend.test.js

const request = require('supertest');
const app = require('../app');
const { sequelize, Ingredient, Recipe } = require('../models');

describe('POST /recommend', () => {
    // 테스트 실행 전 데이터베이스 초기화 및 샘플 데이터 생성
    // Setup test DB and create sample data before all tests run
    beforeAll(async () => {
        await sequelize.sync({ force: true }); // DB 초기화 (force: true = 기존 데이터 삭제)
        // 🥚 재료 생성 (Create ingredients)
        const egg = await Ingredient.create({ name: 'Egg', category: 'Protein' });
        const onion = await Ingredient.create({ name: 'Onion', category: 'Vegetable' });
        const tomato = await Ingredient.create({ name: 'Tomato', category: 'Vegetable' });
        
        // 🍳 레시피 생성 및 재료 연결 (Create recipes and associate ingredients)
        const r1 = await Recipe.create({ title: 'Omelette', description: 'Egg and onion omelette.' });
        await r1.addIngredients([egg, onion]); // Omelette는 Egg, Onion 포함

        const r2 = await Recipe.create({ title: 'Tomato Salad', description: 'Fresh Tomato and onion.' });
        await r2.addIngredients([tomato, onion]); // Tomato Salad는 Tomato, Onion 포함
    });

    // ✅ 추천 API가 올바르게 작동하는지 테스트
    // Test that recipes are recommended based on matching ingredients
    it('should return recommended recipes based on matched ingredients.', async () => {
        const res = await request(app)
            .post('/recommend')
            .send({ ingredients: ['Egg', 'Onion'] }); // ❗ 오타 수정: 'Ingredient' → 'ingredients'
        
        expect(res.statusCode).toBe(200); // 응답 상태가 200인지 확인
        expect(Array.isArray(res.body)).toBe(true); // 응답이 배열인지 확인
        expect(res.body.length).toBeGreaterThan(0); // 추천 결과가 1개 이상인지 확인
        expect(res.body[0]).toHaveProperty('title'); // 첫 번째 결과에 title 필드가 있는지
        expect(res.body[0]).toHaveProperty('matchCount'); // matchCount 필드 확인
    });

    // ❌ 잘못된 입력 처리 테스트 (재료가 빈 배열일 경우)
    // Test that invalid input returns 400 error
    it('should return 400 if ingredients are missing or invalid.', async () => {
        const res = await request(app)
            .post('/recommend')
            .send({ ingredients: [] });

        expect(res.statusCode).toBe(400); // 400 상태 확인
        expect(res.body).toHaveProperty('error'); // 에러 메시지 포함 여부
    });

    // 테스트 종료 후 DB 연결 해제
    // Close DB connection after all tests
    afterAll(async () => {
        await sequelize.close();
    });
});