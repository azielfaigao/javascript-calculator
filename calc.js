const mainDisplay = document.querySelector('.display-main');
const opDisplay = document.querySelector('.display-operations');

let input = '0';
let waitingSecondNum = false;
let firstNum = '';
let secondNum = '';
let result = '';
let op = '';

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
}

function operatorInput(button) {
    if (!op === '' && waitingSecondNum === true) {
        op = button.innerHTML;
    }
    console.log(op)

    if (firstNum === '' && !isNaN(parseFloat(input))) {
        firstNum = parseFloat(input);
    } else if (waitingSecondNum === false) {
        console.log('CHAIN EQUATION')
        result = compute(op, firstNum, input);
        display(result, mainDisplay);
        firstNum = result;
    }
    waitingSecondNum = true;
    op = button.innerHTML;

    if (!opDisplay.innerHTML === '0') {
        opDisplay.innerHTML += mainDisplay.innerHTML;
        console.log('opDis aug')
    } else {
        opDisplay.innerHTML = mainDisplay.innerHTML;
        console.log('opDis equals')
    }
    display(`${input} ${op} `, opDisplay);

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
}

//add onclick event to input buttons
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
        display(input, mainDisplay);
    })
});

//add onclick event to EQUALS button
const equals = document.querySelector('.eq');
equals.addEventListener('click', () => {
    secondNum = input;
    result = compute(op, firstNum, secondNum);
    display(result, mainDisplay);
    display(`${firstNum} ${op} ${secondNum}`, opDisplay);
    firstNum = result;
    result = '';
    waitingSecondNum = false;
})

// add onclick event to AC button
const ac = document.querySelector('.ac');
ac.addEventListener('click', () => {
    mainDisplay.innerHTML = '0';
    opDisplay.innerHTML = '0';
    waitingSecondNum = false;
    firstNum = '';
    secondNum = '';
    input = '0';
    result = '';
    op = '';
})

// add onclick event to CE
const ce = document.querySelector('.ce');
ce.addEventListener('click', () => {
    input = '0';
    display(input, mainDisplay);
    if (input === firstNum) {
        display('0', opDisplay);
    }
})
