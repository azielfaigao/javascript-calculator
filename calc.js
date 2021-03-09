const mainDisplay = document.querySelector('.display-main');
const opDisplay = document.querySelector('.display-operations');

let input = '0';
let waitingSecondNum = false;
let firstNum = '';
let secondNum = '';
let result = '';
let operator = '';

// functions

function compute(op, firstNum, secondNum) {
    switch (op) {
        case 'x':
            return parseFloat(firstNum) * parseFloat(secondNum);
        case '%':
            return parseFloat(firstNum) / parseFloat(secondNum);
        case '+':
            return parseFloat(firstNum) + parseFloat(secondNum);
        case '−':
            return parseFloat(firstNum) - parseFloat(secondNum);
    }
    return secondNum;
}

function display(value, calcDisplay) {
    calcDisplay.innerHTML = value;
}

function numberInput(button) {
    if (input === '0') {
        input = button.innerHTML;
        console.log('DISPLAY CHANGE')
    } else if (waitingSecondNum === true) {
        input = button.innerHTML;
        waitingSecondNum = false;
        console.log('SECOND VAL INPUT');
    } else {
        input += button.innerHTML;
        console.log('NEW VAL INSERT')
    }
    display(input, mainDisplay);
}

function operatorInput(button) {

    if (firstNum === '' && !isNaN(parseFloat(input))) {
        firstNum = input;
    } else if (waitingSecondNum === false) {
        console.log('CHAIN EQUATION')
        result = compute(operator, firstNum, input);
        display(`${result} ${operator}`, opDisplay)
        firstNum = result;
    } else if (parseFloat(mainDisplay.innerText) === result) {
        console.log('CHAIN EQUALS')
        display(`${result} ${operator}`, opDisplay);
        firstNum = result;
        display(firstNum, mainDisplay);
    }
    waitingSecondNum = true;
    operator = button.innerHTML;
    console.log(operator);
    display(`${firstNum} ${operator} `, opDisplay);
}

function dotInput(button) {
    if (!input.includes(button.innerHTML)) {
        input += button.innerHTML;
        console.log('DOT INSERTED')
    }

    if (waitingSecondNum === true) {
        input = '0.';
        waitingSecondNum = false;
    }
    display(input, mainDisplay);
}

function equalFunction() {
    secondNum = input;
    result = compute(operator, firstNum, secondNum);
    display(result, mainDisplay);
    if (operator === '') {
        display(input, opDisplay);
    } else {
        display(`${firstNum} ${operator} ${secondNum}`, opDisplay);
    }

    firstNum = result;
    waitingSecondNum = true;
}

function allClear() {
    display('0',mainDisplay);
    display('0', opDisplay);
    waitingSecondNum = false;
    firstNum = '';
    secondNum = '';
    input = '0';
    result = '';
    operator = '';
}

function clearEntry() {
    if (firstNum === '') {
        input = '0';
        waitingSecondNum = false;
        display(input, mainDisplay);
    } else if (waitingSecondNum === true) {
        operator = '';
        waitingSecondNum = false;
        display(input, opDisplay);
        console.log('clear operator')
    } else if (!firstNum == '' && operator === '') {
        input = '0';
        firstNum = '';
        display(input, mainDisplay);
        display(input, opDisplay);
        console.log('chain clear');
    } else if (parseFloat(mainDisplay.innerText) === result) {
        allClear();
        console.log('result clear')
    }
}

//Event listeners
const calculatorInput = document.querySelectorAll('.num, .dot, .op');
calculatorInput.forEach(button => {
    button.addEventListener('click', () => {
        let buttonClass = button.classList;
        if (buttonClass.contains('dot')) {
            dotInput(button);
        } else if (buttonClass.contains('num')) {
            numberInput(button);
        }
        else if (buttonClass.contains('op')) {
            operatorInput(button);
        }
    })
});

const equals = document.querySelector('.eq');
equals.addEventListener('click', () => {
    equalFunction();
})

const ac = document.querySelector('.ac');
ac.addEventListener('click', () => {
    allClear();
})

const ce = document.querySelector('.ce');
ce.addEventListener('click', () => {
    clearEntry();
})
