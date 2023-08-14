import * as darkMode from './assets/js/dark.js';
import * as logicHandlers from './assets/js/logic.js';
import * as keyboardFuncNav from './assets/js/keyboardNav.js';
import * as keyboardFuncShort from './assets/js/keyboardShort.js';
import * as animationsClear from './assets/js/animationClear.js';
import * as animationsElectron from './assets/js/animationElectrons.js';
// handle dark mode (logic independant) **
let animationMode = false;
const darkModeInput = document.getElementById('dark-mode');
const animationModeInput = document.getElementById('animation-mode');
const darkModeHandler = (e) => {
    e.target.checked ? darkMode.enableDarkMode() : darkMode.disableDarkMode();    
}
const animationModeHandler = (e) => {
    e.target.checked ? animationMode = true : animationMode = false;    
}
darkModeInput.addEventListener('change', darkModeHandler)
animationModeInput.addEventListener('change', animationModeHandler)
// handle calculator logic **
// event listeners on buttons ----->
// numbers buttons
const displayArea = document.getElementById('display-area');
const numberBtns = [...document.getElementsByClassName('btn-numbers')];
numberBtns.forEach((nmbrBtn) => nmbrBtn.addEventListener('click', (e) => logicHandlers.numberBtnsHandler(e.target.textContent, displayArea)));
// operations btns
const operationsBtns = [...document.getElementsByClassName('operator')];
const resultArea = document.getElementById('results-area');
operationsBtns.forEach((operationBtn) => operationBtn.addEventListener('click', (e) => logicHandlers.operationBtnsHandler(e.target.textContent, displayArea, resultArea)))
// equal btn
const equalBtn = document.getElementById('equal-btn');
equalBtn.addEventListener('click', (e) => logicHandlers.equalBtnHandler(displayArea, resultArea));
// clear btn
const clearBtn = document.getElementById('clear-btn');
clearBtn.addEventListener('click', () => logicHandlers.clearCalc(displayArea, resultArea, animationMode));
// decimal btn
const decimalBtn = document.getElementById('decimal-btn');
decimalBtn.addEventListener('click', () => logicHandlers.decimalHandler(displayArea));
// negative/plus switch btn
const signChangeBtn = document.getElementById('sign-change-btn');
signChangeBtn.addEventListener('click', () => logicHandlers.signBtnHandler(displayArea));
// undo btn
const undoBtn = document.getElementById('undo-btn');
undoBtn.addEventListener('click', () => logicHandlers.undoBtnHandler(displayArea, resultArea));
// redo btn
const redoBtn = document.getElementById('redo-btn');
redoBtn.addEventListener('click', () => logicHandlers.redoBtnHandler(displayArea));
// handle calculator keyboard functionality **
// keyboard navigation
const btnCuts = [...document.getElementsByClassName('btn-cut')];
const vitalButtons = document.getElementsByClassName('btn-vital')
keyboardFuncNav.navigationFacilitator(numberBtns, btnCuts, vitalButtons);
// keyboard shortcuts
window.addEventListener('keyup', keyboardFuncShort.executeShortcut)
// keyboard instructions
const detailsElement = document.getElementById('keyboard-instructions');
const mainCalcContainer = document.getElementById('main-calc-con');
detailsElement.addEventListener('toggle', (e) => {
    e.target.open ? mainCalcContainer.classList.add('invisible-calc') :mainCalcContainer.classList.remove('invisible-calc');
});
// animation mode (logic independant) **
// electrons animation
const electronCanvas = document.getElementById('electrons-animate');
animationsElectron.configureCanvasDimensions(electronCanvas);