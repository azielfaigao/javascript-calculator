const mainDisplay = document.querySelector('.display-main');
const opDisplay = document.querySelector('.display-operations');

mainDisplay.style.overflowX = 'scroll';
mainDisplay.style.overflowY = 'hidden';

let inputNew = true;
let equalsClicked = false;
let firstNum = '';
let secondNum = '';
let result = '';
let operator = '';

/** Functions **/
function numberInput(button) {
    if (inputNew === true) {
        if (result === parseFloat(mainDisplay.innerText) && equalsClicked === true) {
            allClear();
            equalsClicked = false;
        }
        mainDisplay.innerText = button;
        inputNew = false;
    } else {
        mainDisplay.innerText += button;
    }
}

function operatorInput(opInput) {
    if (inputNew === false) {
        result = eval(firstNum + operator + mainDisplay.innerText);
        opDisplay.innerText = `${result} ${operator}`;
        mainDisplay.innerText = result;
        firstNum = result;
    }
    firstNum = mainDisplay.innerText;
    operator = opInput;
    inputNew = true;
    opDisplay.innerText = `${firstNum} ${operator}`;
    if (operator === '−') {
        operator = '-';
    } else if (operator === '%') {
        operator = '/';
    } else if (operator === 'x') {
        operator = '*';
    }
}

function dotInput() {
    if (!mainDisplay.innerText.includes('.')) {
        mainDisplay.innerText += '.';
    } else if (inputNew === true) {
        mainDisplay.innerText = '0.';
        inputNew = false;
    }
}

function equalFunction() {
    if (secondNum === '' || inputNew === false) {
        secondNum = mainDisplay.innerText;
    }
    if (operator === '') {
        opDisplay.innerText = mainDisplay.innerText;
    } else {
        result = eval(firstNum + operator + secondNum);
        opDisplay.innerText = `${firstNum} ${operator} ${secondNum}`;
        mainDisplay.innerText = result;
        firstNum = result;
    }
    inputNew = true;
    equalsClicked = true;
}

function allClear() {
    mainDisplay.innerText = '0';
    opDisplay.innerText = '0';
    inputNew = true;
    result = '';
    operator = '';
    firstNum = '';
    secondNum = '';
}

function clearEntry() {
    if (parseFloat(mainDisplay.innerText) === result) {
        allClear();
    } else {
        mainDisplay.innerText = '0';
        inputNew = true;
    }
}

/** Event listeners **/
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
        let buttonClass = button.classList;
        if (button.innerText >= 0 && button.innerText <= 9) {
            numberInput(button.innerText);
        } else if (button.classList.contains('dot')) {
            dotInput();
        } else if (buttonClass.contains('ac')) {
            allClear();
        } else if (buttonClass.contains('ce')) {
            clearEntry();
        } else if (buttonClass.contains('eq')) {
            equalFunction();
        } else {
            operatorInput(button.innerText);
        }
    })
});

document.addEventListener('keydown', (event) => {
    if (event.key >= 0 && event.key <= 9) {
        numberInput(event.key);
    } else if (event.key === '.') {
        dotInput();
    } else if (event.key === '*' || event.key === '+' || event.key === '-' || event.key === '/' || event.key === 'x') {
        operatorInput(event.key);
    } else if (event.key === '=' || event.key === 'Enter') {
        equalFunction();
    } else if (event.key === 'Backspace') {
        clearEntry();
    } else if (event.key === 'Delete') {
        allClear();
    }
})