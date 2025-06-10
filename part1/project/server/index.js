const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'build')));

const todos = [
  {
    id: 1,
    text: "Vie roskat",
    completed: false,
    createdAt: "2025-06-10T10:00:00Z"
  },
  {
    id: 2,
    text: "Soita Donna Lee",
    completed: true,
    createdAt: "2025-06-09T14:30:00Z"
  },
  {
    id: 3,
    text: "Viritä basso",
    completed: false,
    createdAt: "2025-06-05T09:15:00Z"
  }
];

app.use(cors())
app.use(express.json());


app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
