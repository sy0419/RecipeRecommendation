const express = require('express');
const sequelize = require('./config/database');
const Ingredient = require('./models/Ingredient');

const app = express();
const PORT = 3000;

// Connect to the database
// 데이터베이스에 연결 시도
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