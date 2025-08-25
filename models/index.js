const fs = require('fs');               // 파일 시스템 모듈 불러오기
const path = require('path');           // 경로 관련 유틸 모듈 불러오기
const Sequelize = require('sequelize'); // Sequelize ORM 라이브러리 불러오기

// ✅ 1. Sequelize 인스턴스 생성 - MySQL 연결
// ✅ Step 1: Create Sequelize instance to connect to MySQL
const sequelize = new Sequelize('recipe_db', 'root', '7203', {
  host: 'localhost',           // DB 호스트 주소 설정
  dialect: 'mysql',            // 사용할 DB 종류 설정
  dialectOptions: {            // 문자 인코딩 옵션 설정
    charset: 'utf8mb4',        // 유니코드 이모지까지 지원하는 인코딩
  },
  logging: console.log         // 실행되는 SQL 쿼리 로그 출력
});

const db = {}; // 모든 모델을 담을 객체
// Object to store all Sequelize models 

const basename = path.basename(__filename); // 현재 파일 이름 (index.js)

// ✅ 2. models 디렉토리에서 모든 모델 파일을 불러오기
// ✅ Step 2: Load all model files in this directory
fs.readdirSync(__dirname)
  .filter(file => (
    file.indexOf('.') !== 0 &&         // 숨김 파일 제외 (예: .DS_Store, .gitignore)
    file !== basename &&               // 현재 index.js 파일 제외
    file.slice(-3) === '.js'           // 확장자가 .js인 파일만
  ))
  .forEach(file => {
    const modelPath = path.join(__dirname, file);      // 전체 경로 구성
    const imported = require(modelPath);               // 모델 파일 import

    // 함수형으로 export된 파일만 모델로 처리
    // Only process files that export a model definition function
    if (typeof imported === 'function') {
      const model = imported(sequelize, Sequelize.DataTypes); // 모델 정의 함수 실행
      db[model.name] = model;                                 // db 객체에 저장
    }
  });

// ✅ 3. 모델 간 관계 설정 함수(associate)가 있으면 실행
// ✅ Step 3: Run associate functions to set up model relationships
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// 모델 간 관계 설정
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db); // associate 함수 실행
  }
});

// DB와 연결을 시도하고 동기화
sequelize.sync({ force: false })  // force: true로 설정하면 테이블을 재생성함
  .then(() => console.log('Database synchronized'))
  .catch(error => console.log('Error syncing database:', error));

// ✅ 4. sequelize 인스턴스와 Sequelize 라이브러리를 db 객체에 포함시켜 export
// ✅ Step 4: Add sequelize instance and Sequelize to db object and export it
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;