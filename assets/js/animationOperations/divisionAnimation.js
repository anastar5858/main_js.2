import { getAdjustedPosition } from '../animationOperations.js';
// Division animations *******************
export const prepareDivOperation = (firstOperand, secondOperand, mainResolve) => {
    // restrection: negative numbers
    // decimal numbers or second operator bigger than first
    if (Number(firstOperand) < 0 || Number(secondOperand) < 0 || secondOperand.includes('.') || firstOperand.includes('.')) {
        const electronCanvas = document.getElementById('electrons-animate');
        electronCanvas.style.display = 'none';
        electronCanvas.style.zIndex = '';
        return mainResolve(false);
    }
    if (Number(secondOperand) > Number(firstOperand)) {
        const electronCanvas = document.getElementById('electrons-animate');
        electronCanvas.style.display = 'none';
        electronCanvas.style.zIndex = '';
        return mainResolve(false);
    }
    if (Number(firstOperand) > 7) {
        const electronCanvas = document.getElementById('electrons-animate');
        electronCanvas.style.display = 'none';
        electronCanvas.style.zIndex = '';
        return mainResolve(false);
    }
    // clear result area
    const resultArea = document.getElementById('results-area');
    resultArea.textContent = '';
    // prepare display area boxes
    const displayArea = document.getElementById('display-area');
    displayArea.style.display = 'flex'
    displayArea.textContent = '';
    for (let i = 0; i < firstOperand; i++) {
        const box = document.createElement('div');
        box.classList.add('animation-box')
        displayArea.appendChild(box)
    }
    // start animation
    const msgPara = document.getElementById('animationMessage');
    msgPara.style.position = 'absolute';
    setTimeout(() => requestAnimationFrame(() => divisionAnimation(msgPara, firstOperand, secondOperand, mainResolve)), 1000 * 1);
}
const divisionAnimation = async (msgPara, firstOperand, secondOperand, mainResolve) => {
    // prepare divs of second operand at the top
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
    // if they are the same length stop
    if (firstOperand === secondOperand) {
        msgPara.style.display = 'block';
        const msgParaClone = msgPara.cloneNode(msgPara);
        msgPara.textContent = 'Never mind you guys are good';
        msgParaClone.textContent = 'Clean groups (result)'
        document.body.appendChild(msgParaClone);
        // main msg under the main div
        msgPara.style.top = divContainerBox.top + 'px';
        msgPara.style.left = divContainerBox.left + 'px';
        // result messag under group boxes
        const displayArea = document.getElementById('display-area');
        const displayAreaBox = getAdjustedPosition(displayArea);
        msgParaClone.style.top = displayAreaBox.top + 'px';
        msgParaClone.style.left = displayAreaBox.left + 'px';
        // remainder should be inside of calc-top
        const calcTop = document.getElementById('calc-top');
        setTimeout(() => {
            divContainer.remove();
            msgPara.style.display = 'none';
            mainResolve(true);
        }, 1000 * 1)
        return
    } else {
        msgPara.style.display = 'block';
        msgPara.textContent = 'The coach wants groups the same size as us';
        msgPara.style.top = divContainerBox.top + 'px';
        msgPara.style.left = divContainerBox.left + 'px';
        setTimeout(async () => {
            // start moving groups
            const displayArea = document.getElementById('display-area');
            const displayAreaBox = getAdjustedPosition(displayArea);
            const moveGroups = await moveGroupsTransform(divContainerBox, displayArea, secondOperand, firstOperand);
            setTimeout(() => {
                // clean inline styles
                const electronCanvas = document.getElementById('electrons-animate');
                electronCanvas.style.display = 'none';
                electronCanvas.style.zIndex = '';
                mainResolve(true);
            }, 1000 * 1)
        } , 1000 * 1)
    }
}
const moveGroupsTransform = async (divContainerBox, displayArea, secondOperand, firstOperand) => {
    const calcTop = document.getElementById('calc-top');
    return new Promise(async(resolve) => {
        const childrenDisplay = [...displayArea.children];
        while (childrenDisplay.length / secondOperand >= 1) {
            const currentGroup = childrenDisplay.splice(childrenDisplay.length - secondOperand, childrenDisplay.length);
            // move the group down to the end of the calc-top area
            const moveDown = await moveGroupDown(currentGroup, calcTop);
            // now create the group count div and move it to the right mid of the calc-top area
            const countDiv = await animateCountDiv(currentGroup, calcTop);
        }
        // remainders check here
        // move the remainder to the top edge animation
        // and put the msg
        if (childrenDisplay.length > 0) {
            const msgPara = document.getElementById('animationMessage');
            const calcTopBox = getAdjustedPosition(calcTop)
            msgPara.textContent = 'You left us **cryin';
            msgPara.style.top = (calcTopBox.height / 2) + 'px';
            msgPara.style.left = 0 + 'px';
            // move remainders to the top
            for (let i = childrenDisplay.length; i > 0; i--) {
                const moveTop = await moveRemaindersTopAnimation(childrenDisplay[i - 1], calcTopBox, msgPara, i, childrenDisplay.length);
            }
            // after remainders now move to start
            const groupDivs = [...document.getElementById('calc-top').children];
            const onlyAnimationDivs = groupDivs.filter((div) => div.classList.contains('animation-box'));
            for (const animationDiv of onlyAnimationDivs) {
                const animationDivBox = getAdjustedPosition(animationDiv);
                const animationDivBoxDiff = Math.abs(animationDivBox.left - calcTopBox.left);
                const stepSize = animationDivBoxDiff / 100;
                animationDiv.style.position = 'absolute'
                const individualDiff = Math.abs(animationDivBox.right - calcTopBox.right);
                const moveToDefault = await moveToStart(stepSize, animationDiv, animationDivBoxDiff, undefined, individualDiff)
            }
            // showcase the result message and resolve to true
            const msgParaClone = msgPara.cloneNode();
            calcTop.appendChild(msgParaClone);
            msgParaClone.style.top = calcTopBox.height / 2;
            msgParaClone.textContent = 'Clean groups (result)';
            resolve();
        } else {
            const msgPara = document.getElementById('animationMessage');
            const calcTopBox = getAdjustedPosition(calcTop)
            // after remainders now move to start
            const groupDivs = [...document.getElementById('calc-top').children];
            const onlyAnimationDivs = groupDivs.filter((div) => div.classList.contains('animation-box'));
            for (const animationDiv of onlyAnimationDivs) {
                const animationDivBox = getAdjustedPosition(animationDiv);
                const animationDivBoxDiff = Math.abs(animationDivBox.left - calcTopBox.left);
                const stepSize = animationDivBoxDiff / 100;
                animationDiv.style.position = 'absolute'
                const individualDiff = Math.abs(animationDivBox.right - calcTopBox.right);
                const moveToDefault = await moveToStart(stepSize, animationDiv, animationDivBoxDiff, undefined, individualDiff)
            }
            // showcase the result message and resolve to true
            const msgParaClone = msgPara.cloneNode();
            calcTop.appendChild(msgParaClone);
            msgPara.textContent = '';
            msgPara.style.display = '';
            msgPara.style.top = '';
            msgPara.style.left = '';
            msgParaClone.style.top = calcTopBox.height / 2;
            msgParaClone.textContent = 'Clean groups (result)';
            resolve();
        }
    })
}
const moveToStart = async (stepSize, animationDiv, animationDivBoxDiff, thisResolve, individualDiff) => {
    return new Promise((resolve) => {
        if (thisResolve === undefined) thisResolve = resolve
        if (animationDivBoxDiff < individualDiff) return thisResolve()
        animationDiv.style.left = `calc(${animationDivBoxDiff - stepSize + 'px'} - 0.5rem)`;
        animationDivBoxDiff = animationDivBoxDiff - stepSize
        requestAnimationFrame(() => moveToStart(stepSize, animationDiv, animationDivBoxDiff, thisResolve, individualDiff));
    })
}
const moveRemaindersTopAnimation = async (remainderDiv, calcTopBox, msgPara, i, childrenLength) => {
    return new Promise(async(resolve) => {
        const remainderDivBox = getAdjustedPosition(remainderDiv);
        const areaDifference = Math.abs((calcTopBox.top) - remainderDivBox.top);
        const areaDifferenceLeft = Math.abs((calcTopBox.left) - remainderDivBox.left);
        remainderDiv.style.position = 'absolute';
        remainderDiv.style.top = areaDifference + 'px';
        remainderDiv.style.left = `calc(${areaDifferenceLeft + 'px'})`;
        const stepSize = areaDifference / 100;
        const movementRemainder = await moveRemainder(areaDifference, stepSize, calcTopBox, remainderDiv, undefined, i, msgPara,childrenLength );
        resolve()
    })
}
const moveRemainder = (start, stepSize, calcTopBox, remainderDiv, thisResolve, i , msgPara, childrenLength) => {
    return new Promise((resolve) => {
        if (thisResolve === undefined) thisResolve = resolve
        if (start < 10) return thisResolve()
        remainderDiv.style.top = start - stepSize + 'px';
        if (i === 1) {
            msgPara.style.top = start - stepSize + 'px';
            msgPara.textContent = 'Remainders :('
        } 
        start -= stepSize
        requestAnimationFrame(() => moveRemainder(start, stepSize, calcTopBox, remainderDiv, thisResolve, i , msgPara, childrenLength))

    })
}
const animateCountDiv = async (currentGroup, calcTop) => {
    return new Promise((resolve) => {
        const groupDiv = document.createElement('div');
        groupDiv.classList.add('animation-box');
        calcTop.appendChild(groupDiv)
        resolve();
    })
}
const moveGroupDown = async (currentGroup, calcTop) => {
    return new Promise((resolve) => {
        const currentGroupArr = [...currentGroup];
        currentGroupArr.forEach( async (group, index) => {
            // move each to bottom
            const calcArea = Math.abs(getAdjustedPosition(calcTop).top - getAdjustedPosition(calcTop).bottom);
            const groupAreaLeft = await getAdjustedPosition(group).left;
            const calcLeftArea = await getAdjustedPosition(calcTop).left;
            const groupArea = groupAreaLeft - calcLeftArea 
            group.style.position = 'absolute';
            group.style.left = `calc(${groupArea + 'px'} - 0.5rem)`
            // group.style.top = calcArea + 'px';
            //now move in small steps
            const moveStep = calcArea / 100;
            const moveAnimation = await animationMovement(group, calcArea, moveStep, undefined, groupArea)
            if (index === (currentGroupArr.length - 1) && moveAnimation) resolve()
        })
    })
}
const animationMovement = async (group, calcArea, moveStep, thisResolve, groupArea) => {
    return new Promise((resolve) => {
        const msgPara = document.getElementById('animationMessage');
        msgPara.textContent = 'We will volunteer';
        const calcTop = document.getElementById('calc-top');
        calcTop.appendChild(msgPara);
        if (thisResolve === undefined) thisResolve = resolve;
        let currentTop = Number(getComputedStyle(group).top.split('').filter((c) => !isNaN(c) || c== '.').join(''));
        if (currentTop > calcArea) return thisResolve(true)
        group.style.top = currentTop + moveStep  + 'px';
        msgPara.style.left = `calc(${groupArea + 'px'} - 0.5rem)`
        msgPara.style.top = currentTop + moveStep  + 'px';
        requestAnimationFrame(() => animationMovement(group, calcArea, moveStep, thisResolve, groupArea)) 
    })
}