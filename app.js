const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Recipe App!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});