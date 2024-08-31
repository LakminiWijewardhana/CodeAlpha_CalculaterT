const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');

let currentInput = '';
let previousInput = '';
let operator = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.value;

        if (value === 'C') {
            currentInput = '';
            previousInput = '';
            operator = '';
        } else if (value === 'CE') {
            currentInput = '';
        } else if (value === '←') {
            currentInput = currentInput.slice(0, -1);
        } else if (value === '=') {
            if (previousInput && currentInput && operator) {
                const result = evaluateExpression(previousInput, currentInput, operator);
                currentInput = result.toString();
                previousInput = '';
                operator = '';
            }
        } else if (value === '+' || value === '-' || value === '×' || value === '÷') {
            if (previousInput && currentInput && operator) {
                const result = evaluateExpression(previousInput, currentInput, operator);
                currentInput = '';
                previousInput = result.toString();
                operator = value;
            } else {
                operator = value;
                previousInput = currentInput;
                currentInput = '';
            }
        } else {
            currentInput += value;
        }

        display.value = previousInput + operator + currentInput;
    });
});

function evaluateExpression(previousInput, currentInput, operator) {
    switch (operator) {
        case '+':
            return parseFloat(previousInput) + parseFloat(currentInput);
        case '-':
            return parseFloat(previousInput) - parseFloat(currentInput);
        case '×':
            return parseFloat(previousInput) * parseFloat(currentInput);
        case '÷':
            return parseFloat(previousInput) / parseFloat(currentInput);
        default:
            return 0;
    }
}