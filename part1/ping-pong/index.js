const express = require('express')

let counter = 0;

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  counter += 1;
  res.send(`pong ${counter}`)
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
