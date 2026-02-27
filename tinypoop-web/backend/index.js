const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('TinyPoop Web Backend is running!');
});

app.listen(port, () => {
  console.log(`Web Backend listening at http://localhost:${port}`);
});
