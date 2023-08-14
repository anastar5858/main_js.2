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
}