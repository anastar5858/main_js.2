const calculatorDisplay = document.querySelector('.calculator-display h1');
const buttons = document.querySelectorAll('button');

let firstValue = 0;
let waitingNextValue = false;
let currentOperator='';

console.log(buttons)
//add function
const add = (num1, num2) => {return num1 + num2};

//subtract function
const subtract = (num1, num2) => num1 - num2;

//multiply function
const multiply = (num1, num2) => num1 * num2;

//divide function
const divide = (num1, num2) => num2 === 0 ? "not allowed" : num1/num2;

//calculate function
const calculate = (operator,num1, num2) => {
    
    switch (operator) {
        case '+':
            return add(num1,num2);
        case "-":
            return subtract(num1,num2)
        case "*":
            return multiply(num1, num2)
        case "/":
            return divide(num1,num2)
        default:
            return
    }
}
//operator button handler
const useOperator = (operator) =>{
    const currentNumber = Number(calculatorDisplay.textContent)
    //asign first value to currentNumber for the first time
    if(!firstValue){firstValue = currentNumber}
    currentOperator = operator;
    waitingNextValue = true;
}

// equal sign handler
const equalSignHandle = () =>{
    if(!currentOperator){
        return
    }
    if(firstValue){
        const currentNumber = Number(calculatorDisplay.textContent)
        const calculation = calculate(currentOperator,firstValue,currentNumber);
        calculatorDisplay.textContent = calculation
        firstValue = calculation
        if(calculation === "not allowed"){
            alert("Cannot divide by 0")
            clearHandler()
        }
        currentOperator=""
    }
    
}

// display function
const displayScreen = (val) => {
    if(waitingNextValue){
        calculatorDisplay.textContent = val;
        waitingNextValue = false;
    } else{
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0'? val : displayValue + val;
    }   
}

//del function
const deleteDigit = () =>{
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue.slice(0,displayValue.length - 1)
}

//clear handler
const clearHandler = () =>{
    firstValue = 0;
    currentOperator = "";
    waitingNextValue = false;
    calculatorDisplay.textContent = "0";
}

// decimal handler
const decimalHandler = () =>{
    const displayValue = calculatorDisplay.textContent;
    if(waitingNextValue){
        return
    }
    if(!displayValue.includes(".")){
        calculatorDisplay.textContent = displayValue + ".";
    }

}
// add event to buttons
buttons.forEach((btn) => {
    if (btn.classList.length === 0) {
        btn.addEventListener('click', ()=>displayScreen(btn.value))    
    } else if (btn.classList.contains('operator')){
        btn.addEventListener('click', ()=>useOperator(btn.value))
    } else if (btn.classList.contains('delete')){
        btn.addEventListener('click', ()=>deleteDigit())
    } else if (btn.classList.contains('equal-sign')){
        btn.addEventListener('click', ()=>equalSignHandle())
    } else if (btn.classList.contains('clear')){
        btn.addEventListener('click', ()=> clearHandler())
    } else if (btn.classList.contains('decimal')){
        btn.addEventListener('click', ()=>decimalHandler())
    }
})