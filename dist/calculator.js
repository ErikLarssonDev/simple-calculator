"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetRegisters = exports.registers = exports.printRegister = exports.calculate = void 0;
let registers = {};
exports.registers = registers;
const resetRegisters = () => {
    exports.registers = registers = {};
};
exports.resetRegisters = resetRegisters;
const validateRegisterName = (register) => {
    if (!register.match(/^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/)) {
        console.log(`Invalid register name: ${register}`);
        return;
    }
    else {
        return true;
    }
};
function calculate(command) {
    const parts = command.trim().split(" ");
    const register = parts[0];
    const operation = parts[1];
    const value = isNaN(Number(parts[2]))
        ? registers[parts[2]]
        : Number(parts[2]); // Checks if the value is a number or a register. If it is a register we will get the value of the register, otherwise we get the number.
    if (parts[3]) {
        console.log("Invalid input: " + command);
        return;
    }
    if (!value && value != 0) {
        console.log("Invalid input: " + command);
        return;
    }
    if (!validateRegisterName(register)) {
        return;
    }
    switch (operation) {
        case "add":
            registers[register] = (registers[register] || 0) + value;
            break;
        case "subtract":
            registers[register] = (registers[register] || 0) - value;
            break;
        case "multiply":
            registers[register] = (registers[register] || 0) * value;
            break;
        default:
            console.log(`Invalid operation: ${operation}`);
    }
}
exports.calculate = calculate;
function printRegister(register) {
    if (!validateRegisterName(register)) {
        return;
    }
    console.log(registers[register] || 0);
}
exports.printRegister = printRegister;
