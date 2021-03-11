const mainDisplay = document.querySelector('.display-main');
const opDisplay = document.querySelector('.display-operations');

let input = '0';
let inputSecondNum = false;
let firstNum = '';
let secondNum = '';
let result = '';
let operator = '';

// functions
// function compute(op, firstNum, secondNum) {
//     let operandOne = parseFloat(firstNum);
//     let operandTwo = parseFloat(secondNum);
//     switch (op) {
//         case 'x':
//             return operandOne * operandTwo;
//         case '%':
//             return operandOne / operandTwo;
//         case '+':
//             return operandOne + operandTwo;
//         case '−':
//             return operandOne - operandTwo;
//     }
//     return secondNum;
// }

function display(value, calcDisplay) {
    calcDisplay.innerHTML = value;
}

function numberInput(button) {
    if (mainDisplay.innerText === '0') {
        mainDisplay.innerText = button;
    } else if (inputSecondNum === true) {
        mainDisplay.innerText = button;
        inputSecondNum = false;
    } else {
        mainDisplay.innerText += button;
    }
    // display(input, mainDisplay);
}

function operatorInput(button) {
    if (firstNum === '' && !isNaN(parseFloat(input))) {
        firstNum = input;
    } else if (inputSecondNum === false) {
        result = eval(equation);
        // display(`${result} ${operator}`, opDisplay)
        firstNum = result;
    } else if (parseFloat(mainDisplay.innerText) === result) {
        display(`${result} ${operator}`, opDisplay);
        firstNum = result;
        display(firstNum, mainDisplay);
    }

    inputSecondNum = true;
    operator = button;
    console.log(operator);
    
    display(`${firstNum} ${operator} `, opDisplay);
}

function dotInput() {
    if (!input.includes('.')) {
        input += '.';
    }

    if (inputSecondNum === true) {
        input = '0.';
        inputSecondNum = false;
    }
    display(input, mainDisplay);
}

function equalFunction() {
    if (secondNum === '' && !isNaN(parseFloat(input))) {
        secondNum = input;
    }

    if(operator === '−'){
        operator = '-';
    } else if(operator === '%'){
        operator = '/';
    } else if (operator === 'x'){
        operator = '*';
    }
    let equation = `${firstNum} ${operator} ${secondNum}`;
    result = eval(equation);
    opDisplay.innerText = equation;
    mainDisplay.innerText = result;

    firstNum = result;
    inputSecondNum = true;
}

function allClear() {
    display('0', mainDisplay);
    display('0', opDisplay);
    inputSecondNum = false;
    firstNum = '';
    secondNum = '';
    input = '0';
    result = '';
    operator = '';
}

function clearEntry() {
    if (parseFloat(mainDisplay.innerText) === result) {
        firstNum = '';
        secondNum = '';
        display('0', opDisplay);
    }
    input = '0';
    display(input, mainDisplay);
}

//Event listeners
const calculatorInput = document.querySelectorAll('.num, .dot, .op');
calculatorInput.forEach(button => {
    button.addEventListener('click', () => {
        let buttonClass = button.classList;
        if (buttonClass.contains('dot')) {
            dotInput(button.innerText);
        } else if (buttonClass.contains('num')) {
            numberInput(button.innerText);
        }
        else if (buttonClass.contains('op')) {
            operatorInput(button.innerText);
        }
    })
});

const equals = document.querySelector('.eq');
equals.addEventListener('click', () => {
    // equalFunction();
    secondNum = input;
    if(operator === '−'){
        operator = '-';
    } else if(operator === '%'){
        operator = '/';
    }
    let equation = `${firstNum} ${operator} ${secondNum}`;
    result = eval(equation);
    opDisplay.innerText = equation;
    mainDisplay.innerText = result;
    firstNum = result;
    inputSecondNum = true;
    console.log(equation)
})

const ac = document.querySelector('.ac');
ac.addEventListener('click', () => {
    allClear();
})

const ce = document.querySelector('.ce');
ce.addEventListener('click', () => {
    clearEntry();
})

document.addEventListener('keydown', (event) => {
    if (event.key >= 0 && event.key <= 9) {
        numberInput(event.key);
    } else if (event.key === '.') {
        dotInput();
    } else if (event.key === 'x' || event.key === '+' || event.key === '-' || event.key === '%') {
        operatorInput(event.key);
    } else if (event.key === '=' || event.key === 'Enter') {
        equalFunction();
    }

    if (event.key === 'Backspace') {
        clearEntry();
    } else if (event.key === 'Delete') {
        allClear();
    }
    console.log(event.key)
})