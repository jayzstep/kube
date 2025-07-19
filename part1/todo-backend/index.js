const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')
const middleware = require('./utils/middleware')

const app = express()

const PORT = process.env.PORT || 3000
const pool = new Pool({ connectionString: process.env.DB_URI })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

const initDatabase = async () => {
  try {
    console.log('Connecting to database...')
    await pool.query(`CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      text VARCHAR(140) NOT NULL,
      completed BOOLEAN NOT NULL DEFAULT false,
      createdAt TIMESTAMP NOT NULL DEFAULT now()
    )`)
    console.log('Database connected successfully')
  } catch (error) {
    console.error('Database connection failed:', error)
    throw error
  }
}

app.get('/api/todos', async (req, res) => {
  try {
    const todos = await pool.query(`SELECT * FROM todos`)
    res.status(200).json(todos.rows)
  } catch (error) {
    console.error('Database error:', error)
    res.status(500).send('Database error')
  }
})

app.post('/api/todos', async (req, res) => {
  if (!req.body.data || req.body.data.length > 140) {
    return res.status(400).json({
      error: 'Todo text is required and cannot be longer than 140 characters'
    })
  }
  try {
    const text = 'INSERT INTO todos (text) VALUES($1) RETURNING *'
    const values = [req.body.data]
    const result = await pool.query(text, values)
    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Database error:', error)
    res.status(500).send('Database error')
  }
})

app.listen(PORT, async () => {
  await initDatabase()
  console.log(`Server started in port ${PORT}`)
})
