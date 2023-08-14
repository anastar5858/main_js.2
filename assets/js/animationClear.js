export const configureCanvasDimensions = (canvas) => {
    return new Promise((resolve) => {
        canvas.style.display = 'block';
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
        animateClearSet(canvas, resolve);
    }) 
}
const  animateClearSet = (canvas, resolve) => {
    // get canvas bottom left edge coordinate relative to viewport
    const canvasToViewport = canvas.getBoundingClientRect();
    const canvasTop = canvasToViewport.height;
    // bottom is canvas top (y);
    const canvasWidth = canvasToViewport.width;
    const animationStep = Math.round((canvasToViewport.width / 30) * 100) / 100;
    // time to animate !!!! (0 and ones and strikes)
    const canvas2d = canvas.getContext('2d');
    document.getElementById('display-area').textContent = ''
    // parameters: (x step, canvas, top edge, bottom edge, x coordinate (initially zero), alternate between edges boolean);
    requestAnimationFrame(() => animateClear(0, canvas2d, canvasTop, 0, false, canvasWidth, animationStep, undefined, canvas, resolve))
}
const animateClear = (xStep, ctx, yTop, yBottom, alternate, canvasWidth, animationStep, numberOfCharacters, canvas, resolve) => {
    xStep = Math.round(xStep * 100) / 100;
    console.log(xStep, canvasWidth, animationStep, animationStep * 40)
    if (xStep === animationStep * 30) {
        // remove all added inline-styles for the animation
        setTimeout(() => {
            document.getElementById('display-area').style.textAlign = '';
            document.getElementById('display-area').style.color = '';
            document.getElementById('display-area').style.fontSize = '';
            document.getElementById('display-area').style.fontFamily = '';
            document.getElementById('display-area').style.letterSpacing = '';
            canvas.style.display = ''
            resolve()
        }, 1000 * 1)
        return
    } 
    ctx.beginPath();
    ctx.lineTo(xStep, !alternate ? yTop : yBottom);
    ctx.lineTo(xStep + animationStep, !alternate ? yBottom : yTop);
    ctx.stroke();
    ctx.closePath();
    // update and keep animating
    xStep += animationStep
    alternate = !alternate;
    // rememember to add zeros and ones using the alternate voolean as well
    // check that are does not exceed the canvas width
    // each character is 25 px according to our observation
    document.getElementById('display-area').style.textAlign = 'left';
    document.getElementById('display-area').style.color = 'green';
    document.getElementById('display-area').style.fontSize = '25px';
    document.getElementById('display-area').style.fontFamily = 'monospace';
    document.getElementById('display-area').style.letterSpacing = '0';
    numberOfCharacters === undefined ? numberOfCharacters = Math.floor(canvasWidth / 25) * 1.8 : numberOfCharacters = numberOfCharacters;
    if (numberOfCharacters > 0) {
        !alternate ? document.getElementById('display-area').textContent += '0' : document.getElementById('display-area').textContent += '1'
        numberOfCharacters--
    }
    requestAnimationFrame(() => animateClear(xStep, ctx, yTop, yBottom, alternate, canvasWidth, animationStep, numberOfCharacters, canvas, resolve))
}