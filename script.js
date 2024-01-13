function add (a, b) {
    return a + b
}

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
// let memoryValue = "";

const memoryEl = document.querySelector(".display-top");
const displayValueEl = document.querySelector(".display-bottom");
const buttonList = document.querySelectorAll("button");

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
                console.log("cleared?")
                clear();
                break;
            case "btn-delete":
                if (result) {//questionable?
                    clear()
                }
                else if (displayValue.length > 1) {//if number starts with 0, remove 0
                    displayValue = displayValue.slice(0, displayValue.length - 1);
                } else {
                    displayValue = "0";
                }
                break;
            case "btn-multiply":
                operator = "*";

                if (result) {
                    num1 = result;
                } else {
                    num1 = Number(displayValue);
                }

                displayValue = "0";
                memoryEl.textContent = "";
                memoryEl.textContent += `${num1} x `;
                console.log(`first number is ${num1}`);
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
            // case "btn-point":
            //     break;
            case "btn-equals":
                num2 = Number(displayValue);
                memoryEl.textContent += num2;
                result = operate(operator, num1, num2);
                console.log(result)
                memoryEl.textContent = result;
                num1 = result;
                console.log(num1)
                operator = "";
                displayValue = "0";
                break;
         }

        if (displayValue.length > 1 && displayValue[0] === "0") {
            displayValue = displayValue.slice(1, displayValue.length)
        }
            
        displayValueEl.textContent = displayValue;

        //console.clear()
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

function clear () {
    num1 = 0;
    num2 = 0;
    operator = "";
    displayValue = "0";
    memoryEl.textContent = ""
    result = "";
    
}

//fix issues that start with 0