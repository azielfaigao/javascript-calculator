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
function calculatorInput(button) {
    if (button >= 0 && button <= 9) {
        if (inputNew === true || mainDisplay.innerText === '0') {
            if (equalsClicked === true) {
                allClear();
            }
            mainDisplay.innerText = button;
            inputNew = false;
        } else {
            mainDisplay.innerText += button;
        }
    } else if (button === '.') {
        if (!mainDisplay.innerText.includes('.') && equalsClicked === false) {
            mainDisplay.innerText += '.';
            inputNew = false;
        } else if (inputNew === true || equalsClicked === true) {
            if (mainDisplay.innerText === opDisplay.innerText) {
                opDisplay.innerText = '0';
            }
            mainDisplay.innerText = '0.';
            inputNew = false;
            equalsClicked = false;
        }
    }

}

function operatorInput(opInput) {
    if (inputNew === false) {
        result = eval(firstNum + operator + mainDisplay.innerText);
        opDisplay.innerText = `${result} ${operator}`;
        mainDisplay.innerText = result;
    }
    firstNum = mainDisplay.innerText;
    operator = opInput;
    inputNew = true;
    equalsClicked = false;
    opDisplay.innerText = `${firstNum} ${operator}`;
    if (operator === '−') {
        operator = '-';
    } else if (operator === '%') {
        operator = '/';
    } else if (operator === 'x') {
        operator = '*';
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
    equalsClicked = false;
    result = '';
    operator = '';
    firstNum = '';
    secondNum = '';
}

function clearEntry() {
    if (equalsClicked === true) {
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
        if (button.innerText >= 0 && button.innerText <= 9 || button.classList.contains('dot')) {
            calculatorInput(button.innerText);
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
    if (event.key >= 0 && event.key <= 9 || event.key === '.') {
        calculatorInput(event.key);
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