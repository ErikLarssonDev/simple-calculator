"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculator_1 = require("./calculator");
beforeEach(() => {
    (0, calculator_1.resetRegisters)();
});
describe("add operation", () => {
    it("should add numbers to registers", () => {
        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        (0, calculator_1.calculate)("A add 2");
        (0, calculator_1.calculate)("A add 3");
        (0, calculator_1.printRegister)("A");
        expect(calculator_1.registers["A"]).toBe(5);
        expect(consoleSpy).toHaveBeenCalledWith(5);
        consoleSpy.mockRestore();
    });
    it("should add registers to registers", () => {
        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        (0, calculator_1.calculate)("A add 2");
        (0, calculator_1.calculate)("B add A");
        (0, calculator_1.calculate)("B add 3");
        (0, calculator_1.printRegister)("B");
        expect(calculator_1.registers["B"]).toBe(5);
        expect(consoleSpy).toHaveBeenCalledWith(5);
        consoleSpy.mockRestore();
    });
});
describe("subtract operation", () => {
    it("should subtract numbers from registers", () => {
        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        (0, calculator_1.calculate)("B add 5");
        (0, calculator_1.calculate)("B subtract 2");
        (0, calculator_1.printRegister)("B");
        expect(calculator_1.registers["B"]).toBe(3);
        expect(consoleSpy).toHaveBeenCalledWith(3);
        consoleSpy.mockRestore();
    });
    it("should subtract registers from registers", () => {
        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        (0, calculator_1.calculate)("B add 5");
        (0, calculator_1.calculate)("A add 2");
        (0, calculator_1.calculate)("B subtract A");
        (0, calculator_1.printRegister)("B");
        expect(calculator_1.registers["B"]).toBe(3);
        expect(consoleSpy).toHaveBeenCalledWith(3);
        consoleSpy.mockRestore();
    });
    it("subtraction with new register", () => {
        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        (0, calculator_1.calculate)("B subtract 2");
        (0, calculator_1.printRegister)("B");
        expect(calculator_1.registers["B"]).toBe(-2);
        expect(consoleSpy).toHaveBeenCalledWith(-2);
        consoleSpy.mockRestore();
    });
});
describe("multiply operation", () => {
    it("should multiply numbers in registers", () => {
        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        (0, calculator_1.calculate)("C add 2");
        (0, calculator_1.calculate)("C multiply 3");
        (0, calculator_1.printRegister)("C");
        expect(calculator_1.registers["C"]).toBe(6);
        expect(consoleSpy).toHaveBeenCalledWith(6);
        consoleSpy.mockRestore();
    });
    it("should handle lazy evaluation of register values", () => {
        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        (0, calculator_1.calculate)("D add 2");
        (0, calculator_1.calculate)("E add 3");
        (0, calculator_1.calculate)("F multiply D");
        (0, calculator_1.calculate)("F multiply E");
        (0, calculator_1.printRegister)("D");
        (0, calculator_1.printRegister)("E");
        (0, calculator_1.printRegister)("F");
        expect(calculator_1.registers["D"]).toBe(2);
        expect(calculator_1.registers["E"]).toBe(3);
        expect(calculator_1.registers["F"]).toBe(0);
        expect(consoleSpy).toHaveBeenCalledWith(3);
        expect(consoleSpy).toHaveBeenCalledWith(2);
        expect(consoleSpy).toHaveBeenCalledWith(0);
        consoleSpy.mockRestore();
    });
});
describe("invalid input", () => {
    it("should ignore invalid input and log error message", () => {
        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        (0, calculator_1.calculate)("A add");
        (0, calculator_1.calculate)("invalid command");
        (0, calculator_1.calculate)("-invalid command");
        (0, calculator_1.calculate)("test add 2 2");
        (0, calculator_1.printRegister)("#€%&/()=?");
        expect(consoleSpy).toHaveBeenCalledWith("Invalid input: A add");
        expect(consoleSpy).toHaveBeenCalledWith("Invalid input: invalid command");
        expect(consoleSpy).toHaveBeenCalledWith("Invalid operation: command");
        expect(consoleSpy).toHaveBeenCalledWith("Invalid register name: -invalid");
        expect(consoleSpy).toHaveBeenCalledWith("Invalid input: test add 2 2");
        expect(consoleSpy).toHaveBeenCalledWith("Invalid register name: #€%&/()=?");
        consoleSpy.mockRestore();
    });
    it("should not accept numbers as registers", () => {
        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        (0, calculator_1.calculate)("5 add 5");
        expect(consoleSpy).toHaveBeenCalledWith("Invalid register name: 5");
        consoleSpy.mockRestore();
    });
});
