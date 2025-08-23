// models/index.js

const Sequelize = require('sequelize');  
// Sequelize 라이브러리 불러오기 
// Import Sequelize library

const sequelize = new Sequelize('recipe_db', 'root', 'your_password', {
  host: 'localhost',                      // DB 호스트 설정 (Set database host)
  dialect: 'mysql',                       // 사용할 데이터베이스 종류 (Set database dialect)
  dialectOptions: {
    charset: 'utf8mb4',                   // 문자 인코딩 설정 (Set character encoding)
  },
  logging: console.log,                   // 쿼리 로그 출력 (Enable query logging)
});

// Ingredient 모델 불러오기 (sequelize 인스턴스를 사용하는 정의 방식)
// Import Ingredient model (already defined using the sequelize instance)
const Ingredient = require('./ingredient');

module.exports = {
  sequelize,   // sequelize 인스턴스 내보내기 (Export sequelize instance)
  Sequelize,   // Sequelize 라이브러리 내보내기 (Export Sequelize library)
  Ingredient,  // Ingredient 모델 내보내기 (Export Ingredient model)
};