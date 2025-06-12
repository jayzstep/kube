const express = require('express');

const randomString = Math.random().toString(36).substring(2, 15);
const app = express();
const port = process.env.PORT || 3000;

const logMessage = () => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp}: ${randomString}`);
}

app.get('/status', (req, res) => {
  const timestamp = new Date().toISOString();
  res.json({
    timestamp,
    string: randomString
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

setInterval(logMessage, 5000);
logMessage();
