export const configureCanvasDimensions = (canvas, btn) => {
    canvas.style.zIndex = 1;
    const body = document.getElementsByClassName('body')[0];
    const bodyArea = body.getBoundingClientRect();
    canvas.style.position = 'absolute';
    canvas.width = bodyArea.width;
    canvas.height = bodyArea.height;
    btn = document.getElementById('decimal-btn')
    animateRightSet(canvas, btn);
}
const animateRightSet = (canvas, btn, animateElectron) => {
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
    requestAnimationFrame(() => animateRight(ctx, btnRight, animationStep, btnTop, rightX, calcContainerArea, canvas, btn, animateElectron))
}
const animateRight = (ctx, start, animationStep, y, rightX, calcContainerArea, canvas, btn, animateElectron) => {
    if (animateElectron) {
        if (Math.floor(start) >= Math.floor(rightX)) {
            return
        }
        ctx.clearRect(start - 11, y - 11, 11 * 2, 11 * 2)
        // time to work on electron circle
        ctx.beginPath();
        ctx.arc(start, y, 10, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = 'gold';
        ctx.fill();
        ctx.closePath();
        start += animationStep
        requestAnimationFrame(() => animateRight(ctx, start, animationStep, y, rightX, calcContainerArea, canvas, btn, animateElectron))
        console.log(animateElectron);
        return
    }
    if (Math.floor(start) >= Math.floor(rightX)) {
        // now we would move up in the y direction
        const upY = calcContainerArea.top - 50;
        const distanceY = y - upY
        animationStep = Math.round((distanceY / 30) * 100) / 100;
        // now animate up
        requestAnimationFrame(() => animateUp(ctx, start, animationStep, y, upY, calcContainerArea, canvas, btn))
        return
    }
    ctx.beginPath();
    ctx.lineTo(start, y),
    ctx.lineTo(start + animationStep, y);
    ctx.stroke();
    ctx.closePath();
    // update and animate
    start += animationStep
    requestAnimationFrame(() => animateRight(ctx, start, animationStep, y, rightX, calcContainerArea, canvas, btn, animateElectron))
}

const animateUp = (ctx, x, animationStep, start, upY, calcContainerArea, canvas, btn) => {
    if (Math.floor(start) <= Math.floor(upY)) {
        // move left to mid poing of calc top edge
        const leftX = calcContainerArea.left + ((calcContainerArea.right - calcContainerArea.left) / 2);
        const distanceX = x - leftX
        animationStep = Math.round((distanceX / 30) * 100) / 100;
        requestAnimationFrame(() => animateLeft(ctx, x, animationStep, start, leftX, calcContainerArea, canvas, btn))
        return
    }
    ctx.beginPath();
    ctx.lineTo(x, start);
    ctx.lineTo(x, start - animationStep)
    ctx.stroke();
    ctx.closePath();
    start -= animationStep
    requestAnimationFrame(() => animateUp(ctx, x, animationStep, start, upY, calcContainerArea, canvas, btn) )
}
const animateLeft = (ctx, start, animationStep, y, leftX, calcContainerArea, canvas, btn) => {
    if (Math.floor(start) <= Math.floor(leftX)) {
        // now link to display
        const displayArea = document.getElementById('display-area');
        const displayAreaBox = displayArea.getBoundingClientRect();
        // now last lines animation
        const bottomY = displayAreaBox.top - 20;
        const distanceY = y - bottomY
        animationStep = Math.round((distanceY / 30) * 100) / 100;
        requestAnimationFrame(() => animateBottom(ctx, start, animationStep, y, bottomY, calcContainerArea, canvas, btn))

        return
    }
    ctx.beginPath();
    ctx.lineTo(start, y);
    ctx.lineTo(start - animationStep, y)
    ctx.stroke();
    ctx.closePath();
    start -= animationStep
    requestAnimationFrame(() => animateLeft(ctx, start, animationStep, y, leftX, calcContainerArea, canvas, btn))
}

const animateBottom = (ctx, x, animationStep, start, bottomY, calcContainerArea, canvas, btn) => {
    if (Math.floor(start) >= Math.floor(bottomY)) {
        // time to introduce the electron
        animateRightSet(canvas, btn, true)
        return
    }
    ctx.beginPath();
    ctx.lineTo(x, start);
    ctx.lineTo(x, start - animationStep)
    ctx.stroke();
    ctx.closePath();
    start -= animationStep
    requestAnimationFrame(() => animateBottom(ctx, x, animationStep, start, bottomY, calcContainerArea, canvas, btn))
}