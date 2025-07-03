const express = require('express')
const cors = require('cors')
const app = express()

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

const genId = () => Math.floor(Math.random() * 1000000)

const todos = [
  {
    id: 1,
    text: 'Vie roskat',
    completed: false,
    createdAt: '2025-06-10T10:00:00Z'
  },
  {
    id: 2,
    text: 'Soita Donna Lee',
    completed: true,
    createdAt: '2025-06-09T14:30:00Z'
  },
  {
    id: 3,
    text: 'Viritä basso',
    completed: false,
    createdAt: '2025-06-05T09:15:00Z'
  }
]

app.get('/api/todos', (req, res) => {
  res.json(todos)
})

app.post('/api/todos', (req, res) => {
  if (!req.body.data || req.body.data.length > 140) {
    return res.status(400).json({
      error: 'Todo text is required and cannot be longer than 140 characters'
    })
  }

  const newTodo = {
    id: genId(),
    text: req.body.data,
    completed: false,
    createdAt: new Date().toISOString()
  }
  todos.push(newTodo)
  res.status(201).json(newTodo)
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
