function add (a, b) {
    return a + b
}
//refactor
function substract (a, b) {
    return a - b
}

function multiply (a, b) {
    return a * b
}

function divide (a, b) {
    return a / b
}

let num1 = 0;
let num2 = 0;
let operator = "";
let result;

let displayValue = "0";
let equalsButton = false;

let noNewNumberPressed = true;//

const memoryEl = document.querySelector(".display-top");
const displayValueEl = document.querySelector(".display-bottom");
const buttonList = document.querySelectorAll("button");

clear() //for now, this fixes bug that occurs when you enter the first number immediately after starting the calculator

console.log(`current result is ${result}`)

buttonList.forEach(button => {
    button.addEventListener("click", (e) => {
        switch (e.target.getAttribute("id")) {
            case "btn-num0":
                noNewNumberPressed = false;
                if (displayValue !== "0") {
                    displayValue += "0";
                }
                break;
            case "btn-num1":
                noNewNumberPressed = false;
                displayValue += "1";
                break;
            case "btn-num2":
                noNewNumberPressed = false;
                displayValue += "2";
                break;
            case "btn-num3":
                noNewNumberPressed = false;
                displayValue += "3";
                break;
            case "btn-num4":
                noNewNumberPressed = false;
                displayValue += "4";
                break;
            case "btn-num5":
                noNewNumberPressed = false;
                displayValue += "5";
                break;
            case "btn-num6":
                noNewNumberPressed = false;
                displayValue += "6";
                break;
            case "btn-num7":
                noNewNumberPressed = false;
                displayValue += "7";
                break;
            case "btn-num8":
                noNewNumberPressed = false;
                displayValue += "8";
                break;
            case "btn-num9":
                noNewNumberPressed = false;
                displayValue += "9";
                break;
            case "btn-clear":
                clear()
                console.log("Memory cleared!");
                break;
            case "btn-delete":
                clickDelete()
                break;
            case "btn-multiply":
                if (operator !== "" && noNewNumberPressed) {
                    operator = "*"
                    updateOperatorDisplay(operator)               
                } 
                else if (operator !== "" && !noNewNumberPressed) {//// && result !== ""
                    equals()
                    //updateOperatorDisplay()
                }
                operator = "*";
                if (!noNewNumberPressed) {equals()}              
                updateOperatorDisplay(operator)
                break;
            case "btn-divide":
                if (operator !== "" && noNewNumberPressed) {
                    operator = "/"
                    updateOperatorDisplay(operator)               
                } 
                else if (operator !== "" && !noNewNumberPressed) {
                    equals()
                    //updateOperatorDisplay()
                }
                operator = "/";
                if (!noNewNumberPressed) {equals()}              
                updateOperatorDisplay(operator)
                break;
            case "btn-add":
                if (operator !== "" && noNewNumberPressed) {
                    operator = "+"
                    updateOperatorDisplay(operator)               
                } 
                else if (operator !== "" && !noNewNumberPressed) {
                    equals()
                    //updateOperatorDisplay()
                }
                operator = "+"
                if (!noNewNumberPressed) {equals()}             
                updateOperatorDisplay(operator)
                break;
            case "btn-substract":
                if (operator !== "" && noNewNumberPressed) {
                    operator = "-"
                    updateOperatorDisplay(operator)               
                } 
                else if (operator !== "" && !noNewNumberPressed) {
                    equals()
                    //updateOperatorDisplay()
                }
                operator = "-";
                if (!noNewNumberPressed) {equals()}              
                updateOperatorDisplay(operator)
                break;
             case "btn-point":
                if (displayValue.includes(".")) {
                    console.log("already has decimal point")
                } else {
                    displayValue += ".";
                }
                 break;
            case "btn-equals":
                equalsButton = true;
                num2 = Number(displayValue);
                equals();
                break;
        }

        if (displayValue.length > 1 && displayValue[0] === "0" && displayValue[1] !== ".") {
            displayValue = displayValue.slice(1, displayValue.length)
        }
            
        displayValueEl.textContent = displayValue;

        //console.log(displayValue);
        console.log(num1)
    })
}) 

function operate(operator, num1, num2) {
    switch (operator) {
        case "+": 
            return add(num1, num2)
        case "-": 
            return substract(num1, num2)
        case "*": 
            return multiply(num1, num2)
        case "/":
            return divide(num1, num2)
    }
}

function clear() {
    num1 = null;//these used to be 0
    num2 = null;
    operator = "";
    displayValue = "0";
    memoryEl.textContent = ""
    result = "";
    noNewNumberPressed = true;//
}

function equals() {
    if (equalsButton 
        || memoryEl.textContent.includes("x")
        || memoryEl.textContent.includes("/")
        || memoryEl.textContent.includes("+")
        || memoryEl.textContent.includes("-")) {
            num2 = Number(displayValue)
            console.log(`first number is ${num1}`);
            console.log(`the second number is ${num2}`)
            memoryEl.textContent += num2;
            result = operate(operator, num1, num2);
            console.log(`result of calculation is ${result}`)
            num1 = result;
            memoryEl.textContent = num1;

            num2 = null;///
            operator = "";//
            displayValue = "0";
            noNewNumberPressed = true;
    }
    equalsButton = false;

    isFirstOperation();
}

function clickDelete() {
    if (displayValue.length <= 1) {
        if (displayValue !== "0") {
            displayValue = "0"
        } else { 
            clear()
        }
    }
    else if (displayValue.length > 1) {//if number starts with 0, remove 0
        displayValue = displayValue.slice(0, displayValue.length - 1);        
    } else {
        displayValue = "0";
    }
}

function isFirstOperation() { //maybe this can live inside the equals function?
    if (!result) {
        num1 = Number(displayValue);
        console.log(`first operation, first number is ${num1}`)
        displayValue = "0";
        noNewNumberPressed = true;
        }
}

function updateOperatorDisplay(operator) {
    let operatorSymbol;

    switch (operator) {
        case "*":
            operatorSymbol = "x";
            break;
        case "/":
            operatorSymbol = "/";
            break;
        case "+":
            operatorSymbol = "+";
            break;
        case "-":
            operatorSymbol = "-";
            break;     
    }
    memoryEl.textContent = `${num1} ${operatorSymbol} `;
}