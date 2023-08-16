// Calculator functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return (b === 0) ? "Error: Cannot divide by zero" : a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return "Invalid operator";
    }
}

const display = document.getElementById("display");
let currentInput = "";
let firstNumber = "";
let operator = "";

document.querySelectorAll(".num-btn").forEach(button => {
    button.addEventListener("click", () => {
        currentInput += button.textContent;
        display.textContent = currentInput;
    });
});

document.querySelectorAll(".operator-btn").forEach(button => {
    button.addEventListener("click", () => {
        if (firstNumber !== "") {
            firstNumber = operate(operator, parseFloat(firstNumber), parseFloat(currentInput));
            display.textContent = firstNumber;
        } else {
            firstNumber = currentInput;
        }
        operator = button.textContent;
        currentInput = "";
    });
});

document.getElementById("equals").addEventListener("click", () => {
    if (firstNumber !== "" && operator !== "" && currentInput !== "") {
        firstNumber = operate(operator, parseFloat(firstNumber), parseFloat(currentInput));
        display.textContent = firstNumber;
        operator = "";
        currentInput = "";
    }
});

document.getElementById("clear").addEventListener("click", () => {
    currentInput = "";
    firstNumber = "";
    operator = "";
    display.textContent = "0";
});

document.getElementById("decimal").addEventListener("click", () => {
    if (!currentInput.includes(".")) {
        currentInput += ".";
        display.textContent = currentInput;
    }
});

document.getElementById("backspace").addEventListener("click", () => {
    currentInput = currentInput.slice(0, -1);
    display.textContent = currentInput;
});

document.addEventListener("keydown", event => {
    const key = event.key;

    if (!isNaN(key) || key === ".") {
        currentInput += key;
        display.textContent = currentInput;
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
        if (firstNumber !== "") {
            firstNumber = operate(operator, parseFloat(firstNumber), parseFloat(currentInput));
            display.textContent = firstNumber;
        } else {
            firstNumber = currentInput;
        }
        operator = key;
        currentInput = "";
    } else if (key === "Enter") {
        if (firstNumber !== "" && operator !== "" && currentInput !== "") {
            firstNumber = operate(operator, parseFloat(firstNumber), parseFloat(currentInput));
            display.textContent = firstNumber;
            operator = "";
            currentInput = "";
        }
    } else if (key === "Backspace") {
        currentInput = currentInput.slice(0, -1);
        display.textContent = currentInput;
    }
});

document.getElementById("inverse").addEventListener("click", () => {
    if (currentInput !== "") {
        currentInput = (num * -1).toString();
        display.textContent = currentInput;
    }
});
