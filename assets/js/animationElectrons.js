import { getAdjustedPosition } from './animationOperations.js';
export const configureCanvasDimensions = async (canvas, btn) => {
    return new Promise((resolve) => {
        canvas.style.display = 'block';
        canvas.style.zIndex = 1;
        const body = document.getElementsByClassName('body')[0];
        const bodyArea = getAdjustedPosition(body);
        canvas.style.position = 'absolute';
        canvas.width = bodyArea.width;
        canvas.height = bodyArea.height;
        animateRightSet(canvas, btn, undefined, resolve);
    })
}
const animateRightSet = (canvas, btn, animateElectron, resolve) => {
    const ctx = canvas.getContext('2d');
    const calcContainer = document.getElementById('main-calc-con');
    const calcContainerArea = getAdjustedPosition(calcContainer);
    const rightX = calcContainerArea.right + 50;
    const btnArea = getAdjustedPosition(btn);
    const btnRight = btnArea.right;
    const btnTop = btnArea.top + btnArea.height / 2; 
    const distanceX = rightX - btnRight
    const animationStep = Math.round((distanceX / 30) * 100) / 100;
    requestAnimationFrame(() => animateRight(ctx, btnRight, animationStep, btnTop, rightX, calcContainerArea, canvas, btn, animateElectron, resolve))
}
const animateRight = (ctx, start, animationStep, y, rightX, calcContainerArea, canvas, btn, animateElectron, resolve) => {
    if (animateElectron) {
        if (Math.floor(start) >= Math.floor(rightX)) {
        const upY = calcContainerArea.top - 50;
        const distanceY = y - upY
        animationStep = Math.round((distanceY / 30) * 100) / 100;
        requestAnimationFrame(() => animateUp(ctx, start, animationStep, y, upY, calcContainerArea, canvas, btn, animateElectron, resolve))
            return
        }
        ctx.beginPath();
        ctx.arc(start, y, 10, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = 'gold';
        ctx.fill();
        ctx.closePath();
        ctx.clearRect(start - 7.5, y - 11, 30, 30)
        start += animationStep;
        requestAnimationFrame(() => animateRight(ctx, start, animationStep, y, rightX, calcContainerArea, canvas, btn, animateElectron, resolve))
        return
    }
    if (Math.floor(start) >= Math.floor(rightX)) {
        const upY = calcContainerArea.top - 50;
        const distanceY = y - upY
        animationStep = Math.round((distanceY / 30) * 100) / 100;
        requestAnimationFrame(() => animateUp(ctx, start, animationStep, y, upY, calcContainerArea, canvas, btn, animateElectron, resolve))
        return
    }
    ctx.beginPath();
    ctx.lineTo(start, y),
    ctx.lineTo(start + animationStep, y);
    ctx.stroke();
    ctx.closePath();
    start += animationStep
    requestAnimationFrame(() => animateRight(ctx, start, animationStep, y, rightX, calcContainerArea, canvas, btn, animateElectron, resolve))
}
const animateUp = (ctx, x, animationStep, start, upY, calcContainerArea, canvas, btn, animateElectron, resolve) => {
    if (animateElectron) {
        if (Math.floor(start) <= Math.floor(upY)) {
            ctx.clearRect(x - 11, start - 11, 40, 30)
            const leftX = calcContainerArea.left + ((calcContainerArea.right - calcContainerArea.left) / 2);
            const distanceX = x - leftX
            animationStep = Math.round((distanceX / 30) * 100) / 100;
            requestAnimationFrame(() => animateLeft(ctx, x, animationStep, start, leftX, calcContainerArea, canvas, btn, animateElectron, resolve))
            return
        }
        ctx.clearRect(x - 11, start - 11, 40, 30)
        ctx.beginPath();
        ctx.arc(x, start, 10, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = 'gold';
        ctx.fill();
        ctx.closePath();
        start -= animationStep
        requestAnimationFrame(() => animateUp(ctx, x, animationStep, start, upY, calcContainerArea, canvas, btn, animateElectron, resolve))
        return
    }
    if (Math.floor(start) <= Math.floor(upY)) {
        const leftX = calcContainerArea.left + ((calcContainerArea.right - calcContainerArea.left) / 2);
        const distanceX = x - leftX
        animationStep = Math.round((distanceX / 30) * 100) / 100;
        requestAnimationFrame(() => animateLeft(ctx, x, animationStep, start, leftX, calcContainerArea, canvas, btn, animateElectron, resolve))
        return
    }
    ctx.beginPath();
    ctx.lineTo(x, start);
    ctx.lineTo(x, start - animationStep)
    ctx.stroke();
    ctx.closePath();
    start -= animationStep
    requestAnimationFrame(() => animateUp(ctx, x, animationStep, start, upY, calcContainerArea, canvas, btn, animateElectron, resolve) )
}
const animateLeft = (ctx, start, animationStep, y, leftX, calcContainerArea, canvas, btn, animateElectron, resolve) => {
    if (animateElectron) {
        if (Math.floor(start) <= Math.floor(leftX)) {
        ctx.clearRect(start - 5, y - 11, 30, 18)
        const displayArea = document.getElementById('display-area');
        const displayAreaBox = getAdjustedPosition(displayArea);
        const bottomY = displayAreaBox.top - 20;
        const distanceY = y - bottomY
        animationStep = Math.round((distanceY / 30) * 100) / 100;
        requestAnimationFrame(() => animateBottom(ctx, start, animationStep, y, bottomY, calcContainerArea, canvas, btn, animateElectron, resolve))
        return
        }
        ctx.clearRect(start + 11, y - 11, 9 * 2, 9 * 2)
        ctx.beginPath();
        ctx.arc(start, y, 10, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = 'gold';
        ctx.fill();
        ctx.closePath();
        start -= animationStep
        requestAnimationFrame(() => animateLeft(ctx, start, animationStep, y, leftX, calcContainerArea, canvas, btn, animateElectron, resolve))
        return
    }
    if (Math.floor(start) <= Math.floor(leftX)) {
        const displayArea = document.getElementById('display-area');
        const displayAreaBox = getAdjustedPosition(displayArea);
        const bottomY = displayAreaBox.top - 20;
        const distanceY = y - bottomY
        animationStep = Math.round((distanceY / 30) * 100) / 100;
        requestAnimationFrame(() => animateBottom(ctx, start, animationStep, y, bottomY, calcContainerArea, canvas, btn, animateElectron, resolve))
        return
    }
    ctx.beginPath();
    ctx.lineTo(start, y);
    ctx.lineTo(start - animationStep, y)
    ctx.stroke();
    ctx.closePath();
    start -= animationStep
    requestAnimationFrame(() => animateLeft(ctx, start, animationStep, y, leftX, calcContainerArea, canvas, btn, animateElectron, resolve))
}
const animateBottom = (ctx, x, animationStep, start, bottomY, calcContainerArea, canvas, btn, animateElectron, resolve) => {
    if (animateElectron) {
        if (Math.floor(start) >= Math.floor(bottomY)) {
        setTimeout(() => {
            canvas.style.display = '';
            canvas.style.zIndex = '';
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            resolve();
        }, 1000 * 1);
        return
        }
        ctx.clearRect(x - 11, start - 11, 35, 35)
        ctx.beginPath();
        ctx.arc(x, start, 10, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = 'gold';
        ctx.fill();
        ctx.closePath();
        start -= animationStep
        requestAnimationFrame(() => animateBottom(ctx, x, animationStep, start, bottomY, calcContainerArea, canvas, btn, animateElectron, resolve))
        return
    }
    if (Math.floor(start) >= Math.floor(bottomY)) {
        animateRightSet(canvas, btn, true, resolve)
        return
    }
    ctx.beginPath();
    ctx.lineTo(x, start);
    ctx.lineTo(x, start - animationStep)
    ctx.stroke();
    ctx.closePath();
    start -= animationStep
    requestAnimationFrame(() => animateBottom(ctx, x, animationStep, start, bottomY, calcContainerArea, canvas, btn, animateElectron, resolve))
}