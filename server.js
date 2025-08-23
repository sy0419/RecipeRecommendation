const app = require('./app');  // app 모듈 불러오기 (Import app module)
const PORT = 3000;  // 서버 포트 설정 (Set server port)

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);  // 서버 시작 로그 출력 (Log server start)
});