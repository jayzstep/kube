const axios = require('axios')
const fs = require('fs')
const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()

const PORT = process.env.PORT || 3000
const UPDATE_INTERVAL =
  parseInt(process.env.UPDATE_INTERVAL, 10) || 10 * 60 * 1000
const PIC_URL = process.env.PIC_URL || 'https://picsum.photos/200'

app.use(express.static(path.join(__dirname, 'build')))

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const photoFilePath = path.join(directory, 'pic.jpg')
const lastUpdatedFilePath = path.join(directory, 'updated.txt')

if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory, { recursive: true })
}

let pic = null

const initPicture = async () => {
  try {
    pic = fs.readFileSync(photoFilePath)
  } catch (error) {
    console.log('no picture found, getting one from the internet')
    updatePicture()
  }
}

const updatePicture = async () => {
  const response = await axios.get(PIC_URL, {
    responseType: 'arraybuffer'
  })
  const timeStamp = Date.now()
  fs.writeFileSync(photoFilePath, response.data)
  fs.writeFileSync(lastUpdatedFilePath, timeStamp.toString())
  pic = response.data
}

initPicture()

app.use(cors())
app.use(express.json())

app.get('/api/picture', (req, res) => {
  if (!pic) {
    return res.status(503).send('Image not ready')
  }
  res.set('Content-Type', 'image/jpeg')
  res.send(pic)
  const lastUpdated = fs.readFileSync(lastUpdatedFilePath)
  if (Date.now() - parseInt(lastUpdated, 10) > UPDATE_INTERVAL) {
    updatePicture()
  }
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
