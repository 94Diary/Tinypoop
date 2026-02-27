const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('TinyPoop App Backend is running!');
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
