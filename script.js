let num1 = 0;
let num2 = 0;
let operator = "";
let result;
let displayValue = "0";

let equalsButton = false;
let numKeysUntouched = true;
let errorEncountered = false;

const memoryEl = document.querySelector(".display-top");
const displayValueEl = document.querySelector(".display-bottom");
const buttonList = document.querySelectorAll("button");

clear()                                                                                             //Clear calculator before starting

buttonList.forEach(button => {
    button.addEventListener("click", (e) => {
        if (errorEncountered) {
            clear()
        }

        switch (e.target.getAttribute("id")) {
            case "btn-num0":
                numKeysUntouched = false;
                if (!numberTooLong()) {
                    if (displayValue !== "0") {
                        displayValue += "0";
                    }
                }
                break;
            case "btn-num1":
                numKeysUntouched = false;
                if (!numberTooLong()) {
                    displayValue += "1";
                }
                break;
            case "btn-num2":
                numKeysUntouched = false;
                if (!numberTooLong()) {
                    displayValue += "2";
                }
                break;
            case "btn-num3":
                numKeysUntouched = false;
                if (!numberTooLong()) {
                    displayValue += "3";
                }
                break;
            case "btn-num4":
                numKeysUntouched = false;
                if (!numberTooLong()) {
                    displayValue += "4";
                }
                break;
            case "btn-num5":
                numKeysUntouched = false;
                if (!numberTooLong()) {
                    displayValue += "5";
                }
                break;
            case "btn-num6":
                numKeysUntouched = false;
                if (!numberTooLong()) {
                    displayValue += "6";
                }
                break;
            case "btn-num7":
                numKeysUntouched = false;
                if (!numberTooLong()) {
                    displayValue += "7";
                }
                break;
            case "btn-num8":
                numKeysUntouched = false;
                if (!numberTooLong()) {
                    displayValue += "8";
                }
                break;
            case "btn-num9":
                numKeysUntouched = false;
                if (!numberTooLong()) {
                    displayValue += "9";
                }
                break;
            case "btn-clear":
                clear();
                break;
            case "btn-delete":
                clickDelete()
                break;
            case "btn-multiply":
                currentOperator = "*";
                pressOperatorButton(currentOperator);
                break;
            case "btn-divide":
                currentOperator = "/";
                pressOperatorButton(currentOperator);
                break;
            case "btn-add":
                currentOperator = "+";
                pressOperatorButton(currentOperator);
                break;
            case "btn-substract": 
                currentOperator = "-";
                pressOperatorButton(currentOperator);
                break;
             case "btn-point":
                if (displayValue.includes(".")) {
                    console.log("already has decimal point")
                } else {
                    displayValue += ".";
                }
                 break;
            case "btn-equals":
                if (operator !== "") {
                    equalsButton = true;
                    num2 = Number(displayValue);
                    equals();
                }
                break;
            case "btn-plus-minus":
                if (displayValue.charAt(0) !== "-") {
                    displayValue = "-" + displayValue;
                } else if (displayValue.charAt(0) === "-") {
                    displayValue = displayValue.slice(1, displayValue.length)
                }
                break;
            case "btn-percent":
                if (displayValue !== "0") {
                    displayValue = (Number(displayValue) / 100).toString()
                }
                break;
        }

        if (displayValue.length > 1 && displayValue[0] === "0" && displayValue[1] !== ".") {                //if there is a zero at the beginning but no decimal, slice off zero
            displayValue = displayValue.slice(1, displayValue.length)
        }

        if (displayValue[0] === "-" && displayValue[1] === "0" && displayValue[2] !== ".") {                //same as below, except for negative numbers
            displayValue = displayValue[0] + displayValue[displayValue.length - 1];
        }

        displayValueEl.textContent = displayValue;
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
    num1 = null;
    num2 = null;
    operator = "";
    displayValue = "0";
    memoryEl.textContent = ""
    result = "";
    numKeysUntouched = true;
    errorEncountered = false;
    console.log("Memory cleared!")
}

function equals() {
    if (equalsButton 
        || memoryEl.textContent.includes("x")
        || memoryEl.textContent.includes("/")
        || memoryEl.textContent.includes("+")
        || memoryEl.textContent.charAt(memoryEl.textContent.length - 2 === "-")) {                          //check if calculation actually needs to happen
            num2 = Number(displayValue)
            checkForIllegalOperation();

            if (!errorEncountered) {
                console.log(`first number is ${num1}`);
                console.log(`the second number is ${num2}`)
                memoryEl.textContent += num2;
                result = Math.round((operate(operator, num1, num2)) * 100000000) / 100000000;
                console.log(`result of calculation is ${result}`)
                num1 = result;
                memoryEl.textContent = num1;

                num2 = null;///
                operator = "";//
                displayValue = "0";
                numKeysUntouched = true;
            }
    }
    equalsButton = false;

    isFirstOperation();
}

function clickDelete() {
    if (displayValue.length === 2 && displayValue.charAt(0) === "-") {                              
        displayValue = "0"
    } else {
        if (displayValue.charAt(displayValue.length - 2) === ".") {                                     //if there is a decimal that isnt followed by a number, get rid of it
            displayValue = displayValue.slice(0, displayValue.length - 1)
        }

        if (displayValue.length === 1) {                                                                //if a single number is on the display, set to 0, if it is already 0, clear calculator
            if (displayValue !== "0") {
                displayValue = "0"
            } else { 
                clear()
            }
        }
        else if (displayValue.length > 1) {                                                             //if number starts with 0, remove 0
            displayValue = displayValue.slice(0, displayValue.length - 1);        
        } else {
            displayValue = "0";
        }
    }
}

function isFirstOperation() {
    if (!result && !errorEncountered) {
        num1 = Number(displayValue);
        console.log(`first operation, first number is ${num1}`)
        displayValue = "0";
        numKeysUntouched = true;
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

function pressOperatorButton (currentOperator) {
    if (!result && displayValue === "0" && memoryEl.textContent === "") {                           //if an operator is pressed before entering a number, use 0 as first number
        num1 = Number(displayValue); 
    }

    if ((operator !== "" && numKeysUntouched)) {                                                    //allow change of operator until a second number is entered
        operator = currentOperator
        updateOperatorDisplay(operator)               
    } else if (operator !== "" && !numKeysUntouched) {                                              //if a second number was entered, perform calculation instead
        equals()
    }
    operator = currentOperator;
    if (!numKeysUntouched) {equals()}              
    updateOperatorDisplay(operator)
}

function add (a, b) {                                                                               //below functions perform actual operations
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

function numberTooLong() {
    return displayValue.length > 15
}

function checkForIllegalOperation () {                                                              //prevent division by 0
    if (operator === "/" && num2 === 0) {
        console.log("you tried to be sneaky")
        errorEncountered = true;
        displayErrorMessage()
    }
}

function displayErrorMessage () {
        memoryEl.textContent = ""
        displayValue = "we dont do that around here"
}

//implement display length limit and result rounding

//fix pesky error: sometimes when the operator display is updated, operator is undefined