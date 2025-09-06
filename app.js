// app.js
const readline = require("readline");
const fs = require("fs");
const EventEmitter = require("events");

// Logger class extending EventEmitter
class Logger extends EventEmitter {
  logMessage(message) {
    this.emit("messageLogged", message);
  }

  exitApp() {
    this.emit("exitApp");
  }
}

const logger = new Logger();

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Enter message (type 'exit' to quit): "
});

// Event: messageLogged
logger.on("messageLogged", (message) => {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;

  fs.appendFile("log.txt", logEntry, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
    }
  });
});

// Event: exitApp
logger.on("exitApp", () => {
  console.log("Goodbye! All messages saved to log.txt");
  rl.close();
});

// Start CLI
rl.prompt();

rl.on("line", (input) => {
  if (input.trim().toLowerCase() === "exit") {
    logger.exitApp();
  } else {
    logger.logMessage(input);
    rl.prompt();
  }
});
