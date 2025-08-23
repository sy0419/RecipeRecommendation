const express = require('express');           // Express 프레임워크 불러오기
const sequelize = require('./config/database'); // Sequelize DB 연결 설정 불러오기
const Ingredient = require('./models/Ingredient'); // Ingredient 모델 불러오기
const ingredientRoutes = require('./routes/ingredient'); // Ingredient 관련 라우터 불러오기

const app = express();                         // Express 앱 생성
const PORT = 3000;                            // 서버 포트 번호 설정

app.use(express.json()); // JSON 바디 파싱 미들웨어 추가
app.use('/ingredient', ingredientRoutes); // '/ingredient' 경로에 라우터 등록

// Middleware to parse JSON bodies
// JSON 바디를 파싱하는 미들웨어
app.use(express.json());

// Register the ingredient routes under '/ingredient'
// '/ingredient' 경로에 ingredient 라우터 등록
app.use('/ingredient', ingredientRoutes);

// Connect to the database
// 데이터베이스 연결 시도
sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected successfully.');

    // Sync all defined models to the DB (create tables if not exist)
    // 정의된 모든 모델을 DB와 동기화 (테이블이 없으면 생성)
    return sequelize.sync({ force: false }); 
  })
  .then(() => {
    console.log('🗃️ Tables synced successfully.');

    // Start the server
    // 서버 시작
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    // Handle DB connection error
    // 데이터베이스 연결 에러 처리
    console.error('❌ Unable to connect to the database:', err);
  });