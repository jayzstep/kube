const path = require('path')
const fs = require('fs')
const axios = require('axios')

const express = require('express')

const randomString = Math.random().toString(36).substring(2, 15)
const app = express()
const port = process.env.PORT || 3000

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const logFilePath = path.join(directory, 'log.txt')

const logMessage = () => {
  const timestamp = new Date().toISOString()
  const message = `${timestamp}: ${randomString}`
  console.log(message)

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true })
  }

  fs.writeFileSync(logFilePath, message)
}

app.use(express.json())

app.get('/status', async (req, res) => {
  try {
    const log = fs.readFileSync(logFilePath, 'utf8')
    const response = await axios.get(
      'http://ping-pong-svc.exercises:2345/pings'
    )
    const finalMessage = `${log}.\n Ping / Pongs: ${response.data.counter}`
    res.send(finalMessage)
  } catch (error) {
    res.status(500).send('Something went wrong: ', error)
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

setInterval(logMessage, 5000)
logMessage()
