const request = require('supertest');
const app = require('../app');
const { sequelize, Ingredient, Recipe } = require('../models');

beforeAll(async () => {
  await sequelize.sync({ force: true });  // 테이블 초기화 및 생성
});

beforeEach(async () => {
  await Ingredient.destroy({ where: {} });  // 테이블 비우기
});

// 모든 테스트 후 DB 연결 종료
// After all tests, close DB connection
afterAll(async () => {
    await sequelize.close();
});

describe('Recipe API', () => {

    // 레시피 생성 테스트
    // Test recipe creation with ingredient association
    test('POST /recipe - recipe creation', async () => {
        // Given: 재료 두 개 생성
        // Create two ingredients first
        const egg = await Ingredient.create({ name: 'Egg', category: 'Protein' });
        const onion = await Ingredient.create({ name: 'Onion', category: 'Vegetable' });

        // When: 레시피 생성 요청
        // Send a POST request to create a recipe
        const response = await request(app)
            .post('/recipe')
            .send({
                title: 'Omelette',
                description: 'Simple egg and onion omelette', 
                ingredients: [egg.id, onion.id] 
            });

        console.log('Response:', response.statusCode, response.body);
        // Then: 응답 상태 코드 및 반환 데이터 확인
        // Check response status code and data
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe('Omelette');
        expect(response.body.ingredients.length).toBe(2); 
    });

    // 전체 레시피 조회 테스트
    // Test fetching all recipes
    test('GET /recipe - All the recipe list check', async () => {
        const response = await request(app).get('/recipe');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});