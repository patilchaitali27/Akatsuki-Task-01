import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/calculate', (req, res) => {
  const { expression } = req.body;
  try {
    // Safely evaluate the expression
    const result = Function(`'use strict'; return (${expression})`)();
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: 'Invalid expression' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});