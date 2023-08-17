import { getAdjustedPosition } from '../animationOperations.js';
export const prepareMulOperation = (firstOperand, secondOperand, mainResolve) => {
    document.getElementById('animaion-msg').style.display = 'block';
    if (Number(firstOperand) < 0 || Number(secondOperand) < 0 || secondOperand.includes('.') || firstOperand.includes('.')) {
        const electronCanvas = document.getElementById('electrons-animate');
        electronCanvas.style.display = 'none';
        electronCanvas.style.zIndex = '';
        document.getElementById('animaion-msg').style.display = 'none';
        return mainResolve(false);
    }
    if (Number(secondOperand) > 3 || Number(firstOperand) > 3) {
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
    msgPara.style.position = 'absolute';
    setTimeout(() => requestAnimationFrame(() => multiplicationAnimation(msgPara, firstOperand, secondOperand, lastBox, mainResolve)), 1000 * 1);
}
const  multiplicationAnimation = async (msgPara, firstOperand, secondOperand, lastBox, mainResolv) => {
    const body = document.getElementsByClassName('body')[0];
    const bodyBox = getAdjustedPosition(body);
    const divContainer = document.getElementById('div-add-cont');
    divContainer.style.position = 'absolute';
    divContainer.style.top = bodyBox.top + 'px';
    divContainer.style.left = (bodyBox.width/2) + 'px';
    for (let i = 0; i < secondOperand; i++) {
        const div = document.createElement('div');
        div.classList.add('animation-box');
        divContainer.appendChild(div)
    }
    const divContainerBox = getAdjustedPosition(divContainer); 
    msgPara.style.display = 'block';
    msgPara.textContent = `You need to reproduce people the same number as yourselves ${secondOperand} times`;
    msgPara.style.top = divContainerBox.top + 'px';
    msgPara.style.left = divContainerBox.left + 'px';
    for(let i = 0; i < secondOperand - 1; i++) {
        for(let j = 0; j < firstOperand; j++) {
            const lastBoxBox = getAdjustedPosition(lastBox);
            const calcTop = document.getElementById('calc-top');
            const calcTopBox = getAdjustedPosition(calcTop);
            const offset = document.createElement('div');
            offset.classList.add('animation-box');
            calcTop.appendChild(offset);
            calcTop.appendChild(msgPara)
            offset.style.position = 'absolute'; 
            const start =  0 + calcTopBox.width;       
            offset.style.left = start + 'px';
            msgPara.textContent = `Reproducing from parent ${i + 1} child ${j + 1}`
            msgPara.style.left = start + 'px';
            const ending = Math.abs(calcTopBox.left) - lastBoxBox.right;
            const stepSize = ending / 50;
            const animateChild = await multiplyOffsetAnimate(start, ending, stepSize, offset, lastBoxBox, undefined, msgPara);
            lastBox = offset;
        }
    }
    setTimeout(() => {
        msgPara.textContent = `Production of offsets done`;
        const electronCanvas = document.getElementById('electrons-animate');
        electronCanvas.style.display = '';
        electronCanvas.style.zIndex = '';
        document.getElementById('animaion-msg').style.display = 'none';
        mainResolv(true);
    }, 1000 * 1);
}
const multiplyOffsetAnimate = (start, ending, stepSize, offset, lastBoxBox, thisResolve, msgPara) => {
    return new Promise((resolve) => {
        if (thisResolve === undefined) thisResolve = resolve
        if (start < (-stepSize * 50)) return thisResolve();
        offset.style.left = start - stepSize + 'px';
        msgPara.style.left = start - stepSize + 'px';
        start += stepSize;
        requestAnimationFrame(() => multiplyOffsetAnimate(start, ending, stepSize, offset, lastBoxBox, thisResolve, msgPara))
    })
}