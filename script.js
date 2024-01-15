function add (a, b) {
    return a + b
}
//main
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

const memoryEl = document.querySelector(".display-top");
const displayValueEl = document.querySelector(".display-bottom");
const buttonList = document.querySelectorAll("button");

clear() //for now, this fixes bug that occurs when you enter the first number immediately after starting the calculator

buttonList.forEach(button => {
    button.addEventListener("click", (e) => {
        switch (e.target.getAttribute("id")) {
            case "btn-num0":
                if (displayValue !== "0") {
                    displayValue += "0";
                }
                break;
            case "btn-num1":
                displayValue += "1";
                break;
            case "btn-num2":
                displayValue += "2";
                break;
            case "btn-num3":
                displayValue += "3";
                break;
            case "btn-num4":
                displayValue += "4";
                break;
            case "btn-num5":
                displayValue += "5";
                break;
            case "btn-num6":
                displayValue += "6";
                break;
            case "btn-num7":
                displayValue += "7";
                break;
            case "btn-num8":
                displayValue += "8";
                break;
            case "btn-num9":
                displayValue += "9";
                break;
            case "btn-clear":
                console.log("Memory cleared!")
                clear();
                break;
            case "btn-delete":
                pressDelete()
                break;
            case "btn-multiply":
                operator = "*";
                if (memoryEl.textContent.includes("x")) {
                    num2 = Number(displayValue);
                    equals()
                }
                if (result || memoryEl.textContent) {
                    console.log(`first number for continuous ${operator} is ${num1}`)
                }
                else { //
                    num1 = Number(displayValue);
                    console.log(`this is the first operation, first number is ${num1}`)
                }

                if (!result) {
                    displayValue = "0";
                    }
                
                memoryEl.textContent = "";
                memoryEl.textContent += `${num1} x `;

                break;
            case "btn-divide":
                operator = "/"
                break;
            case "btn-add":
                operator = "+"
                break;
            case "btn-substract":
                operator = "-"
                break;
            // case "btn-point": //implement decimals and rounding
            //     break;
            case "btn-equals": //does "=" need to be another operator?
                //
                num2 = Number(displayValue);
                equals();
                break;
        }

        if (displayValue.length > 1 && displayValue[0] === "0") { //if number starts with zero, get rid of the zero
            displayValue = displayValue.slice(1, displayValue.length)
        }
            
        displayValueEl.textContent = displayValue;

        console.log(displayValue);
        console.log(num1)
    })
}) 

function operate (operator, num1, num2) {
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
    num1 = 0;
    num2 = 0;
    operator = "";
    displayValue = "0";
    memoryEl.textContent = ""
    result = "";
}

function equals() {


    console.log(`operation is ${operator}`)
    console.log(`first number is ${num1}`);
    console.log(`the second number is ${num2}`)
    memoryEl.textContent += num2; //might be pointless, gets replaced before you get to see it, useful for debugging though
    result = operate(operator, num1, num2);
    console.log(`result of calculation is ${result}`)
    num1 = result;
    memoryEl.textContent = num1; 
    displayValue = "0";
}

function pressDelete() {
    if (displayValue.length <= 1) {//looks ok for now
        if (displayValue !== "0") {
            displayValue = "0"
        } else { 
            clear()
        }
    } else if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, displayValue.length - 1);
    } else {
        displayValue = "0";
    }
}