const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Обслуживаем HTML-файлы из папки public
app.use(express.static(path.join(__dirname, 'public')));

const COUNTER_FILE = 'counter.json';

function getCounter() {
  if (!fs.existsSync(COUNTER_FILE)) return 0;
  const data = fs.readFileSync(COUNTER_FILE, 'utf-8');
  return JSON.parse(data).count;
}

function updateCounter(newCount) {
  fs.writeFileSync(COUNTER_FILE, JSON.stringify({ count: newCount }));
}

app.get('/count', (req, res) => {
  res.json({ count: getCounter() });
});

app.post('/increment', (req, res) => {
  const count = getCounter() + 1;
  updateCounter(count);
  res.json({ count });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
