let registers: { [name: string]: number } = {};

const resetRegisters = () => {
  registers = {};
};

function calculate(command: string) {
  const parts = command.trim().split(" ");
  const register: string = parts[0];
  const operation: string = parts[1];
  const value: number = isNaN(Number(parts[2]))
    ? registers[parts[2]]
    : Number(parts[2]); // Checks if the value is a number or a register. If it is a register we will get the value of the register, otherwise we get the number.
  if (parts[3]) {
    console.log("Invalid input: " + command);
  }
  if (!value) {
    console.log("Invalid input: " + command);
  }
  if (!register.match(/^[a-z0-9]+$/i)) {
    console.log(`Invalid register name: ${register}`);
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

function printRegister(register: string) {
  if (!register.match(/^[a-z0-9]+$/i)) {
    console.log(`Invalid register name: ${register}`);
    return;
  }
  console.log(registers[register] || 0);
}

export { calculate, printRegister, registers, resetRegisters };
