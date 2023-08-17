export const configureCanvasDimensions = (canvas) => {
    document.getElementById('animaion-msg').style.display = 'block';
    return new Promise((resolve) => {
        canvas.style.display = 'block';
        const displayArea = document.getElementById('display-area');
        const displayContainer = document.getElementById('calc-top');
        const displayContainerBox = displayContainer.getBoundingClientRect();
        const displayAreaBox = displayArea.getBoundingClientRect();
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
    const canvasToViewport = canvas.getBoundingClientRect();
    const canvasTop = canvasToViewport.height;
    const canvasWidth = canvasToViewport.width;
    const animationStep = Math.round((canvasToViewport.width / 30) * 100) / 100;
    const canvas2d = canvas.getContext('2d');
    document.getElementById('display-area').textContent = ''
    requestAnimationFrame(() => animateClear(0, canvas2d, canvasTop, 0, false, canvasWidth, animationStep, undefined, canvas, resolve))
}
const animateClear = (xStep, ctx, yTop, yBottom, alternate, canvasWidth, animationStep, numberOfCharacters, canvas, resolve) => {
    xStep = Math.round(xStep * 100) / 100;
    if (xStep === animationStep * 30) {
        setTimeout(() => {
            document.getElementById('display-area').style.textAlign = '';
            document.getElementById('display-area').style.color = '';
            document.getElementById('display-area').style.fontSize = '';
            document.getElementById('display-area').style.fontFamily = '';
            document.getElementById('display-area').style.letterSpacing = '';
            canvas.style.display = ''
            document.getElementById('animaion-msg').style.display = 'none';
            resolve()
        }, 1000 * 1)
        return
    } 
    ctx.beginPath();
    ctx.lineTo(xStep, !alternate ? yTop : yBottom);
    ctx.lineTo(xStep + animationStep, !alternate ? yBottom : yTop);
    ctx.stroke();
    ctx.closePath();
    xStep += animationStep;
    alternate = !alternate;
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