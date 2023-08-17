import * as additionAnimation from './animationOperations/additionAnimation.js';
import * as subtractionAnimation from './animationOperations/subtractionAnimation.js';
import * as divisionAnimation from './animationOperations/divisionAnimation.js';
import * as multiplicationAnimation from './animationOperations/multiplicationAnimation.js';
export const getAdjustedPosition = (element) => {
    const rect = element.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;
    return {
        top: rect.top + scrollY,
        left: rect.left + scrollX,
        right: rect.right + scrollX,
        bottom: rect.bottom + scrollY,
        width: rect.width,
        height: rect.height
    };
}
export const initialiseAnimation = async (firstOperand, operation, secondOperand) => {
    const electronCanvas = document.getElementById('electrons-animate');
    electronCanvas.style.display = 'block';
    electronCanvas.style.zIndex = 1;    
    return new Promise((resolve) => {
        if(operation === '+') additionAnimation.prepareAddOperation(firstOperand, secondOperand, resolve);
        if(operation === '-') subtractionAnimation.prepareSubOperation(firstOperand, secondOperand, resolve);
        if(operation === '/') divisionAnimation.prepareDivOperation(firstOperand, secondOperand, resolve);
        if(operation === '*') multiplicationAnimation.prepareMulOperation(firstOperand, secondOperand, resolve);
    })
}