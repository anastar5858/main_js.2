const getAdjustedPosition = (element) => {
    const rect = element.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;
    return {
        top: rect.top + scrollY,
        left: rect.left + scrollX,
        right: rect.right + scrollX,
        bottom: rect.bottom + scrollY,
        width: rect.width,
        height: rect.height
    };
}
// above is helping funciton to account for scrolls
export const initialiseAnimation = async (firstOperand, operation, secondOperand) => {
    const electronCanvas = document.getElementById('electrons-animate');
    electronCanvas.style.display = 'block';
    electronCanvas.style.zIndex = 1;    
    return new Promise((resolve) => {
        if(operation === '+') return prepareAddOperation(firstOperand, secondOperand, resolve);
        if(operation === '-') return prepareSubOperation(firstOperand, secondOperand, resolve);
        if(operation === '/') return prepareDivOperation(firstOperand, secondOperand, resolve);
        electronCanvas.style.display = '';
        electronCanvas.style.zIndex = '';
        resolve(false);

    })
}
// Division animations *******************
const prepareDivOperation = (firstOperand, secondOperand, mainResolve) => {
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
            // currentGroup.forEach((group) => group.remove())
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
            console.log('no remainders');
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
// Subtraction animations *******************
const prepareSubOperation = (firstOperand, secondOperand, mainResolve) => {
    // subtraction restrictions: first operand should be bigger (easier animation)
    // no decimal points
    // no firstOperand or secondOpearnd bigger than 5
    if (Number(firstOperand) > 5 || Number(secondOperand) > 5) {
        const electronCanvas = document.getElementById('electrons-animate');
        electronCanvas.style.display = 'none';
        electronCanvas.style.zIndex = '';
        return mainResolve(false);
    } 
    if (Number(firstOperand) < 0 || Number(secondOperand) < 0 || secondOperand.includes('.') || firstOperand.includes('.')) {
        const electronCanvas = document.getElementById('electrons-animate');
        electronCanvas.style.display = 'none';
        electronCanvas.style.zIndex = '';
        return mainResolve(false);
    }     
    if (Number(firstOperand) < Number(secondOperand)) {
        const electronCanvas = document.getElementById('electrons-animate');
        electronCanvas.style.display = 'none';
        electronCanvas.style.zIndex = '';
        return mainResolve(false);
    } 
    // clear result area
    const resultArea = document.getElementById('results-area');
    resultArea.textContent = '';
    // last box used fot reference later
    let lastBox;
    // the display area gets populated with boxes
    // boxes dimensions 1rem * 1rem and 0.5 rem gap
    const displayArea = document.getElementById('display-area');
    displayArea.style.display = 'flex'
    displayArea.textContent = '';
    for (let i = 0; i < firstOperand; i++) {
        const box = document.createElement('div');
        box.classList.add('animation-box')
        displayArea.appendChild(box)
        if (i === firstOperand - 1) lastBox = box;
    }
    // show the starting message
    const msgPara = document.getElementById('animationMessage');
    msgPara.style.display = 'block'
    const displayAreaBox = getAdjustedPosition(displayArea);
    msgPara.style.position = 'absolute';
    msgPara.style.top = displayAreaBox.top + 'px';
    msgPara.textContent = 'Lets go for a swim fishes';
    // now begin the subtraction animation
    setTimeout(() => requestAnimationFrame(() => subtractionAnimation(msgPara, lastBox, firstOperand, secondOperand, mainResolve)), 1000 * 1);
}
const subtractionAnimation = async (msgPara, lastBox, firstOperand, secondOperand, mainResolve) => {
    let count = 0;
    while(count < secondOperand) {
        // perform animation step
        const box = document.createElement('div');
        box.classList.add('animation-box');
        // put the box at the top of the body
        const body = document.getElementsByClassName('body')[0];
        const bodyBox = getAdjustedPosition(body);
        box.style.position = 'absolute';
        box.style.left = bodyBox.width/2
        box.style.top = bodyBox.top;
        body.appendChild(box);
        const stepAnimation = await subtractAnimationStep(msgPara, lastBox, box)
        // clean up resources
        // remove the two boxes
        box.remove();
        lastBox.remove();
        // update last box as well (last child of display area)
        const children = document.getElementById('display-area').children
        lastBox = children[children.length - 1];
        count++
    }
    // after animation is complete
    const displayArea = document.getElementById('display-area');
    const displayAreaBox = getAdjustedPosition(displayArea);
    msgPara.textContent = 'This is what\'s left (result)'
    msgPara.style.top = displayAreaBox.top;
    msgPara.style.left = displayAreaBox.left;
    setTimeout(() => {
        // clean inline styles
        const electronCanvas = document.getElementById('electrons-animate');
        electronCanvas.style.display = 'none';
        electronCanvas.style.zIndex = '';
        mainResolve(true);
    } , 1000 * 1)
}
const subtractAnimationStep = async (msgPara, lastBox, box) => {
    return new Promise(async (resolve) => {
        // link the fishing rope with the lastbox (use electron canvas)
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
        // now move slowly bottom then right
        // bottom
        const startBottom = boxBox.right;
        const finishBottom = lastBoxBox.top;
        const currentBottom = boxBox.top
        const stepBottom = finishBottom / 100;
        const bottomAnimation = await animateBottomSub(startBottom, finishBottom, stepBottom, undefined, ctx, currentBottom);
        // left
        const startLeft = bottomAnimation;
        const finishLeft = lastBoxBox.right;
        const currentLeft = startBottom
        const stepLeft = finishLeft / 100;
        const leftAnimation = await animateLeftSub(startLeft, finishLeft, stepLeft, undefined, ctx, currentLeft);
        // working from down here
        msgPara.textContent = 'Caught a fish';
        // now time to move the box (fish) to the top div (hunter)
        // Set the position of the child element relative to the document
        const pageOffset = getAdjustedPosition(document.getElementById('calc-top')).top - bodyArea.top;
        const leftDistance = lastBoxBox.left - getAdjustedPosition(document.getElementById('calc-top')).left;
        const rightDistance = (boxBox.right - getAdjustedPosition(document.getElementById('calc-top')).left) - leftDistance;
        const rightStep = rightDistance / 100;
        lastBox.style.position = "absolute";
        // current position after absolute
        // top = `calc(${(lastBoxBox.top - pageOffset)}px - 0.5rem)`
        // left = `calc(${(0 + leftDistance ) + 'px'} - 0.5rem)`
        const rightMovement = await moveRightSubtract(rightStep, rightDistance, leftDistance, lastBox, true, undefined, undefined);
        msgPara.style.top = lastBoxBox.top + 'px';
        // now move up to the page end
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
        // if (rightStep > rightDistance) return thisResolve()
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
        // console.log(rightStep, stepSize)
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
// addition animations *******************
const prepareAddOperation = (firstOperand, secondOperand, resolve) => {
    // summing restrictions: no summations bigger than 10 for now
    // no negatives as they should be treated as subtraction
    // the retuns will be resolve(false) so that regular logic is performed
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
    // last box used fot reference later
    let lastBox;
    // the display area gets populated with boxes
    // boxes dimensions 1rem * 1rem and 0.5 rem gap
    const displayArea = document.getElementById('display-area');
    displayArea.style.display = 'flex'
    displayArea.textContent = '';
    for (let i = 0; i < firstOperand; i++) {
        const box = document.createElement('div');
        box.classList.add('animation-box')
        displayArea.appendChild(box)
        if (i === firstOperand - 1) lastBox = box;
    }
    // show the starting message
    const msgPara = document.getElementById('animationMessage');
    msgPara.style.display = 'block'
    const displayAreaBox = getAdjustedPosition(displayArea);
    msgPara.style.position = 'absolute';
    msgPara.style.top = displayAreaBox.top + 'px';
    msgPara.textContent = 'Lets go to the battlefield!!';
    // now begin the addition animation
    setTimeout(() => requestAnimationFrame(() => additionAnimation(msgPara, lastBox, firstOperand, secondOperand, resolve)), 1000 * 1);
}
const additionAnimation = async (msgPara, lastBox, firstOperand, secondOperand, resolve) => {
    let count = 0;
    while(count < secondOperand) {
        // perform animation step
        const box = document.createElement('div');
        box.classList.add('animation-box');
        // put the box at the top of the body
        const body = document.getElementsByClassName('body')[0];
        const bodyBox = getAdjustedPosition(body);
        box.style.position = 'absolute';
        box.style.left = bodyBox.width/2
        box.style.top = bodyBox.top;
        body.appendChild(box);
        const stepAnimation = await addAnimationStep(msgPara, lastBox, box)
        // update last box as well (last child of display are)
        lastBox = box;
        count++
    }
    // now display final result message
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
        // check for all direction
        // bottom and left direction
        console.log('reached here',currentLeft > distanceX );

        if (currentTop > distanceY && currentLeft < distanceX) {
            resolve2();
            return
        }
        // bottom and right direction
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