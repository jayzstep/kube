const randomString = Math.random().toString(36).substring(2, 15);

function logMessage() {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp}: ${randomString}`);
}

setInterval(logMessage, 5000);
logMessage();