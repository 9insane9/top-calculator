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

//when result exists and a new number is entered without an operator, delete result+

//need to be still able to continuosly multiply with the multiply button, 
//without needing to press the equals button

clear() //for now, this fixes bug that occurs when you enter the first number immediately
//after starting the calculator

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
                if (result && displayValue.length <= 1) {//looks ok for now
                    if (displayValue !== "0") {
                        displayValue = "0"
                    } else { 
                        clear()
                    }
                } else if (displayValue < 10) {

                }
                else if (displayValue.length > 1) {//if number starts with 0, remove 0
                    displayValue = displayValue.slice(0, displayValue.length - 1);
                } else {
                    displayValue = "0";
                }
                break;
            case "btn-multiply":
                operator = "*";
                if (memoryEl.textContent.includes("x")) {
                    num2 = Number(displayValue);
                    equals()
                }

                //if (result) {
                    // equals()
                    // num2 = 0;}else
                if (result || memoryEl.textContent) {
                    //console.log(memoryEl.textContent)
                    //num1 = Number(memoryEl.textContent.slice(0))//extract number from memory if memory exists
                    console.log(typeof num1);
                    console.log(`first number for continuous multiplication is ${num1}`)//suddenly number turns into 0
                } 
                else { //
                    num1 = Number(displayValue);
                }

                if (!result) {
                    displayValue = "0";
                    }
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
            case "btn-equals": //this could be a function?
                //
                num2 = Number(displayValue);
                equals();
                break;
        }

        // if (result && operator === "" && displayValue !== "0") {
        //     result = 0;
        //     memoryEl.textContent = result;
        // }
        

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

function equals () {
    console.log(`the second number is ${num2}`)
    memoryEl.textContent += num2;
    console.log(typeof num1);
    console.log(typeof num2);
    result = operate(operator, num1, num2);
    console.log(`result of calculation is ${result}`)
    num1 = result;
    memoryEl.textContent = num1; 
    console.log(num1)
    //operator = "";
    displayValue = "0";
}

//fix issues that start with 0