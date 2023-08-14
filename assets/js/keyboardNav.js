// navigation shortcuts
export const navigationFacilitator = (numberBtns, btnCuts, vitalButtons) => {
    numberBtns.forEach((btn) => {
        // handle jumps
        btn.addEventListener('keyup', (e) => handleNavigationJumps(e, btnCuts))
        // handle inner numbers navigations
        btn.addEventListener('keyup', (e) => handleNavigationNumbers(e, numberBtns))
    })
    const bitalBtnArrray = [...vitalButtons];
    bitalBtnArrray.forEach((vitalBtn) => vitalBtn.addEventListener('keyup', (e) => handleNavigationVital(e, vitalButtons, numberBtns)))
}
const handleNavigationJumps = (e, btnCuts) => {
    const numberText = e.target.textContent;
    const pressedKey = e.key;
    // 1,2,3 arrow up should go to clear button
    if ((numberText === '1' || numberText === '2' || numberText === '3') && pressedKey === 'ArrowUp') {
        btnCuts[0].focus();
    }
    // 1,4,7 arrow left should focus on sign
    if ((numberText === '1' || numberText === '4' || numberText === '7' || numberText === '0') && pressedKey === 'ArrowLeft') {
        btnCuts[1].focus();
    }
    // 3, 6, 9 arrow right should ofcus on decimal mode
    if ((numberText === '3' || numberText === '6' || numberText === '9' || numberText === '0') && pressedKey === 'ArrowRight') {
        btnCuts[2].focus();
    }
    // 0 arrow down should move to redo (then tab order is fine)
    if (numberText === '0' && pressedKey === 'ArrowDown') {
        btnCuts[3].focus();
    }
}
const handleNavigationNumbers = (e, numberBtns) => {
    const targetindex = numberBtns.indexOf(e.target);
    // up and down movement (zero special case)
    const nextDown = targetindex + 3;
    const nextUp = targetindex - 3;
    if (e.key === 'ArrowUp' && (e.target.textContent !== '0' && e.target.textContent !== '1') && (e.target.textContent !== '3' && e.target.textContent !== '2')) {
        numberBtns[nextUp].focus()
    } 
    if (e.key === 'ArrowUp' && e.target.textContent === '0') {
        numberBtns[numberBtns.length - 3].focus()
    }
    if (e.key === 'ArrowDown' && ((e.target.textContent !== '0' && e.target.textContent !== '8') && e.target.textContent !== '9')) {
        numberBtns[nextDown].focus()
    }
    if (e.key === 'ArrowDown' && (e.target.textContent === '8' || e.target.textContent === '9')) {
        numberBtns[numberBtns.length - 1].focus()
    }
    // right and left movement
    const nextRight = targetindex + 1;
    const nextLeft = targetindex - 1;
    if (e.key === 'ArrowRight' && ((e.target.textContent !== '3' && e.target.textContent !== '6') && (e.target.textContent !== '9' && e.target.textContent !== '0'))) {
        numberBtns[nextRight].focus()
    }
    if (e.key === 'ArrowLeft' && ((e.target.textContent !== '1' && e.target.textContent !== '4') && (e.target.textContent !== '7' && e.target.textContent !== '0'))) {
        numberBtns[nextLeft].focus()
    }
}
const handleNavigationVital = (e, vitalButtons, numberBtns) => {
    const vitalBtnsArray = [...vitalButtons]
    // clear button always go to sign button on arrow down
    if (e.target.textContent.trim() === 'clear' && e.key === 'ArrowDown') vitalButtons[1].focus();
    // both sign and decimal should go to clear on arrow up and redo on arrow down
    if ((e.target.textContent.startsWith('Sign') || e.target.textContent.startsWith('Decimal'))  && e.key === 'ArrowUp') vitalButtons[0].focus();
    if ((e.target.textContent.startsWith('Sign') || e.target.textContent.startsWith('Decimal'))  && e.key === 'ArrowDown') vitalButtons[3].focus();
    // sign should go to number one on arrow right and decimal to number 3
    if (e.target.textContent.startsWith('Decimal')  && e.key === 'ArrowLeft') numberBtns[2].focus();
    if (e.target.textContent.startsWith('Sign')  && e.key === 'ArrowRight') numberBtns[0].focus();
    // undo and redo 
    // undo to redo on left arrow and redo to undo on right arrow both go to zero on up arrow and to add operation on arrow down
    if (e.target.textContent === 'Redo' && e.key === 'ArrowRight') vitalButtons[vitalBtnsArray.indexOf(e.target) + 1].focus();
    if (e.target.textContent === 'Undo' && e.key === 'ArrowLeft') vitalButtons[vitalBtnsArray.indexOf(e.target) - 1].focus();
    if ((e.target.textContent === 'Undo' || e.target.textContent === 'Redo' ) && e.key === 'ArrowUp') numberBtns[numberBtns.length - 1].focus();
    if ((e.target.textContent === 'Undo' || e.target.textContent === 'Redo' ) && e.key === 'ArrowDown') vitalButtons[5].focus();
    // operations 
    // add and subtract up goes to redo
    if ((e.target.textContent === 'Add' || e.target.textContent === 'Subtract') && e.key === 'ArrowUp') vitalButtons[3].focus();
    // add and subtract down go to
    if ((e.target.textContent === 'Add' || e.target.textContent === 'Subtract') && e.key === 'ArrowDown') vitalButtons[7].focus();
    // divide and multiply up go to add
    if ((e.target.textContent === 'Divide' || e.target.textContent === 'Multiply') && e.key === 'ArrowUp') vitalButtons[5].focus();
    // divide and multiply down go to equal
    if ((e.target.textContent === 'Divide' || e.target.textContent === 'Multiply') && e.key === 'ArrowDown') vitalButtons[vitalBtnsArray.length - 1].focus();
    // now left and right should go to the next one (just like tab)
    if (e.target.textContent === 'Add' && e.key === 'ArrowRight') vitalButtons[vitalBtnsArray.indexOf(e.target) + 1].focus();
    if (e.target.textContent === 'Divide' && e.key === 'ArrowRight') vitalButtons[vitalBtnsArray.indexOf(e.target) + 1].focus();
    if (e.target.textContent === 'Subtract' && e.key === 'ArrowLeft') vitalButtons[vitalBtnsArray.indexOf(e.target) - 1].focus();
    if (e.target.textContent === 'Multiply' && e.key === 'ArrowLeft') vitalButtons[vitalBtnsArray.indexOf(e.target)  - 1].focus();
    // finally equal should go to divide on key up
    if (e.target.textContent === '=' && e.key === 'ArrowUp') vitalButtons[vitalButtons.length - 3].focus();
}