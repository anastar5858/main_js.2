export const configureCanvasDimensions = (canvas, btn) => {
    const body = document.getElementsByClassName('body')[0];
    const bodyArea = body.getBoundingClientRect();
    canvas.style.position = 'absolute';
    canvas.width = bodyArea.width;
    canvas.height = bodyArea.height;
    btn = document.getElementById('decimal-btn')
    animateRightSet(canvas, btn);
}
const animateRightSet = (canvas, btn) => {
    const ctx = canvas.getContext('2d');
    // find area outside the calc area to the left
    const calcContainer = document.getElementById('main-calc-con');
    const calcContainerArea = calcContainer.getBoundingClientRect();
    // get an area to the right (5 is pixel offset)
    const rightX = calcContainerArea.right + 50;
    // move to the right from button right edge
    const btnArea = btn.getBoundingClientRect();
    const btnRight = btnArea.right;
    const btnTop = btnArea.top + btnArea.height / 2; 
    // now move slowly
    const distanceX = rightX - btnRight
    const animationStep = Math.round((distanceX / 30) * 100) / 100;
    // parameters: (canvas, starting steo (incremented), animation step (for stopping condition))
    requestAnimationFrame(() => animateRight(ctx, btnRight, animationStep, btnTop, rightX, calcContainerArea))
}
const animateRight = (ctx, start, animationStep, y, rightX, calcContainerArea) => {
    if (Math.floor(start) >= Math.floor(rightX)) {
        // now we would move up in the y direction
        const upY = calcContainerArea.top - 50;
        const distanceY = y - upY
        animationStep = Math.round((distanceY / 30) * 100) / 100;
        // now animate up
        requestAnimationFrame(() => animateUp(ctx, start, animationStep, y, upY, calcContainerArea))
        return
    }
    ctx.beginPath();
    ctx.lineTo(start, y),
    ctx.lineTo(start + animationStep, y);
    ctx.stroke();
    ctx.closePath();
    // update and animate
    start += animationStep
    requestAnimationFrame(() => animateRight(ctx, start, animationStep, y, rightX, calcContainerArea))
}

const animateUp = (ctx, x, animationStep, start, upY, calcContainerArea) => {
    if (Math.floor(start) <= Math.floor(upY)) {
        return
    }
    ctx.beginPath();
    ctx.lineTo(x, start);
    ctx.lineTo(x, start - animationStep)
    ctx.stroke();
    ctx.closePath();
    start -= animationStep
    requestAnimationFrame(() => animateUp(ctx, x, animationStep, start, upY, calcContainerArea) )
}