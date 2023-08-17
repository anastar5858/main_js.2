export const executeShortcut = (e) => {
    if ( e.key === 'Delete') document.getElementById('clear-btn').click();
    if ( e.key === '.') document.getElementById('decimal-btn').click();
    if ( e.key === '-') document.getElementById('sign-change-btn').click();
    if ( e.key === 'Backspace') document.getElementById('undo-btn').click();
    if ( e.key === '#') document.getElementById('redo-btn').click();
    if ( e.key === 'a') document.getElementById('add').click();
    if ( e.key === 's') document.getElementById('sub').click();
    if ( e.key === 'q') document.getElementById('div').click();
    if ( e.key === 'w') document.getElementById('mul').click();
    if ( e.key === '=') document.getElementById('equal-btn').click();
    if ( e.key === '1') document.getElementsByClassName('btn-numbers')[0].click();
    if ( e.key === '2') document.getElementsByClassName('btn-numbers')[1].click();
    if ( e.key === '3') document.getElementsByClassName('btn-numbers')[2].click();
    if ( e.key === '4') document.getElementsByClassName('btn-numbers')[3].click();
    if ( e.key === '5') document.getElementsByClassName('btn-numbers')[4].click();
    if ( e.key === '6') document.getElementsByClassName('btn-numbers')[5].click();
    if ( e.key === '7') document.getElementsByClassName('btn-numbers')[6].click();
    if ( e.key === '8') document.getElementsByClassName('btn-numbers')[7].click();
    if ( e.key === '9') document.getElementsByClassName('btn-numbers')[8].click();
    if ( e.key === '0') document.getElementsByClassName('btn-numbers')[9].click();
}