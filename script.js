const display = document.querySelector(".display");
let equalsButtonClicked = false;

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

    if (operator === "*" || operator === "/") {
        return calculateIntermediate(x, y);
    } else if (operator === "+") {
        result = add(x, y);
    } else if (operator === "-") {
        result = subtract(x, y);
    }

    return round(result, 8);

}

// Calculate intermediate results
function calculateIntermediate(x, y) {
    if (intermediateResult !== null) {
        if (operator === "*") {
            result = multiply(intermediateResult, y);
        } else if (operator === "/") {
            result = divide(intermediateResult, y);
        }
    }
    if (operator === "*") {
        result = multiply(x, y);
    } else if (operator === "/") {
        result = divide(x, y);
    }

    return round(result, 8);
}

// Operator active state
function clearOperatorActive() {
    operatorButtons.forEach(operatorButton => {
      operatorButton.classList.remove("operator-active");
    });
  }

// Number click event
const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach((button) => {
    button.addEventListener("click", () => { 
        // Clear inputs only if equals button was clicked before
        if (equalsButtonClicked) {
            clearInputs(); 
            equalsButtonClicked = false;
        }
        numberClick(button);
        clearOperatorActive();
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
              if (intermediateResult !== null) {
                previousInput = intermediateResult.toString();
                intermediateResult = null;
                } else {
                    previousInput = calculate();
                }
            } else {
              previousInput = currentInput;
            }
            operator = button.dataset.value;
            currentInput = "";
            // updateDisplay();
          }
        clearOperatorActive();
        button.classList.add("operator-active");
        });
})


// Equals click event
let intermediateResult = null;
const equalButton = document.querySelector(".equals");
equalButton.addEventListener("click", () => { 
    if (currentInput !== "" && previousInput !== "" && operator !== null) {
        intermediateResult = calculate(); // Store intermediate result
        currentInput = intermediateResult.toString();
        previousInput = "";
        operator = null;
        updateDisplay();
        equalsButtonClicked = true; 
    }
});

// Clear-all click event
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

// Function to clear currentInput and previousInput
function clearInputs() {
    currentInput = "";
    previousInput = "";
    updateDisplay();
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

// Keyboard keydown event
document.addEventListener("keydown", (event) => {
    // Keyboard numbers
    if (event.key >= 0 && event.key <= 9) {
        currentInput = currentInput + event.key;
        updateDisplay();
    }
    if (event.key === ".") {
        displayDecimal();
    }
    
    // Keyboard operators
    const operatorKeys = ["+", "-", "*", "/"];
    if (operatorKeys.includes(event.key)) {
        if (currentInput !== "") {
            if (previousInput !== "") {
                previousInput = calculate();
            } else {
                previousInput = currentInput;
            }
            operator = event.key;
            currentInput = "";
            updateDisplay();
        }
    }
        
    // Keyboard enter
    if (event.key === "Enter") {
        if (currentInput !== "" && previousInput !== "" && operator !== null) {
          currentInput = calculate();
          previousInput = "";
          operator = null;
          updateDisplay();
          clearInputs();
        }
      }

    // Keyboard Backspace & Delete
    if (event.key === "Backspace") {
        deleteNumber();
    }
    if (event.key === "Delete") {
        clearDisplay();
    }
})

