// define the targets and classes to be added/removed;
const targetsStylesClasses = {
    body: 'dark-body',
    undo: 'undo-dark',
    "calc-con": 'calc-con-dark',
    "btn-numbers": 'btn-numbers-dark',
    "operator": 'operators-dark',
    equal: 'equal-dark',
    "mid-green": "mid-green-dark",
    result: 'result-dark',
    "clear-btn": 'clear-btn-dark',
    "display-text-con": 'display-text-con-dark',
    "calc-top": 'calc-top-dark'
}
export function enableDarkMode () {
    for (let target in targetsStylesClasses) {
        const targetDom = document.getElementsByClassName(target);
        const newClass = targetsStylesClasses[target];
        const targetDomArray = [...targetDom];
        targetDomArray.forEach((element) => element.classList.add(newClass))
    }
}
export function disableDarkMode() {
    for (let target in targetsStylesClasses) {
        const targetDom = document.getElementsByClassName(target);
        const newClass = targetsStylesClasses[target];
        const targetDomArray = [...targetDom];
        targetDomArray.forEach((element) => element.classList.remove(newClass))
    }
}