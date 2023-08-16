import * as darkMode from './assets/js/dark.js';
import * as logicHandlers from './assets/js/logic.js';
import * as keyboardFuncNav from './assets/js/keyboardNav.js';
import * as keyboardFuncShort from './assets/js/keyboardShort.js';
import * as animationsClear from './assets/js/animationClear.js';
import * as animationsElectron from './assets/js/animationElectrons.js';
import * as animationsOperations from './assets/js/animationOperations.js';
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
numberBtns.forEach((nmbrBtn) => nmbrBtn.addEventListener('click', (e) => logicHandlers.numberBtnsHandler(e, displayArea, animationMode)));
// operations btns
const operationsBtns = [...document.getElementsByClassName('operator')];
const resultArea = document.getElementById('results-area');
operationsBtns.forEach((operationBtn) => operationBtn.addEventListener('click', (e) => logicHandlers.operationBtnsHandler(e, displayArea, resultArea, animationMode)))
// equal btn
const equalBtn = document.getElementById('equal-btn');
equalBtn.addEventListener('click', (e) => logicHandlers.equalBtnHandler(displayArea, resultArea, undefined, animationMode, e));
// clear btn
const clearBtn = document.getElementById('clear-btn');
clearBtn.addEventListener('click', (e) => logicHandlers.clearCalc(displayArea, resultArea, animationMode, e));
// decimal btn
const decimalBtn = document.getElementById('decimal-btn');
decimalBtn.addEventListener('click', (e) => logicHandlers.decimalHandler(displayArea, animationMode, e));
// negative/plus switch btn
const signChangeBtn = document.getElementById('sign-change-btn');
signChangeBtn.addEventListener('click', (e) => logicHandlers.signBtnHandler(displayArea, animationMode, e));
// undo btn
const undoBtn = document.getElementById('undo-btn');
undoBtn.addEventListener('click', (e) => logicHandlers.undoBtnHandler(displayArea, resultArea, animationMode, e));
// redo btn
const redoBtn = document.getElementById('redo-btn');
redoBtn.addEventListener('click', (e) => logicHandlers.redoBtnHandler(displayArea, animationMode, e));
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
// subtraction animation
async function test() {
   const additionAnimation = await animationsOperations.initialiseAnimation('7', '/', '4');
   console.log('ummm', additionAnimation)
}
test()
// const allBtns = document.querySelectorAll('button');
// const allBtnsArr = [...allBtns];
// allBtns.forEach((btn) => btn.addEventListener('click', () => {
//     const children = document.getElementsByClassName('animation-box');
//     if (children.length > 0) logicHandlers.removeAnimationElements([...children]);
// }))