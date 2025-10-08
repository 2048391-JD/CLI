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

rl.prompt();

rl.on("line", (input) => {
  if (input.trim().toLowerCase() === "exit") {
    logger.exitApp();
  } else {
    logger.logMessage(input);
    rl.prompt();
  }
});
