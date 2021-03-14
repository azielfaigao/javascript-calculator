const mainDisplay = document.querySelector('.display-main');
const opDisplay = document.querySelector('.display-operations');

let inputNew = false;
let firstNum = '';
let secondNum = '';
let result = '';
let operator = '';

// functions
function numberInput(button) {
    if (mainDisplay.innerText === '0') {
        mainDisplay.innerText = button;
    } else if (inputNew === true) {
        // if (mainDisplay.innerText === firstNum && firstNum === result) {
        //     allClear();
        //     console.log('NEW EQUATION')
        // } //****** :((
        mainDisplay.innerText = button;
        console.log('INPUT WAS TRUE')
        inputNew = false;
    } else {
        mainDisplay.innerText += button;
    }
}

function operatorInput(opInput) {
    if (inputNew === false) {
        console.log('CHAIN EQUATION')
        result = eval(firstNum + operator + mainDisplay.innerText);
        opDisplay.innerText = `${result} ${operator}`;
        mainDisplay.innerText = result;
        firstNum = result;
    } else {
        firstNum = mainDisplay.innerText;
    }
    operator = opInput;
    opDisplay.innerText = `${firstNum} ${operator}`;
    inputNew = true;

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
        console.log('INPUT WAS TRUE')
        inputNew = false;
    }
}

function equalFunction() {
    if (inputNew === false) {
        secondNum = mainDisplay.innerText;
    }
    if (operator === '') {
        opDisplay.innerText = mainDisplay.innerText;
        console.log('INPUT NOW TRUE')
    } else {
        result = eval(firstNum + operator + secondNum);
        opDisplay.innerText = `${firstNum} ${operator} ${secondNum}`;
        mainDisplay.innerText = result;
        firstNum = result;
    }
    inputNew = true;

    if (mainDisplay.innerText.length >= 12) {
        mainDisplay.style.overflow = 'scroll';
    } else {
        mainDisplay.style.overflow = '';
    }
}

function allClear() {
    mainDisplay.innerText = '0';
    opDisplay.innerText = '0';
    inputNew = false;
    result = '';
    operator = '';
    firstNum = '';
    secondNum = '';
}

function clearEntry() {
    if (parseFloat(mainDisplay.innerText) === result) {
        firstNum = '';
        secondNum = '';
        opDisplay.innerText = '0'
    }
    mainDisplay.innerText = '0';
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