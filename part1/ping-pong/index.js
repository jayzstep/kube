const express = require('express')
const { Pool } = require('pg')

const app = express()
const port = process.env.PORT || 3000
const pool = new Pool({ connectionString: process.env.DB_URI })

const initDatabase = async () => {
  try {
    console.log('Connecting to database...')
    await pool.query(`CREATE TABLE IF NOT EXISTS counter (
      id SERIAL PRIMARY KEY,
      value INTEGER DEFAULT 0
    )`)
    console.log('Database connected successfully')

    const counterResult = await pool.query(`SELECT * FROM counter`)

    if (counterResult.rowCount == 0) {
      await pool.query(`INSERT INTO counter (value) VALUES (0)`)
      console.log('Counter table initialized with value 0')
    } else {
      console.log('Counter table already exists')
    }
  } catch (error) {
    console.error('Database connection failed:', error)
    throw error
  }
}

app.get('/pingpong', async (req, res) => {
  try {
    const result = await pool.query(
      `UPDATE counter SET value = value + 1 RETURNING value`
    )
    const counter = result.rows[0].value
    res.send(`pong ${counter}`)
  } catch (error) {
    console.error('Database error:', error)
    res.status(500).send('Database error')
  }
})

app.get('/pings', async (req, res) => {
  try {
    const result = await pool.query(
      `UPDATE counter SET value = value + 1 RETURNING value`
    )
    const counter = result.rows[0].value
    res.json({
      counter
    })
  } catch (error) {
    console.error('Database error:', error)
    res.status(500).send('Database error')
  }
})

const startServer = async () => {
  await initDatabase()
  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}

startServer().catch(console.error)
