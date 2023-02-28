const readline = require("readline");
const fs = require("fs");
const events = require("events");
import { calculate, printRegister } from "./calculator";

/**
 * This function takes in the command and executes the corresponding action. 
 * @param command 
 */
const handleCommand = (command: string): void => {
  if (command.toLowerCase() === "quit") {
    // In the examples it should be possible to quit the program with both "quit" and "QUIT".
    rl.close();
    process.exit();
  } else if (command.startsWith("print")) {
    const register = command.substring(6).trim();
    printRegister(register);
  } else {
    calculate(command);
  }
};

/**
 * This function takes in a relative file path and then executes the handleCommand function on each line.
 * @param filePath 
 */
const readFromFile = async (filePath: string) => {
  (async function processLineByLine() {
    try {
      const readlineFromFile = readline.createInterface({
        input: fs.createReadStream(filePath),
        crlfDelay: Infinity,
      });

      readlineFromFile.on("line", (line: string) => {
        handleCommand(line);
      });

      await events.once(readlineFromFile, "close");
      process.exit();
    } catch (err) {
      console.error(err);
    }
  })();
};

/**
 * If a file is specified in the command we will read all inputs from the file and then exit the program.
 */
const file = process.argv[2]; // Checks if a file is sent as an argument in

if (file) {
  readFromFile(file);
}

/**
 * If there is no file specified in the command we will read the inputs from the terminal.
 */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (input: string) => {
  const command = input.trim();
  handleCommand(command);
});

export { readFromFile, handleCommand };
