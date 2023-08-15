// animation logic
import * as animations from './animationClear.js';
import * as animationsElectron from './animationElectrons.js';
// redo object
let redo = {};
// global operation object
export const operationsObj = {
    firstOperand: '',
    operation: '',
    secondOperand: '',
}
export const convertToNumber = (str) => Number(str);
export const convertToString = (argument) => argument.toString();
// operation functions
const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const divide = (a,b) => b === 0 ? 'Not Allowed' : a / b;
const multipliy = (a,b) => a * b;
// operation function
export const operate = (operation) => {
    let result;
    const firstOperandNumber = convertToNumber(operationsObj.firstOperand);
    const secondOperandNumber = convertToNumber(operationsObj.secondOperand);
    if (operation === '+') result = add(firstOperandNumber, secondOperandNumber);
    if (operation === '-') result = subtract(firstOperandNumber, secondOperandNumber);
    if (operation === '/') result = divide(firstOperandNumber, secondOperandNumber);
    if (operation === '*') result = multipliy(firstOperandNumber, secondOperandNumber);
    return result;
}
// display function
export const displayHandler = (displayElement) => displayElement.textContent = `${operationsObj.firstOperand} ${operationsObj.operation === '' ? '(No operation)' : operationsObj.operation} ${operationsObj.secondOperand === '' ? '(?)' : operationsObj.secondOperand}`;
// number btns handler
export const numberBtnsHandler = async (e, displayElement, animationMode) => {
    const number = e.target.textContent;
    const electronCanvas = document.getElementById('electrons-animate');
    if (animationMode) await animationsElectron.configureCanvasDimensions(electronCanvas, e.target);
    redo = {};
    operationsObj.firstOperand === '' || operationsObj.operation === '' ? operationsObj.firstOperand += number : operationsObj.secondOperand += number;
    // no zero at the start please
    if (operationsObj.firstOperand [0] === '0')  operationsObj.firstOperand = '';
    if (operationsObj.secondOperand [0] === '0')  operationsObj.secondOperand = '';
    if (operationsObj.firstOperand === '') return
    displayHandler(displayElement);
}
// operations btn handler
export const operationBtnsHandler = (operation, displayArea, resultArea) => {
    redo = {};
    if (operationsObj.firstOperand === '') return
    operation === 'Add' ? operation = '+'
    : operation === 'Subtract' ? operation = '-'
    : operation === 'Divide' ? operation = '/'
    : operation = '*';
    if ((operationsObj.firstOperand !== '' && operationsObj.operation !== '') && (operationsObj.secondOperand !== '' && operationsObj.secondOperand !== '.')) {
        equalBtnHandler(displayArea, resultArea, operation);
        return
    }
    operationsObj.operation = operation;
    displayHandler(displayArea)
}
// equal btn handler
export const equalBtnHandler = (displayArea, resultArea, shortcut) => {
    if (operationsObj.firstOperand === '' || operationsObj.operation === '' || operationsObj.secondOperand === '') {
        const prevValue = resultArea.textContent;
        resultArea.textContent = 'Incomplete Value';
        setTimeout(() => resultArea.textContent = prevValue, 1000)
    } else {
        // calculate result based on functions above
        let result = operate(operationsObj.operation);
        if (result === 'Not Allowed') return resultArea.textContent = result;
        result = Math.round(result * 1000) / 1000;  
        resultArea.textContent = convertToString(result);
        // update display
        operationsObj.firstOperand = convertToString(result);
        operationsObj.secondOperand = '';
        shortcut ? operationsObj.operation = shortcut : operationsObj.operation = '';
        displayHandler(displayArea);
    }
}
// clear btn handler
export const clearCalc = async (displayArea, resultArea, animationMode) => {
    if (resultArea) resultArea.textContent = '0';
    const clearCanvas = document.getElementById('clear-animate');
    if (animationMode && displayArea.textContent !== '') await animations.configureCanvasDimensions(clearCanvas);
    displayArea.textContent = '';
    for (const key in operationsObj) operationsObj[key] = '';
}
// decimal btn handler
export const decimalHandler = (displayArea) => {
    redo = {};
    if (displayArea.textContent.includes('.')) return;
    operationsObj.firstOperand === '' || operationsObj.operation === '' ? operationsObj.firstOperand += '.' : operationsObj.secondOperand += '.';
    displayHandler(displayArea);
}
// sign btn handler
export const signBtnHandler = (displayArea) => {
    redo = {};
    if (operationsObj.firstOperand === '.' || operationsObj.firstOperand === '') return
    operationsObj.firstOperand !== '' && operationsObj.operation === '' ? operationsObj.firstOperand = convertToString(Number(operationsObj.firstOperand * -1)) : operationsObj.secondOperand = convertToString(Number(operationsObj.secondOperand * -1));
    displayHandler(displayArea);
}
// undo btn handler
export const removeLast = (arr) => arr.splice(0, arr.length - 1);
export const undoBtnHandler = (displayArea, resultArea) => {
    redo = {};
    // check if we want to remove from second, first, operation
    // only first
    if (operationsObj.firstOperand !== '' && operationsObj.operation === ''){
        redo.firstOperand = operationsObj.firstOperand;
        const newOperand = removeLast(operationsObj.firstOperand.split('')).join('');
        operationsObj.firstOperand = newOperand;
        if (operationsObj.firstOperand === '') {
            clearCalc(displayArea, resultArea)
            return
        }
    }
    if (operationsObj.operation !== '' && operationsObj.secondOperand === '') {
        redo.operation = operationsObj.operation;
        operationsObj.operation = '';
    }
    if (operationsObj.secondOperand !== '') {
        redo.secondOperand = operationsObj.secondOperand;
        const newOperand = removeLast(operationsObj.secondOperand.split('')).join('');
        operationsObj.secondOperand = newOperand;
    }
    // update display
    displayHandler(displayArea);
}
// redo btn handler 
export const redoBtnHandler = (displayArea) => {
    for (const property in operationsObj) {
        const redoProp = Object.keys(redo)[0]
        if (property === redoProp) {
            operationsObj[property] = redo[redoProp];
            redo = {};
            displayHandler(displayArea)
            return;
        }
    }
}