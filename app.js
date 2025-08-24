const express = require('express');  // 익스프레스 모듈 불러오기 Import Express module
const sequelize = require('./config/database');  // DB 설정 불러오기 Import DB config

const ingredientRoutes = require('./routes/ingredient');  // 재료 라우터 불러오기 Import ingredient routes
const recipeRoutes = require('./routes/recipe');          // 레시피 라우터 불러오기 Import recipe routes ✅ 추가

const app = express();  // 익스프레스 앱 생성 Create Express app

app.use(express.json());  // JSON 바디 파싱 미들웨어 추가 Add JSON body parser middleware

app.use('/ingredient', ingredientRoutes);  // '/ingredient' 경로에 라우터 등록 Register router for '/ingredient'
app.use('/recipe', recipeRoutes);          // '/recipe' 경로에 라우터 등록 Register router for '/recipe' ✅ 추가

// DB 연결 및 동기화 (테스트할 때는 따로 실행할 수도 있지만, 우선 이렇게 둬도 OK)
// Connect and sync DB (For tests, you might want to handle separately, but this is fine for now)
// sequelize.authenticate()
//   .then(() => {
//     console.log('✅ Database connected successfully.');
//     return sequelize.sync({ force: false });
//   })
//   .then(() => {
//     console.log('🗃️ Tables synced successfully.');
//   })
//   .catch((err) => {
//     console.error('❌ Unable to connect to the database:', err);
//   });

module.exports = app;  // app 모듈로 내보내기 Export app module for testing