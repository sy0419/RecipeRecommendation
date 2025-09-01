# RecipeRecommendation

## 📌 프로젝트 개요

이 프로젝트는 사용자가 보유한 재료를 기반으로 다양한 레시피를 추천하는 웹 애플리케이션입니다. 사용자는 재료를 입력하면 해당 재료를 활용한 레시피 목록을 확인할 수 있습니다.

## 🔧 기술 스택

- **백엔드**: Node.js, Express
- **데이터베이스**: Sequelize ORM을 사용한 MySQL
- **테스트**: Jest, Supertest
- **기타**: Git, GitHub

## 🛠 설치 및 실행 방법

### 1. 레포지토리 클론

```bash
git clone https://github.com/sy0419/RecipeRecommendation.git
cd RecipeRecommendation
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 데이터베이스 설정

.env 파일을 생성하고 다음과 같이 데이터베이스 정보를 입력합니다:
```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=recipe_recommendation
```

### 4. 데이터베이스 동기화
```bash
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```

### 5. 서버실행
```bash
npm start
```
서버가 실행되면 http://localhost:3000 에서 애플리케이션을 확인할 수 있습니다.

## 🧪 테스트
Jest와 Supertest를 사용하여 테스트가 작성되어 있습니다. 테스트 실행 명령어:
```bash
npm test
```

## 📄 API 엔드포인트
POST /recipe
- **설명**: 새로운 레시피를 생성합니다.
- **요청 예시**:
  ```json
  {
    "title": "Omelette",
    "description": "Simple egg and onion omelette",
    "ingredients": ["Egg", "Onion"]
  }
  ```
- **응답 예시**:
  ```json
  {
  "id": 1,
  "title": "Omelette",
  "description": "Simple egg and onion omelette",
  "ingredients": ["Egg", "Onion"]
  }
  ```
GET /recipe
- **설명**: 모든 레시피를 조회합니다.
- **요청 예시**:
  ```json
  [
  {
    "id": 1,
    "title": "Omelette",
    "description": "Simple egg and onion omelette",
    "ingredients": ["Egg", "Onion"]
  }
  ]
  ```

## 🧩 프로젝트 구조
```bash
RecipeRecommendation/
├── config/                # 데이터베이스 설정
├── migrations/            # 데이터베이스 마이그레이션
├── models/                # Sequelize 모델
├── routes/                # Express 라우터
├── tests/                 # 테스트 파일
├── app.js                 # Express 애플리케이션 설정
├── package.json           # 프로젝트 메타데이터 및 의존성
└── README.md              # 이 파일
```
## 📌 주의 사항
- **데이터베이스 연결 정보는 .env 파일을 통해 설정해야 합니다.**
- **테스트를 실행하기 전에 데이터베이스가 올바르게 설정되었는지 확인하세요.**
