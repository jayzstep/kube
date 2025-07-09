const path = require('path')
const fs = require('fs')
const axios = require('axios')

const express = require('express')

const randomString = Math.random().toString(36).substring(2, 15)
const app = express()
const port = process.env.PORT || 3000
const MESSAGE = process.env.MESSAGE || 'no message set'

const filesDirectory = path.join('/', 'usr', 'src', 'app', 'files')
const configDirectory = path.join('/', 'usr', 'src', 'app', 'config')
const logFilePath = path.join(filesDirectory, 'log.txt')
const informationFilePath = path.join(configDirectory, 'information.txt')

const logMessage = () => {
  const timestamp = new Date().toISOString()
  const message = `${timestamp}: ${randomString}`
  console.log(message)

  if (!fs.existsSync(filesDirectory)) {
    fs.mkdirSync(filesDirectory, { recursive: true })
  }

  fs.writeFileSync(logFilePath, message)
}

app.use(express.json())

app.get('/status', async (req, res) => {
  try {
    const log = fs.readFileSync(logFilePath, 'utf8')
    const information = fs.readFileSync(informationFilePath, 'utf8')
    const response = await axios.get(
      'http://ping-pong-svc.exercises:2345/pings'
    )
    const finalMessage = `file content: ${information} \n env variable: MESSAGE=${MESSAGE}\n${log}.\n Ping / Pongs: ${response.data.counter}`
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
