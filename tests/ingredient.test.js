const request = require('supertest');  // supertest를 통해 HTTP 요청을 테스트 (Use supertest to test HTTP requests)
const app = require('../app');         // app 모듈 불러오기 (Import app module)
const { Ingredient } = require('../models'); // Ingredient 모델을 불러옵니다. (Import the Ingredient model)

beforeEach(async () => {
    // 모든 테스트 전에 'ingredients' 테이블을 초기화합니다.
    // Clear the 'ingredients' table before each test to ensure a clean state.
    await Ingredient.destroy({ where: {}, truncate: true });
});

describe('Ingredient API', () => {
    
    // GET /ingredient 요청이 배열을 반환하는지 테스트
    // Test if GET /ingredient returns an array
    it('GET /ingredient should return an array', async () => {
        const res = await request(app).get('/ingredient');                 // GET 요청 전송 (Send GET request)
        expect(res.statusCode).toBe(200);                                  // 상태 코드 200 확인 (Check status code 200)
        expect(Array.isArray(res.body)).toBe(true);                        // 응답이 배열인지 확인 (Check if response is an array)
    });

    // POST /ingredient 요청이 재료를 성공적으로 생성하는지 테스트
    // Test if POST /ingredient successfully creates a new ingredient
    it('POST /ingredient should create a new ingredient', async () => {
        const res = await request(app)                                     // POST 요청 전송 (Send POST request)
            .post('/ingredient')
            .send({ name: 'Cucumber', category: 'Vegetable' });

        expect(res.statusCode).toBe(201);                                  // 상태 코드 201 확인 (Check status code 201)
        expect(res.body).toHaveProperty('id');                             // 응답에 id 속성이 있는지 확인 (Check if 'id' exists in response)
        expect(res.body.name).toBe('Cucumber');                            // name 필드가 Cucumber인지 확인 (Check if name is Cucumber)
        expect(res.body.category).toBe('Vegetable');                       // category 필드가 Vegetable인지 확인 (Check if category is Vegetable)
    });

    // 같은 이름의 재료를 중복으로 추가할 수 없는지 테스트
    // Test if duplicate ingredient names are not allowed
    it('should not allow duplicate ingredient names', async () => {
        await request(app)
            .post('/ingredient')
            .send({ name: 'Tomato', category: 'Vegetable' });              // 첫 번째 Tomato 추가 (Add first Tomato)

        const res = await request(app)
            .post('/ingredient')
            .send({ name: 'Tomato', category: 'Fruit' });                  // 중복된 이름으로 다시 추가 시도 (Try adding duplicate name)

        expect(res.statusCode).toBe(500);                                  // 상태 코드 500 확인 (Check status code 500)
        expect(res.body).toHaveProperty('error');                          // 에러 메시지 포함 여부 확인 (Check if error message exists)
    });

    // name이 빠졌을 때 400 에러가 나는지 테스트
    // Test if missing name returns 400 error
    it('should return 400 if name is missing', async () => {
        const res = await request(app)
            .post('/ingredient')
            .send({ category: 'Fruit' });                                  // name 없이 요청 (Request without name)

        expect(res.statusCode).toBe(400);                                  // 상태 코드 400 확인 (Check status code 400)
        expect(res.body).toHaveProperty('error');                          // 에러 메시지 포함 여부 확인 (Check if error message exists)
    });

    afterAll(async () => {
        await sequelize.close(); // 테스트 완료 후 DB 연결 종료 (Close DB connection after all tests finish)
    });
});
