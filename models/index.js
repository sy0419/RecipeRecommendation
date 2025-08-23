// models/index.js
const Sequelize = require('sequelize'); 
// Sequelize 라이브러리 불러오기 (Import Sequelize library)

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',           // 데이터베이스 호스트 설정 (Database host configuration)
  dialect: 'mysql',            // 사용할 데이터베이스 종류 (Database dialect, e.g., MySQL)
});


const Ingredient = require('./ingredient');
Ingredient.initModel(sequelize);

module.exports = {
  sequelize,  // sequelize 인스턴스 내보내기 (Export sequelize instance)
  Sequelize,  // Sequelize 라이브러리 내보내기 (Export Sequelize library)
  Ingredient, // Ingredient 모델 내보내기 (Export Ingredient model)
};