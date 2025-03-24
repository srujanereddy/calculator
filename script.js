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
let leftOperand='';
let rightOperand='';
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

const numbers = document.querySelectorAll(".number");
numbers.forEach((number) => {
    number.addEventListener("click", () => {
        if(operator === ''){
            leftOperand+=number.textContent;
            displayValue=leftOperand;
            updateDisplay();
            leftOperand = displayValue;
        }
        else{
            rightOperand+=number.textContent;
            displayValue=rightOperand;
            updateDisplay();
            rightOperand = displayValue;
        }
    });
});

const operators = document.querySelectorAll(".operator");
operators.forEach((symbol) => {
    symbol.addEventListener("click", () =>{
        if(operator === ''){
            operator = symbol.textContent;
        }
        else if(rightOperand === ''){
            let result = operation(leftOperand,operator,leftOperand);
            leftOperand = result;
            displayValue = leftOperand;
            updateDisplay();
            rightOperand='';
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
    });
});

const clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
    displayValue='';
    updateDisplay();
    leftOperand='';
    rightOperand='';
    operator='';
});

const evaluate = document.querySelector("#evaluate");
evaluate.addEventListener("click", () => {
    if(operator === ''){
        displayValue = leftOperand;
        updateDisplay();
    }
    else if(rightOperand === ''){
        let result = operation(leftOperand,operator,leftOperand);
        leftOperand = result;
        displayValue = leftOperand;
        updateDisplay();
        operator = '';
        rightOperand='';
        leftOperand='';
    }
    else{
        let result = operation(leftOperand,operator,rightOperand);
        leftOperand = result;
        displayValue = leftOperand;
        updateDisplay();
        operator='';
        rightOperand='';
        leftOperand='';
    }
});

const sign = document.querySelector("#sign");
sign.addEventListener("click", () => {
    if(operator === ''){
        if(leftOperand){
            leftOperand = -leftOperand;
            displayValue = leftOperand;
            updateDisplay();
        }
    }
    else{
        if(rightOperand){
            rightOperand = -rightOperand;
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
        displayValue = leftOperand;
        updateDisplay();
    }
    else{
        rightOperand = rightOperand.substring(0,rightOperand.length - 1);
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