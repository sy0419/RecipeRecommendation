const fs = require('fs');               // 파일 시스템 모듈 불러오기
const path = require('path');           // 경로 처리 모듈 불러오기
const Sequelize = require('sequelize'); // Sequelize 라이브러리 불러오기

// Sequelize 인스턴스 생성 - MySQL 연결 설정
// Create Sequelize instance to connect MySQL database
const sequelize = new Sequelize('recipe_db', 'root', '7203', {
  host: 'localhost',                   // DB 호스트 주소
  dialect: 'mysql',                    // DB 종류 설정
  dialectOptions: {                    // 문자 인코딩 옵션 (오타 수정: dislectOptions → dialectOptions)
    charset: 'utf8mb4'                 // 유니코드 지원 문자셋
  },
  logging: console.log                 // 쿼리 실행 로그 출력
});

const db = {}; // 모든 모델을 담을 객체 생성
// Create an object to hold all models

const basename = path.basename(__filename); // 현재 파일 이름 (index.js)
fs.readdirSync(__dirname)                    // models 디렉토리 내 모든 파일 읽기
  .filter(file => (
    file.indexOf('.') !== 0 &&               // 숨김 파일 제외
    file !== basename &&                      // 현재 파일 제외
    file.slice(-3) === '.js'                  // .js 파일만 필터링
  ))
  .forEach(file => {
    // 각 모델 파일 require 후, Sequelize 모델 초기화
    // Import and initialize each model file with sequelize instance
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;                   // 모델 이름으로 db 객체에 저장
  })

// 모델 간 관계(associate) 함수가 있으면 실행
// Run associate function to setup model relationships
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Sequelize 인스턴스와 Sequelize 라이브러리를 db 객체에 추가
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 최종 db 객체 내보내기
module.exports = db;