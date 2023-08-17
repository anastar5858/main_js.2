export const navigationFacilitator = (numberBtns, btnCuts, vitalButtons) => {
    numberBtns.forEach((btn) => {
        btn.addEventListener('keyup', (e) => handleNavigationJumps(e, btnCuts))
        btn.addEventListener('keyup', (e) => handleNavigationNumbers(e, numberBtns))
    })
    const bitalBtnArrray = [...vitalButtons];
    bitalBtnArrray.forEach((vitalBtn) => vitalBtn.addEventListener('keyup', (e) => handleNavigationVital(e, vitalButtons, numberBtns)))
}
const handleNavigationJumps = (e, btnCuts) => {
    const numberText = e.target.textContent;
    const pressedKey = e.key;
    if ((numberText === '1' || numberText === '2' || numberText === '3') && pressedKey === 'ArrowUp') {
        btnCuts[0].focus();
    }
    if ((numberText === '1' || numberText === '4' || numberText === '7' || numberText === '0') && pressedKey === 'ArrowLeft') {
        btnCuts[1].focus();
    }
    if ((numberText === '3' || numberText === '6' || numberText === '9' || numberText === '0') && pressedKey === 'ArrowRight') {
        btnCuts[2].focus();
    }
    if (numberText === '0' && pressedKey === 'ArrowDown') {
        btnCuts[3].focus();
    }
}
const handleNavigationNumbers = (e, numberBtns) => {
    const targetindex = numberBtns.indexOf(e.target);
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
    if (e.target.textContent.trim() === 'clear' && e.key === 'ArrowDown') vitalButtons[1].focus();
    if ((e.target.textContent.startsWith('Sign') || e.target.textContent.startsWith('Decimal'))  && e.key === 'ArrowUp') vitalButtons[0].focus();
    if ((e.target.textContent.startsWith('Sign') || e.target.textContent.startsWith('Decimal'))  && e.key === 'ArrowDown') vitalButtons[3].focus();
    if (e.target.textContent.startsWith('Decimal')  && e.key === 'ArrowLeft') numberBtns[2].focus();
    if (e.target.textContent.startsWith('Sign')  && e.key === 'ArrowRight') numberBtns[0].focus();
    if (e.target.textContent === 'Redo' && e.key === 'ArrowRight') vitalButtons[vitalBtnsArray.indexOf(e.target) + 1].focus();
    if (e.target.textContent === 'Undo' && e.key === 'ArrowLeft') vitalButtons[vitalBtnsArray.indexOf(e.target) - 1].focus();
    if ((e.target.textContent === 'Undo' || e.target.textContent === 'Redo' ) && e.key === 'ArrowUp') numberBtns[numberBtns.length - 1].focus();
    if ((e.target.textContent === 'Undo' || e.target.textContent === 'Redo' ) && e.key === 'ArrowDown') vitalButtons[5].focus();
    if ((e.target.textContent === 'Add' || e.target.textContent === 'Subtract') && e.key === 'ArrowUp') vitalButtons[3].focus();
    if ((e.target.textContent === 'Add' || e.target.textContent === 'Subtract') && e.key === 'ArrowDown') vitalButtons[7].focus();
    if ((e.target.textContent === 'Divide' || e.target.textContent === 'Multiply') && e.key === 'ArrowUp') vitalButtons[5].focus();
    if ((e.target.textContent === 'Divide' || e.target.textContent === 'Multiply') && e.key === 'ArrowDown') vitalButtons[vitalBtnsArray.length - 1].focus();
    if (e.target.textContent === 'Add' && e.key === 'ArrowRight') vitalButtons[vitalBtnsArray.indexOf(e.target) + 1].focus();
    if (e.target.textContent === 'Divide' && e.key === 'ArrowRight') vitalButtons[vitalBtnsArray.indexOf(e.target) + 1].focus();
    if (e.target.textContent === 'Subtract' && e.key === 'ArrowLeft') vitalButtons[vitalBtnsArray.indexOf(e.target) - 1].focus();
    if (e.target.textContent === 'Multiply' && e.key === 'ArrowLeft') vitalButtons[vitalBtnsArray.indexOf(e.target)  - 1].focus();
    if (e.target.textContent === '=' && e.key === 'ArrowUp') vitalButtons[vitalButtons.length - 3].focus();
}