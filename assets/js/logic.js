import * as animations from './animationClear.js';
import * as animationsElectron from './animationElectrons.js';
import * as animationsOperations from './animationOperations.js';
let redo = {};
export const operationsObj = {
    firstOperand: '',
    operation: '',
    secondOperand: '',
}
export const removeAnimationElements = (children) => {
    const childrenArr = [...children];
    childrenArr.forEach((child) => child.remove(child));
    const displayArea = document.getElementById('display-area');
    const msgPara = document.getElementById('animationMessage');
    const cleanPara = msgPara.cloneNode()
    displayArea.style.display = ''
    const animationMsgs = [...document.getElementsByClassName('animationMessage')];
    animationMsgs.forEach((animationMsg) => {
        if (animationMsg !== msgPara) {
            animationMsg.remove()
        }
    })
    msgPara.textContent = '';
    document.body.appendChild(msgPara);
}
export const convertToNumber = (str) => Number(str);
export const convertToString = (argument) => argument.toString();
const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const divide = (a,b) => b === 0 || b === NaN ? 'Not Allowed' : a / b;
const multipliy = (a,b) => a * b;
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
export const displayHandler = (displayElement) => displayElement.textContent = `${operationsObj.firstOperand} ${operationsObj.operation === '' ? '' : operationsObj.operation} ${operationsObj.secondOperand === '' ? '' : operationsObj.secondOperand}`.trim();;
export const numberBtnsHandler = async (e, displayElement, animationMode) => {
    const number = e.target.textContent;
    redo = {};
    operationsObj.firstOperand === '' || operationsObj.operation === '' ? operationsObj.firstOperand += number : operationsObj.secondOperand += number;
    if (operationsObj.firstOperand [0] === '0')  operationsObj.firstOperand = '';
    if (operationsObj.secondOperand [0] === '0')  operationsObj.secondOperand = '';
    if (operationsObj.firstOperand === '') return
    const electronCanvas = document.getElementById('electrons-animate');
    if (animationMode && e.detail === 1) await animationsElectron.configureCanvasDimensions(electronCanvas, e.target);
    displayHandler(displayElement);
}
export const operationBtnsHandler = async (e, displayArea, resultArea, animationMode) => {
    let operation = e.target.textContent;
    redo = {};
    if (operationsObj.firstOperand === '') return
    operation === 'Add' ? operation = '+'
    : operation === 'Subtract' ? operation = '-'
    : operation === 'Divide' ? operation = '/'
    : operation = '*';
    if ((operationsObj.firstOperand !== '' && operationsObj.operation !== '') && (operationsObj.secondOperand !== '' && operationsObj.secondOperand !== '.')) {
        const equalBtn = document.getElementById('equal-btn');
        equalBtnHandler(displayArea, resultArea, operation, animationMode, equalBtn);
        return
    }
    operationsObj.operation = operation;
    const electronCanvas = document.getElementById('electrons-animate');
    if (animationMode && e.detail === 1) await animationsElectron.configureCanvasDimensions(electronCanvas, e.target);
    displayHandler(displayArea)
}
export const equalBtnHandler = async (displayArea, resultArea, shortcut, animationMode, e) => {
    if (operationsObj.firstOperand === '' || operationsObj.operation === '' || operationsObj.secondOperand === '') {
        const prevValue = resultArea.textContent;
        resultArea.textContent = 'Incomplete Value';
        setTimeout(() => resultArea.textContent = prevValue, 1000)
    } else {
        let result = operate(operationsObj.operation);
        if (isNaN(result)) return resultArea.textContent = 'Not Allowed';
        result = Math.round(result * 1000) / 1000;  
        const electronCanvas = document.getElementById('electrons-animate');
        let carryWithAnimation = false;
        if (animationMode && e.detail === 1) await animationsElectron.configureCanvasDimensions(electronCanvas, e.target ? e.target : e);
        if (animationMode && e.detail === 1) carryWithAnimation = await animationsOperations.initialiseAnimation(operationsObj.firstOperand, operationsObj.operation, operationsObj.secondOperand);
        if (carryWithAnimation === false) resultArea.textContent = convertToString(result);
        operationsObj.firstOperand = convertToString(result);
        operationsObj.secondOperand = '';
        shortcut ? operationsObj.operation = shortcut : operationsObj.operation = '';
        if (carryWithAnimation === false) displayHandler(displayArea);
    }
}
export const clearCalc = async (displayArea, resultArea, animationMode, e) => {
    if (resultArea) resultArea.textContent = '0';
    const clearCanvas = document.getElementById('clear-animate');
    const electronCanvas = document.getElementById('electrons-animate');
    if ((animationMode && displayArea.textContent !== '') && e.detail === 1) await animationsElectron.configureCanvasDimensions(electronCanvas, e.target);;
    if ((animationMode && displayArea.textContent !== '') && e.detail === 1) await animations.configureCanvasDimensions(clearCanvas);
    const children = document.getElementsByClassName('animation-box');
    removeAnimationElements([...children]);
    displayArea.textContent = '';
    for (const key in operationsObj) operationsObj[key] = '';
}
export const decimalHandler = async (displayArea, animationMode, e) => {
    redo = {};
    if (displayArea.textContent.includes('.')) return;
    operationsObj.firstOperand === '' || operationsObj.operation === '' ? operationsObj.firstOperand += '.' : operationsObj.secondOperand += '.';
    const electronCanvas = document.getElementById('electrons-animate');
    if (animationMode && e.detail === 1) await animationsElectron.configureCanvasDimensions(electronCanvas, e.target);
    displayHandler(displayArea);
}
export const signBtnHandler = async (displayArea, animationMode, e) => {
    redo = {};
    if (operationsObj.firstOperand === '.' || operationsObj.firstOperand === '') return
    if ((operationsObj.firstOperand !== '' && operationsObj.operation !== '') && operationsObj.secondOperand === '') return
    operationsObj.firstOperand !== '' && operationsObj.operation === '' ? operationsObj.firstOperand = convertToString(Number(operationsObj.firstOperand * -1)) : operationsObj.secondOperand = convertToString(Number(operationsObj.secondOperand * -1));
    const electronCanvas = document.getElementById('electrons-animate');
    if (animationMode && e.detail === 1) await animationsElectron.configureCanvasDimensions(electronCanvas, e.target);
    displayHandler(displayArea);
}
export const removeLast = (arr) => arr.splice(0, arr.length - 1);
export const undoBtnHandler = async (displayArea, resultArea, animationMode, e) => {
    redo = {};
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
    const electronCanvas = document.getElementById('electrons-animate');
    if (animationMode && e.detail === 1) await animationsElectron.configureCanvasDimensions(electronCanvas, e.target);
    displayHandler(displayArea);
}
// redo btn handler 
export const redoBtnHandler = async (displayArea, animationMode, e) => {
    for (const property in operationsObj) {
        const redoProp = Object.keys(redo)[0]
        if (property === redoProp) {
            operationsObj[property] = redo[redoProp];
            redo = {};
            const electronCanvas = document.getElementById('electrons-animate');
            if (animationMode && e.detail === 1) await animationsElectron.configureCanvasDimensions(electronCanvas, e.target);
            displayHandler(displayArea)
            return;
        }
    }
}