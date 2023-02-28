let registers: { [name: string]: number } = {};
/**
 * This function is used to reset the registers. This is mainly used for testing purposes at the moment.
 */
const resetRegisters = () => {
  registers = {};
};

/**
 *
 * @param register
 * @returns false if the register name is not valid, otherwise it returns true.
 */
const validateRegisterName = (register: string): boolean => {
  if (!register.match(/^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/)) {
    console.log(`Invalid register name: ${register}`);
    return false;
  } else {
    return true;
  }
};

/**
 *
 * @param command A string on the form <register> <operation> <value>. The value can be a number or a register name.
 * @returns
 */
function calculate(command: string): void {
  const parts = command.trim().split(" ");
  const register: string = parts[0];
  const operation: string = parts[1];
  const value: number = isNaN(Number(parts[2]))
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

/**
 * This function is used to print a register value. If there is no register with that name it will print 0.
 * @param register
 * @returns
 */
function printRegister(register: string): void {
  if (!validateRegisterName(register)) {
    return;
  }
  console.log(registers[register] || 0);
}

export { calculate, printRegister, registers, resetRegisters };
