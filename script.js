function add(a,b){
    return Math.round((parseFloat(a) + parseFloat(b)) * 1e6)/1e6;
}

function subtract(a,b){
    return Math.round((parseFloat(a) - parseFloat(b)) * 1e6)/1e6;
}

function multiply(a,b){
    return Math.round((parseFloat(a) * parseFloat(b)) * 1e6)/1e6;
}

function divide(a,b){
    if(b==0)
        return "LOL";
    return Math.round((parseFloat(a) / parseFloat(b)) * 1e6)/1e6;
}

let operator='';
let leftOperand='0';
let rightOperand='0';
let displayValue='';

const divider = document.querySelector("#divider");
const multiplier = document.querySelector("#multiplier");
const minus = document.querySelector("#minus");
const plus = document.querySelector("#plus");


function operation(leftOperand,operator,rightOperand){
    if(operator === '+')
        return add(leftOperand,rightOperand);
    else if(operator === '-')
        return subtract(leftOperand,rightOperand);
    else if(operator === '*')
        return multiply(leftOperand,rightOperand);
    else if(operator === '/')
        return divide(leftOperand,rightOperand);
}

const display = document.querySelector(".display");
function updateDisplay(){
    if(displayValue.length > 9)
        displayValue = displayValue.substring(0,9);
    display.textContent = displayValue;
}

const previewDisplay = document.querySelector('.preview');
function updatePreview(){
    previewDisplay.textContent = `${leftOperand} ${operator}`;
}
function clearPreview(){
    previewDisplay.textContent = '';
}

const numbers = document.querySelectorAll(".number");
numbers.forEach((number) => {
    number.addEventListener("click", () => {
        if(operator === ''){
            leftOperand==='0'?leftOperand=number.textContent:leftOperand+=number.textContent;
            displayValue=leftOperand;
            updateDisplay();
            leftOperand = displayValue;
        }
        else{
            rightOperand==='0'?rightOperand=number.textContent:rightOperand+=number.textContent;
            displayValue=rightOperand;
            updateDisplay();
            rightOperand = displayValue;
            disableOperators();
        }
    });
});

const operators = document.querySelectorAll(".operator");
operators.forEach((symbol) => {
    symbol.addEventListener("click", () =>{
        disableOperators();
        if(operator === ''){
            operator = symbol.textContent;
            displayValue = rightOperand;
            updateDisplay();
        }
        else if(rightOperand === '0'){
            operator = symbol.textContent;
        }
        else{
            let result = operation(leftOperand,operator,rightOperand);
            leftOperand = result;
            displayValue = leftOperand;
            updateDisplay();
            rightOperand='';
            operator = symbol.textContent;
        }
        updatePreview();
        symbol.classList.add('active-operator');
    });
});

const clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
    disableOperators();
    displayValue='0';
    updateDisplay();
    leftOperand='0';
    rightOperand='0';
    operator='';
    clearPreview();
});

const evaluate = document.querySelector("#evaluate");
evaluate.addEventListener("click", () => {
    disableOperators();
    clearPreview();
    if(operator === ''){
        displayValue = leftOperand;
        updateDisplay();
    }
    else if(rightOperand === ''){
        let result = operation(leftOperand,operator,'0');
        leftOperand = result;
        displayValue = leftOperand;
        updateDisplay();
        operator = '';
        rightOperand='0';
    }
    else{
        let result = operation(leftOperand,operator,rightOperand);
        leftOperand = result;
        displayValue = leftOperand;
        updateDisplay();
        operator='';
        rightOperand='0';
    }
});

const sign = document.querySelector("#sign");
sign.addEventListener("click", () => {
    if(operator === ''){
        if(leftOperand){
            leftOperand = -leftOperand;
            leftOperand+='';
            displayValue = leftOperand;
            updateDisplay();
        }
    }
    else{
        if(rightOperand){
            rightOperand = -rightOperand;
            rightOperand+='';
            displayValue = rightOperand;
            updateDisplay();
        }
    }
});

const point = document.querySelector("#point");
point.addEventListener("click", () => {
    if(operator === ''){
        if(!leftOperand.includes('.')){
            leftOperand+='.';
            displayValue = leftOperand;
            updateDisplay();
        }
    }
    else{
        if(!rightOperand.includes('.')){
            rightOperand += '.';
            displayValue = rightOperand;
            updateDisplay();
        }
    }
});

const del = document.querySelector("#delete");
del.addEventListener("click", () => {
    if(operator === ''){
        leftOperand = leftOperand.substring(0,leftOperand.length - 1);
        if(leftOperand === '')
            leftOperand = '0';
        displayValue = leftOperand;
        updateDisplay();
    }
    else if(rightOperand === '0' && operator){
        operator='';
        disableOperators();
        clearPreview();
    }
    else{
        rightOperand = rightOperand.substring(0,rightOperand.length - 1);
        if(rightOperand === '')
            rightOperand = '0';
        displayValue = rightOperand;
        updateDisplay();
    }
});

window.addEventListener('keydown', (e) => {
    key = e.key;
    let nums ='0123456789';
    if(nums.includes(key)){
        if(operator === ''){
            leftOperand+=key;
            displayValue=leftOperand;
            updateDisplay();
        }
        else{
            rightOperand+=key;
            displayValue=rightOperand;
            updateDisplay();
        }
    }
    else{
        switch(key){
            case '.':
                point.click();
                break;
            case 'Enter':
                evaluate.click();
                break;
            case 'Backspace':
                del.click();
                break;
            case '+':
                plus.click();
                break;
            case '-':
                minus.click();
                break;
            case '*':
                multiplier.click();
                break;
            case '/':
                divider.click();
                break;
        }
    }
});

function disableOperators(){
    operators.forEach((symbol) => {
        symbol.classList.remove('active-operator');
    })
}