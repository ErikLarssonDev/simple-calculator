import {
  calculate,
  printRegister,
  registers,
  resetRegisters,
} from "./calculator";
import { readFromFile } from "./main";

beforeEach(() => {
  resetRegisters();
});

describe("add operation", () => {
  it("should add numbers to registers", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    calculate("A add 2");
    calculate("A add 3");
    printRegister("A");

    expect(registers["A"]).toBe(5);
    expect(consoleSpy).toHaveBeenCalledWith(5);

    consoleSpy.mockRestore();
  });
  it("should add registers to registers", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    calculate("A add 2");
    calculate("B add A");
    calculate("B add 3");
    printRegister("B");

    expect(registers["B"]).toBe(5);
    expect(consoleSpy).toHaveBeenCalledWith(5);

    consoleSpy.mockRestore();
  });
});

describe("subtract operation", () => {
  it("should subtract numbers from registers", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    calculate("B add 5");
    calculate("B subtract 2");
    printRegister("B");

    expect(registers["B"]).toBe(3);
    expect(consoleSpy).toHaveBeenCalledWith(3);

    consoleSpy.mockRestore();
  });
  it("should subtract registers from registers", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    calculate("B add 5");
    calculate("A add 2");
    calculate("B subtract A");
    printRegister("B");

    expect(registers["B"]).toBe(3);
    expect(consoleSpy).toHaveBeenCalledWith(3);

    consoleSpy.mockRestore();
  });
  it("subtraction with new register", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    calculate("B subtract 2");
    printRegister("B");

    expect(registers["B"]).toBe(-2);
    expect(consoleSpy).toHaveBeenCalledWith(-2);

    consoleSpy.mockRestore();
  });
});

describe("multiply operation", () => {
  it("should multiply numbers in registers", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    calculate("C add 2");
    calculate("C multiply 3");
    printRegister("C");

    expect(registers["C"]).toBe(6);
    expect(consoleSpy).toHaveBeenCalledWith(6);

    consoleSpy.mockRestore();
  });

  it("should handle lazy evaluation of register values", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    calculate("D add 2");
    calculate("E add 3");
    calculate("F multiply D");
    calculate("F multiply E");

    printRegister("D");
    printRegister("E");
    printRegister("F");

    expect(registers["D"]).toBe(2);
    expect(registers["E"]).toBe(3);
    expect(registers["F"]).toBe(0);

    expect(consoleSpy).toHaveBeenCalledWith(3);
    expect(consoleSpy).toHaveBeenCalledWith(2);
    expect(consoleSpy).toHaveBeenCalledWith(0);

    consoleSpy.mockRestore();
  });
});

describe("invalid input", () => {
  it("should ignore invalid input and log error message", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    calculate("A add");
    calculate("invalid command");
    calculate("-invalid command");
    calculate("test add 2 2");
    printRegister("#€%&/()=?");

    expect(consoleSpy).toHaveBeenCalledWith("Invalid input: A add");
    expect(consoleSpy).toHaveBeenCalledWith("Invalid input: invalid command");
    expect(consoleSpy).toHaveBeenCalledWith("Invalid operation: command");
    expect(consoleSpy).toHaveBeenCalledWith("Invalid register name: -invalid");
    expect(consoleSpy).toHaveBeenCalledWith("Invalid input: test add 2 2");
    expect(consoleSpy).toHaveBeenCalledWith("Invalid register name: #€%&/()=?");

    consoleSpy.mockRestore();
  });
});
