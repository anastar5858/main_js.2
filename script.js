function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  if (y === 0) {
    return "Not a number";
  }
  return x / y;
}

// round
function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}

let currentInput = "";
let previousInput = "";
let operator = null;

function calculate() {
  const x = parseFloat(previousInput);
  const y = parseFloat(currentInput);
  let result;
  if (operator === "+") {
    result = add(x, y);
  } else if (operator === "-") {
    result = subtract(x, y);
  } else if (operator === "*") {
    result = multiply(x, y);
  } else if (operator === "/") {
    result = divide(x, y);
  }
  return round(result, 8);
}

const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    numberClick(button);
  });
});
function numberClick(button) {
  if (currentInput === "0" && button.textContent !== "0") {
    currentInput = button.textContent;
  } else {
    currentInput += button.textContent;
  }
  updateDisplay();
}

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentInput !== "") {
      if (previousInput !== "") {
        previousInput = calculate();
      } else {
        previousInput = currentInput;
      }
      operator = button.dataset.value;
      currentInput = "";
      updateDisplay();
    }
  });
});

const equalButton = document.getElementById("calculate");
equalButton.addEventListener("click", () => {
  if (currentInput !== "" && previousInput !== "" && operator !== null) {
    currentInput = calculate();
    previousInput = "";
    operator = null;
    updateDisplay();
  }
});

const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", () => {
  clearScreen();
});

function clearScreen() {
  currentInput = "";
  previousInput = "";
  operator = null;
  updateDisplay();
}

const backSpace = document.getElementById("delete");
backSpace.addEventListener("click", () => {
  deleteNumber();
});

function deleteNumber() {
  if (currentInput !== "0") {
    currentInput = currentInput.toString().slice(0, -1);
    updateDisplay();
  }
  if (currentInput === "") {
    currentInput = "";
    updateDisplay();
  }
}

const decimalButton = document.getElementById("decimal");
decimalButton.addEventListener("click", function () {
  displayDecimal();
});

function displayDecimal() {
  if (!currentInput.includes(".")) {
    currentInput += ".";
    updateDisplay();
  }
}

function updateDisplay() {
  const display = document.querySelector(".display");
  display.innerText = currentInput !== "" ? currentInput : previousInput;
}

document.addEventListener("keypress", (event) => {
  console.log(event.key, event.keyCode);
  if (event.key >= 0 && event.key <= 9) {
    currentInput += event.key;
    updateDisplay();
  }
  if (event.key === ".") {
    displayDecimal();
  }

  if (
    event.keyCode === 43 ||
    event.keyCode === 45 ||
    event.keyCode === 42 ||
    event.keyCode === 47
  ) {
    const character = String.fromCharCode(event.keyCode);
    if (currentInput !== "") {
      if (previousInput !== "") {
        previousInput = calculate();
      } else {
        previousInput = currentInput;
      }
      operator = character;
      currentInput = "";
      updateDisplay();
    }
  }
  if (event.keyCode === 13) {
    if (currentInput !== "" && previousInput !== "" && operator !== null) {
      currentInput = calculate();
      previousInput = "";
      operator = null;
      updateDisplay();
    }
  }
  if (event.key === "Backspace") {
    deleteNumber();
  }
  if (event.key === "Delete") {
    clearScreen();
  }
});
document.addEventListener("keydown", (event) => {
  console.log(event.key, event.keyCode);

  if (event.key === "Backspace") {
    deleteNumber();
  }
  if (event.key === "Delete") {
    clearScreen();
  }
});
