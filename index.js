import * as darkMode from './assets/js/dark.js';
import * as logicHandlers from './assets/js/logic.js';
import * as keyboardFuncNav from './assets/js/keyboardNav.js';
import * as keyboardFuncShort from './assets/js/keyboardShort.js';
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
const displayArea = document.getElementById('display-area');
const numberBtns = [...document.getElementsByClassName('btn-numbers')];
numberBtns.forEach((nmbrBtn) => nmbrBtn.addEventListener('click', (e) => logicHandlers.numberBtnsHandler(e, displayArea, animationMode)));
const operationsBtns = [...document.getElementsByClassName('operator')];
const resultArea = document.getElementById('results-area');
operationsBtns.forEach((operationBtn) => operationBtn.addEventListener('click', (e) => logicHandlers.operationBtnsHandler(e, displayArea, resultArea, animationMode)))
const equalBtn = document.getElementById('equal-btn');
equalBtn.addEventListener('click', (e) => logicHandlers.equalBtnHandler(displayArea, resultArea, undefined, animationMode, e));
const clearBtn = document.getElementById('clear-btn');
clearBtn.addEventListener('click', (e) => logicHandlers.clearCalc(displayArea, resultArea, animationMode, e));
const decimalBtn = document.getElementById('decimal-btn');
decimalBtn.addEventListener('click', (e) => logicHandlers.decimalHandler(displayArea, animationMode, e));
const signChangeBtn = document.getElementById('sign-change-btn');
signChangeBtn.addEventListener('click', (e) => logicHandlers.signBtnHandler(displayArea, animationMode, e));
const undoBtn = document.getElementById('undo-btn');
undoBtn.addEventListener('click', (e) => logicHandlers.undoBtnHandler(displayArea, resultArea, animationMode, e));
const redoBtn = document.getElementById('redo-btn');
redoBtn.addEventListener('click', (e) => logicHandlers.redoBtnHandler(displayArea, animationMode, e));
const btnCuts = [...document.getElementsByClassName('btn-cut')];
const vitalButtons = document.getElementsByClassName('btn-vital')
keyboardFuncNav.navigationFacilitator(numberBtns, btnCuts, vitalButtons);
window.addEventListener('keyup', keyboardFuncShort.executeShortcut)
const detailsElement = document.getElementById('keyboard-instructions');
const mainCalcContainer = document.getElementById('main-calc-con');
detailsElement.addEventListener('toggle', (e) => {
    e.target.open ? mainCalcContainer.classList.add('invisible-calc') :mainCalcContainer.classList.remove('invisible-calc');
});
const allBtns = document.querySelectorAll('button');
const allBtnsArr = [...allBtns];
allBtns.forEach((btn) => btn.addEventListener('click', () => {
    const children = document.getElementsByClassName('animation-box');
    if (children.length > 0) logicHandlers.removeAnimationElements([...children]);
}))