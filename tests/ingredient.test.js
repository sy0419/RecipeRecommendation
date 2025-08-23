const request = require('supertest');  // supertest를 통해 HTTP 요청을 테스트 (Import supertest to test HTTP requests)
const app = require('../app');         // app 모듈 불러오기 (Import app module)

describe('Ingredient API', () => {
    
    // GET /ingredient 요청이 배열을 반환하는지 테스트
    // Test if GET /ingredient returns an array
    it('GET /ingredient should return an array', async () => {
        const res = await request(app).get('/ingredient');
        expect(res.statusCode).toBe(200);                     // 상태 코드 200 확인 (Expect status code 200)
        expect(Array.isArray(res.body)).toBe(true);           // 응답이 배열인지 확인 (Expect response to be an array)
    });

    // POST /ingredient 요청이 재료를 성공적으로 생성하는지 테스트
    // Test if POST /ingredient successfully creates a new ingredient
    it('POST /ingredient should create a new ingredient', async () => {
        const res = await request(app)
            .post('/ingredient')
            .send({ name: 'Cucumber', category: 'Vegetable' });
        
        expect(res.statusCode).toBe(201);                     // 상태 코드 201 확인 (Expect status code 201)
        expect(res.body).toHaveProperty('id');                // 응답에 id 속성이 있는지 확인 (Expect 'id' property in response)
        expect(res.body.name).toBe('Cucumber');               // name 필드 확인 (Check name field)
        expect(res.body.category).toBe('Vegetable');          // category 필드 확인 (Check category field)
    });
});