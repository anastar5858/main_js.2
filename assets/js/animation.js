export const configureCanvasDimensions = (canvas) => {
    const displayArea = document.getElementById('display-area');
    const displayContainer = document.getElementById('calc-top');
    const displayContainerBox = displayContainer.getBoundingClientRect();
    const displayAreaBox = displayArea.getBoundingClientRect();
    // calculate the required top edge y coordinate
    const offset = displayAreaBox.top - displayContainerBox.top;
    const requiredWidth = displayAreaBox.width;
    const requiredHeight = displayAreaBox.height;
    canvas.width = requiredWidth;
    canvas.height = requiredHeight
    canvas.style.position = 'absolute';
    canvas.style.top = (offset + displayArea.offsetTop - offset) + 'px';
    canvas.style.left = 0 + 'px';
    animateClearSet(canvas);
}

function animateClearSet(canvas) {
    // get canvas bottom left edge coordinate relative to viewport
    const canvasToViewport = canvas.getBoundingClientRect();
    const canvasTop = canvasToViewport.height;
    // bottom is canvas top (y);
    const canvasWidth = canvasToViewport.width;
    const animationStep = Math.round((canvasToViewport.width / 100) * 100) / 100;
    // time to animate !!!! (0 and ones and strikes)
    const canvas2d = canvas.getContext('2d');
    // parameters: (x step, canvas, top edge, bottom edge, x coordinate (initially zero), alternate between edges boolean);
    requestAnimationFrame(() => animateClear(0, canvas2d, canvasTop, 0, false, canvasWidth, animationStep))
    // console.log(animationStep)
    // console.log(canvasToViewport, canvas2d)
}

const animateClear = (xStep, ctx, yTop, yBottom, alternate, canvasWidth, animationStep) => {
    xStep = Math.round(xStep * 100) / 100;
    if (xStep === canvasWidth) return
    ctx.beginPath();
    ctx.lineTo(xStep, !alternate ? yTop : yBottom);
    ctx.lineTo(xStep + animationStep, !alternate ? yBottom : yTop);
    ctx.stroke();
    ctx.closePath();
    // update and keep animating
    xStep += animationStep
    alternate = !alternate;
    requestAnimationFrame(() => animateClear(xStep, ctx, yTop, yBottom, alternate, canvasWidth, animationStep))
}