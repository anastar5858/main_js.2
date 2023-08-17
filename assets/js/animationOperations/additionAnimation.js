import { getAdjustedPosition } from '../animationOperations.js';
export const prepareAddOperation = (firstOperand, secondOperand, resolve) => {
    if (Number(firstOperand) < 0 || Number(secondOperand) < 0 || firstOperand.includes('.') || secondOperand.includes('.')) {
        const electronCanvas = document.getElementById('electrons-animate');
        electronCanvas.style.display = 'none';
        electronCanvas.style.zIndex = '';
        return resolve(false);
    } 
    if (Number(firstOperand) + Number(secondOperand) > 10) {
        const electronCanvas = document.getElementById('electrons-animate');
        electronCanvas.style.display = 'none';
        electronCanvas.style.zIndex = '';
        return resolve(false);
    } 
    const resultArea = document.getElementById('results-area');
    resultArea.textContent = '';
    let lastBox;
    const displayArea = document.getElementById('display-area');
    displayArea.style.display = 'flex'
    displayArea.textContent = '';
    for (let i = 0; i < firstOperand; i++) {
        const box = document.createElement('div');
        box.classList.add('animation-box')
        displayArea.appendChild(box)
        if (i === firstOperand - 1) lastBox = box;
    }
    const msgPara = document.getElementById('animationMessage');
    msgPara.style.display = 'block'
    const displayAreaBox = getAdjustedPosition(displayArea);
    msgPara.style.position = 'absolute';
    msgPara.style.top = displayAreaBox.top + 'px';
    msgPara.textContent = 'Lets go to the battlefield!!';
    setTimeout(() => requestAnimationFrame(() => additionAnimation(msgPara, lastBox, firstOperand, secondOperand, resolve)), 1000 * 1);
}
const additionAnimation = async (msgPara, lastBox, firstOperand, secondOperand, resolve) => {
    let count = 0;
    while(count < secondOperand) {
        const box = document.createElement('div');
        box.classList.add('animation-box');
        const body = document.getElementsByClassName('body')[0];
        const bodyBox = getAdjustedPosition(body);
        box.style.position = 'absolute';
        box.style.left = bodyBox.width/2
        box.style.top = bodyBox.top;
        body.appendChild(box);
        const stepAnimation = await addAnimationStep(msgPara, lastBox, box)
        lastBox = box;
        count++
    }
    msgPara.textContent = 'we are a bit off but ready to move (this is the result)';
    setTimeout(() => {
        const electronCanvas = document.getElementById('electrons-animate');
        electronCanvas.style.display = 'none';
        electronCanvas.style.zIndex = '';
        resolve(true);
    }, 1000 * 1);
}
const addAnimationStep = async(msgPara, lastBox, currentBox) => {
    return new Promise(async (resolve) => {
        msgPara.textContent = 'Wait for me Ya All!'
        const currentBoxBox = getAdjustedPosition(currentBox);
        const lastBoxBox = getAdjustedPosition(lastBox);
        const targetY = lastBoxBox.top ;
        const targetX = lastBoxBox.right;
        const stepY = targetY / 100;
        const stepX = targetX / 100;
        let upOrBottom = currentBoxBox.top - targetY < 0 ? 'bottom' : 'top';
        let leftOrRight = currentBoxBox.left - targetX < 0 ? 'right' : 'left';
        const stepAnimation = await moveBox(msgPara, currentBox, stepX, stepY, targetX, targetY, undefined, upOrBottom, leftOrRight)
        resolve()
    })
}
const moveBox = async(msgPara, currentBox, stepX, stepY, distanceX, distanceY, resolve2, upOrBottom, leftOrRight) => {
    return new Promise((resolve) => {
        if (resolve2 === undefined) resolve2 = resolve
        const currentTop = Number(getComputedStyle(currentBox).top.split('').filter((c) => !isNaN(c) || c== '.').join(''));
        const currentLeft = Number(getComputedStyle(currentBox).left.split('').filter((c) => !isNaN(c) || c== '.').join(''));
        const currentBoxBox = getAdjustedPosition(currentBox);
        if (currentTop > distanceY && currentLeft < distanceX) {
            resolve2();
            return
        }
        if (currentTop > distanceY && currentLeft > distanceX) {
            resolve2();
            return
        }
        if (upOrBottom === 'bottom') {
            if (currentTop < distanceY) currentBox.style.top = (currentTop + stepY) + 'px';
        }
        if (leftOrRight === 'left') {
            if (currentLeft > distanceX) currentBox.style.left = (currentLeft - stepX)  + 'px';
        }
        if (leftOrRight === 'right') {
            if (currentLeft < distanceX) currentBox.style.left = (currentLeft + stepX)  + 'px';
        }
        msgPara.style.top = currentBoxBox.top + 'px';
        msgPara.style.left = currentBoxBox.left + 'px';
        requestAnimationFrame(() => moveBox(msgPara, currentBox, stepX, stepY, distanceX, distanceY, resolve2, upOrBottom, leftOrRight))
    })
}