"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCommand = exports.readFromFile = void 0;
const readline = require("readline");
const fs = require("fs");
const events = require("events");
const calculator_1 = require("./calculator");
/**
 *
 * @param command A string on the form <register> <operation> <value>
 */
const handleCommand = (command) => {
    if (command.toLowerCase() === "quit") {
        // In the examples it should be possible to quit the program with both "quit" and "QUIT".
        rl.close();
        process.exit();
    }
    else if (command.startsWith("print")) {
        const register = command.substring(6).trim();
        (0, calculator_1.printRegister)(register);
    }
    else {
        (0, calculator_1.calculate)(command);
    }
};
exports.handleCommand = handleCommand;
/**
 *
 * @param filePath This function takes in a relative file path and then executes the handleCommand function on each line.
 */
const readFromFile = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    (function processLineByLine() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const readlineFromFile = readline.createInterface({
                    input: fs.createReadStream(filePath),
                    crlfDelay: Infinity,
                });
                readlineFromFile.on("line", (line) => {
                    handleCommand(line);
                });
                yield events.once(readlineFromFile, "close");
                process.exit();
            }
            catch (err) {
                console.error(err);
            }
        });
    })();
});
exports.readFromFile = readFromFile;
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
rl.on("line", (input) => {
    const command = input.trim();
    handleCommand(command);
});
