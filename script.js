// Assigning values
// const addButton = document.querySelector(".add");
// const subtractButton = document.querySelector(".subtract");
// const multiplyButton = document.querySelector(".multiply");
// const divideButton = document.querySelector(".divide");
const display = document.querySelector(".display");

// Operators 
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

// Round number 
function round(vlaue, decimals) {
    return Number(Math.round(vlaue + "e" + decimals) + "e-" + decimals);
}

// Calculate
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


// Number click event
const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach((button) => {
    button.addEventListener("click", () => { 
        numberClick(button);
    });
})
function numberClick(button) {
    currentInput = currentInput + button.textContent;
    updateDisplay();
}

// Operator click event
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
})

// Equals click event
const equalButton = document.querySelector(".equals");
equalButton.addEventListener("click", () => { 
    if (currentInput !== "" && previousInput !== "" && operator !== null) {
        currentInput = calculate();
        previousInput = "";
        operator = null;
        updateDisplay();
        }
});

// Clear click event
const clearAllButton = document.querySelector(".clear-all");
clearAllButton.addEventListener("click", () => { 
    clearDisplay();
});
function clearDisplay() {
    currentInput = "";
    previousInput = "";
    operator = null;
    updateDisplay();
}

// Delete click event
const deleteButton = document.querySelector(".delete");
deleteButton.addEventListener("click", () => { 
    deleteNumber();
});
function deleteNumber() {
    if (currentInput !== "0") {
        currentInput = currentInput.toString().slice(0,-1);
        updateDisplay();
    }
    if (currentInput === "") {
        currentInput = "";
        updateDisplay();
    }
}

// Decimal click event
const decimalButton = document.querySelector(".decimal");
decimalButton.addEventListener("click", () => { 
    displayDecimal();
});
function displayDecimal() {
    if (!currentInput.includes(".")) {
        currentInput = currentInput + ".";
        updateDisplay();
    }
}

// Update display
function updateDisplay() {
    if (currentInput !== "") {
        display.innerText = currentInput
    } else {
        display.innerText = previousInput;
    }
}