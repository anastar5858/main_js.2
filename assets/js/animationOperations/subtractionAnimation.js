import { getAdjustedPosition } from '../animationOperations.js';
export const prepareSubOperation = (firstOperand, secondOperand, mainResolve) => {
    document.getElementById('animaion-msg').style.display = 'block';
    if (Number(firstOperand) > 5 || Number(secondOperand) > 5) {
        const electronCanvas = document.getElementById('electrons-animate');
        electronCanvas.style.display = 'none';
        electronCanvas.style.zIndex = '';
        document.getElementById('animaion-msg').style.display = 'none';
        return mainResolve(false);
    } 
    if (Number(firstOperand) < 0 || Number(secondOperand) < 0 || secondOperand.includes('.') || firstOperand.includes('.')) {
        const electronCanvas = document.getElementById('electrons-animate');
        electronCanvas.style.display = 'none';
        electronCanvas.style.zIndex = '';
        document.getElementById('animaion-msg').style.display = 'none';
        return mainResolve(false);
    }     
    if (Number(firstOperand) < Number(secondOperand)) {
        const electronCanvas = document.getElementById('electrons-animate');
        electronCanvas.style.display = 'none';
        electronCanvas.style.zIndex = '';
        document.getElementById('animaion-msg').style.display = 'none';
        return mainResolve(false);
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
    msgPara.textContent = 'Lets go for a swim fishes';
    setTimeout(() => requestAnimationFrame(() => subtractionAnimation(msgPara, lastBox, firstOperand, secondOperand, mainResolve)), 1000 * 1);
}
const subtractionAnimation = async (msgPara, lastBox, firstOperand, secondOperand, mainResolve) => {
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
        const stepAnimation = await subtractAnimationStep(msgPara, lastBox, box)
        box.remove();
        lastBox.remove();
        const children = document.getElementById('display-area').children
        lastBox = children[children.length - 1];
        count++
    }
    const displayArea = document.getElementById('display-area');
    const displayAreaBox = getAdjustedPosition(displayArea);
    msgPara.textContent = 'This is what\'s left (result)'
    msgPara.style.top = displayAreaBox.top;
    msgPara.style.left = displayAreaBox.left;
    setTimeout(() => {
        const electronCanvas = document.getElementById('electrons-animate');
        electronCanvas.style.display = 'none';
        electronCanvas.style.zIndex = '';
        document.getElementById('animaion-msg').style.display = 'none';
        mainResolve(true);
    } , 1000 * 1)
}
const subtractAnimationStep = async (msgPara, lastBox, box) => {
    return new Promise(async (resolve) => {
        const electronCanvas = document.getElementById('electrons-animate');
        const body = document.getElementsByClassName('body')[0];
        const bodyArea = getAdjustedPosition(body);
        electronCanvas.style.position = 'absolute';
        electronCanvas.width = bodyArea.width;
        electronCanvas.height = bodyArea.height;
        const ctx = electronCanvas.getContext('2d');
        const boxBox = getAdjustedPosition(box);
        msgPara.style.top = boxBox.top + 'px';
        msgPara.style.left = boxBox.left + 'px';
        msgPara.textContent = 'I will start fishing';
        const lastBoxBox = getAdjustedPosition(lastBox);
        const startBottom = boxBox.right;
        const finishBottom = lastBoxBox.top;
        const currentBottom = boxBox.top
        const stepBottom = finishBottom / 100;
        const bottomAnimation = await animateBottomSub(startBottom, finishBottom, stepBottom, undefined, ctx, currentBottom);
        const startLeft = bottomAnimation;
        const finishLeft = lastBoxBox.right;
        const currentLeft = startBottom
        const stepLeft = finishLeft / 100;
        const leftAnimation = await animateLeftSub(startLeft, finishLeft, stepLeft, undefined, ctx, currentLeft);
        msgPara.textContent = 'Caught a fish';
        const pageOffset = getAdjustedPosition(document.getElementById('calc-top')).top - bodyArea.top;
        const leftDistance = lastBoxBox.left - getAdjustedPosition(document.getElementById('calc-top')).left;
        const rightDistance = (boxBox.right - getAdjustedPosition(document.getElementById('calc-top')).left) - leftDistance;
        const rightStep = rightDistance / 100;
        lastBox.style.position = "absolute";
        const rightMovement = await moveRightSubtract(rightStep, rightDistance, leftDistance, lastBox, true, undefined, undefined);
        msgPara.style.top = lastBoxBox.top + 'px';
        const topDistanceCalcBox = Math.abs(getAdjustedPosition(document.getElementById('calc-top')).top - boxBox.top);
        const topDistanceCalcDiv = Math.abs(getAdjustedPosition(document.getElementById('calc-top')).top - lastBoxBox.top);
        const totalTop = topDistanceCalcBox + topDistanceCalcDiv;
        const topStart = lastBoxBox.top - pageOffset;
        const topStep = totalTop / 100;
        const upMovement = await moveUpSubtracts(topStart, topStep, totalTop, lastBox, true, undefined, undefined, msgPara);
        resolve();
    })
}
const moveUpSubtracts = (topStart, topStep, totalTop, lastBox, captureStep, stepSize, thisResolve, msgPara, msgParaStart) => {
    msgPara.textContent = 'NOOOOOOOO!!!!'
    if (captureStep) {
        msgParaStart = Number(getComputedStyle(msgPara).top.split('').filter((c) => !isNaN(c) || c== '.').join(''));
        stepSize = topStep
        captureStep = false;
    }
    return new Promise((resolve) => {
        if (topStep > totalTop) return thisResolve()
        if (thisResolve === undefined) thisResolve = resolve;
        lastBox.style.top = `calc(${(topStart) - (topStep) + 'px'} - 0.5rem)`;
        msgPara.style.top = msgParaStart - topStep + 'px';
        topStep += stepSize;
        requestAnimationFrame(() => moveUpSubtracts(topStart, topStep, totalTop, lastBox, captureStep, stepSize, thisResolve, msgPara, msgParaStart));
    })
}
const moveRightSubtract = async (rightStep, rightDistance, leftDistance, lastBox, captureStep, stepSize, thisResolve) => {
    if (captureStep) {
        stepSize = rightStep
        captureStep = false;
    }
    return new Promise((resolve) => {
        if (thisResolve === undefined) thisResolve = resolve;
        if (rightStep > rightDistance) return thisResolve()
        lastBox.style.left = `calc(${(0 + leftDistance) + rightStep + 'px'} - 0.5rem)`;
        rightStep += stepSize;
        requestAnimationFrame(() => moveRightSubtract(rightStep, rightDistance, leftDistance, lastBox, captureStep, stepSize, thisResolve));
    })
}
const animateBottomSub = async (startBottom, finishBottom, stepBottom, thisResolve, ctx, currentBottom) => {
    return new Promise((resolve) => {
        if (currentBottom > finishBottom) return thisResolve(currentBottom)
        if (!thisResolve) thisResolve = resolve;
        ctx.beginPath();
        ctx.lineTo(startBottom, currentBottom);
        ctx.lineTo(startBottom, currentBottom + stepBottom);
        ctx.stroke();
        ctx.closePath();
        currentBottom += stepBottom
        requestAnimationFrame(() => animateBottomSub(startBottom, finishBottom, stepBottom, thisResolve, ctx, currentBottom))
    })
}
const animateLeftSub = (startLeft, finishLeft, stepLeft, thisResolve, ctx, currentLeft) => {
    return new Promise((resolve) => {
        if (currentLeft < finishLeft) return thisResolve()
        if (!thisResolve) thisResolve = resolve;
        ctx.beginPath();
        ctx.lineTo(currentLeft, startLeft);
        ctx.lineTo(currentLeft - stepLeft, startLeft);
        ctx.stroke();
        ctx.closePath();
        currentLeft -= stepLeft
        requestAnimationFrame(() => animateLeftSub(startLeft, finishLeft, stepLeft, thisResolve, ctx, currentLeft))
    })
}