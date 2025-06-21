const path = require('path')
const fs = require('fs')

const express = require('express');

const randomString = Math.random().toString(36).substring(2, 15);
const app = express();
const port = process.env.PORT || 3000;

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'log.txt')

const logMessage = () => {
  const timestamp = new Date().toISOString();
  const message = `${timestamp}: ${randomString}`
  console.log(message);
  
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
  
  fs.writeFileSync(filePath, message);
}

app.get('/status', (req, res) => {
  try {
    const log = fs.readFileSync(filePath, 'utf8');
    res.send(log);
  } catch (error) {
    res.status(500).send('Error reading log file');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

setInterval(logMessage, 5000);
logMessage();
