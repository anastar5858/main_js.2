export const executeShortcut = (e) => {
    // clear btn
    if (e.ctrlKey && e.key === 'Delete') document.getElementById('clear-btn').click();
    // decimal btn
    if (e.ctrlKey && e.key === '.') document.getElementById('decimal-btn').click();
    // sign change btn
    if (e.ctrlKey && e.key === '-') document.getElementById('sign-change-btn').click();
    // undo btn
    if (e.ctrlKey && e.key === 'Backspace') document.getElementById('undo-btn').click();
    // redo btn
    if (e.ctrlKey && e.key === '#') document.getElementById('redo-btn').click();
    // add, sub, divide, multi
    if (e.shiftKey && e.key === 'A') document.getElementById('add').click();
    if (e.shiftKey && e.key === 'S') document.getElementById('sub').click();
    if (e.shiftKey && e.key === 'Q') document.getElementById('div').click();
    if (e.shiftKey && e.key === 'W') document.getElementById('mul').click();
    // equal
    if (e.shiftKey && e.key === '+') document.getElementById('equal-btn').click();
    // now numbers all with shift + number
    if (e.shiftKey && e.key === '!') document.getElementsByClassName('btn-numbers')[0].click();
    if (e.shiftKey && e.key === '"') document.getElementsByClassName('btn-numbers')[1].click();
    if (e.shiftKey && e.key === '£') document.getElementsByClassName('btn-numbers')[2].click();
    if (e.shiftKey && e.key === '$') document.getElementsByClassName('btn-numbers')[3].click();
    if (e.shiftKey && e.key === '%') document.getElementsByClassName('btn-numbers')[4].click();
    if (e.shiftKey && e.key === '^') document.getElementsByClassName('btn-numbers')[5].click();
    if (e.shiftKey && e.key === '&') document.getElementsByClassName('btn-numbers')[6].click();
    if (e.shiftKey && e.key === '*') document.getElementsByClassName('btn-numbers')[7].click();
    if (e.shiftKey && e.key === '(') document.getElementsByClassName('btn-numbers')[8].click();
    if (e.shiftKey && e.key === ')') document.getElementsByClassName('btn-numbers')[9].click();
}