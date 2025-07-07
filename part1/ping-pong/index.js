const fs = require('fs')
const path = require('path')
const express = require('express')

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'counter.txt')

let counter = 0

if (!fs.existsSync(filePath)) {
  fs.mkdirSync(directory, { recursive: true })
  fs.writeFileSync(filePath, counter.toString())
}

try {
  counter = Number(fs.readFileSync(filePath, 'utf8'))
} catch (err) {
  console.error('Error reading file:', err)
}

const app = express()
const port = process.env.PORT || 3000

app.get('/pingpong', (req, res) => {
  counter += 1
  fs.writeFileSync(filePath, counter.toString())
  res.send(`pong ${counter}`)
})

app.get('/pings', (req, res) => {
  counter += 1
  fs.writeFileSync(filePath, counter.toString())
  res.json({
    counter
  })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
