const axios = require('axios')
const fs = require('fs')
const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'build')))

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const photoFilePath = path.join(directory, 'pic.jpg')

if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory, { recursive: true })
}

let pic = null

const initPicture = async () => {
  try {
    pic = fs.readFileSync(photoFilePath)
  } catch (error) {
    console.log('no picture found, getting one from the internet')
    const response = await axios.get('https://picsum.photos/1200', {
      responseType: 'arraybuffer'
    })
    fs.writeFileSync(photoFilePath, response.data)
    pic = response.data
  }
}

initPicture()

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

app.use(cors())
app.use(express.json())

app.get('/api/todos', (req, res) => {
  res.json(todos)
})

app.get('/api/picture', (req, res) => {
  if (!pic) {
    return res.status(503).send('Image not ready')
  }
  res.set('Content-Type', 'image/jpeg')
  res.send(pic)
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
