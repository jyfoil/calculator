const display = document.querySelector(".display");
const numberBtns = document.querySelector(".calc");
const deleteBtn = document.querySelector(".delete");
const clearBtn = document.querySelector(".clear");
const operatorBtns = document.querySelector(".b-cont");
const equalsBtn = document.querySelector(".equals");
const decimalBtn = document.querySelector(".decimal");

let limit = 0;
let firstNumber = [];
let secondNumber = [];
let numbersAfter = [];
let solution;
let temp;
let sign;

numberBtns.addEventListener("click", (e) => {
  if (
    e.target.matches(".numbers") &&
    limit < 9 &&
    typeof firstNumber !== "number"
  ) {
    displayNumbers(e);
    storeNumInArray(e, firstNumber);
  } else if (
    e.target.matches(".numbers") &&
    limit < 9 &&
    typeof secondNumber !== "number"
  ) {
    clearDisplay();
    displayNumbers(e);
    storeNumInArray(e, secondNumber);
  } else if (
    e.target.matches(".numbers") &&
    typeof secondNumber === "number" &&
    display.lastChild.matches(".answer")
  ) {
    clearEverything();
    displayNumbers(e);
    storeNumInArray(e, firstNumber);
  } else if (
    e.target.matches(".numbers") &&
    typeof secondNumber === "number" &&
    limit < 9
  ) {
    clearDisplay();
    displayNumbers(e);
    storeNumInArray(e, numbersAfter);
  }
});

operatorBtns.addEventListener("click", (e) => {
  const operator = document.querySelector(".op");
  const number = document.querySelector(".number");
  if (
    e.target.matches(".operator") &&
    !operator &&
    typeof firstNumber !== "number" &&
    number
  ) {
    convertArrayToNum(firstNumber);
    firstNumber = temp;
    storeOperator(e);
  } else if (
    e.target.matches(".operator") &&
    typeof firstNumber === "number" &&
    !operator &&
    numbersAfter.length === 0 &&
    !(secondNumber.length > 0)
  ) {
    storeOperator(e);
  }
});

equalsBtn.addEventListener("click", () => {
  if (
    typeof secondNumber === "object" &&
    !solution &&
    display.lastChild.matches(".number") &&
    typeof firstNumber === "number"
  ) {
    convertArrayToNum(secondNumber);
    secondNumber = temp;
    const displayItems = document.querySelectorAll(".display > div");
    displayItems.forEach((item) => {
      display.removeChild(item);
    });
    displaySolution();
  } else if (solution && display.lastChild.matches(".number")) {
    convertArrayToNum(numbersAfter);
    numbersAfter = temp;
    const displayItems = document.querySelectorAll(".display > div");
    displayItems.forEach((item) => {
      display.removeChild(item);
    });
    displaySolution();
    numbersAfter = [];
  }
});

deleteBtn.addEventListener("click", () => {
  if (checkForValues()) {
    deleteLastNum();
  }
});

clearBtn.addEventListener("click", clearEverything);

decimalBtn.addEventListener("click", (e) => {
  const decimal = document.querySelector(".deci");
  if (typeof firstNumber !== "number" && firstNumber.length >= 1 && !decimal) {
    addDecimal(e);
    storeNumInArray(e, firstNumber);
  } else if (
    typeof firstNumber === "number" &&
    !decimal &&
    secondNumber.length >= 1
  ) {
    addDecimal(e);
    storeNumInArray(e, secondNumber);
  } else if (
    typeof secondNumber === "number" &&
    !decimal &&
    numbersAfter.length >= 1
  ) {
    addDecimal(e);
    storeNumInArray(e, numbersAfter);
  }
});

function displayNumbers(e) {
  const displayContent = document.createElement("div");
  displayContent.classList.add("number");
  display.appendChild(displayContent);
  displayContent.textContent = e.target.textContent;
  limit++;
}

function checkForValues() {
  if (display.lastElementChild !== null) {
    return true;
  } else false;
}

function deleteLastNum() {
  display.removeChild(display.lastElementChild);
  if (typeof firstNumber !== "number") {
    limit--;
    firstNumber.pop();
  } else if (
    typeof firstNumber === "number" &&
    typeof secondNumber !== "number"
  ) {
    limit--;
    secondNumber.pop();
  }
}

function clearEverything() {
  const displayContent = document.querySelectorAll(".display > div");
  displayContent.forEach((content) => {
    display.removeChild(content);
  });
  limit = 0;
  firstNumber = [];
  secondNumber = [];
  solution = 0;
}

function clearDisplay() {
  const operator = document.querySelector(".op");
  while (display.firstChild && operator) {
    display.removeChild(display.firstChild);
  }
}

function addDecimal(e) {
  const decimal = document.createElement("div");
  decimal.classList.add("deci");
  display.appendChild(decimal);
  decimal.textContent = e.target.textContent;
}

function storeNumInArray(e, variable) {
  variable.push(e.target.textContent);
}

function convertArrayToNum(array) {
  temp = parseFloat(array.join(""));
}

function storeOperator(e) {
  sign = e.target.classList.value;
  const displayOperator = document.createElement("div");
  display.appendChild(displayOperator);
  displayOperator.classList.add("op");
  displayOperator.textContent = e.target.textContent;
  limit = 0;
}

function displaySolution() {
  if (typeof firstNumber === "number" && typeof secondNumber === "number") {
    const displayValue = document.createElement("div");
    display.appendChild(displayValue);
    calculate();
    displayValue.classList.add("answer");
    displayValue.textContent = solution;
  }
}

const add = (a, b) => {
  return a + b;
};

const subtract = (a, b) => {
  return a - b;
};

const multiply = (a, b) => {
  return a * b;
};

const divide = (a, b) => {
  return a / b;
};

function operate(operator, a, b) {
  return operator(a, b);
}

function calculate() {
  if (sign === "operator plus" && !solution) {
    solution = operate(add, firstNumber, secondNumber);
  } else if (sign === "operator sub" && !solution) {
    solution = operate(subtract, firstNumber, secondNumber);
  } else if (sign === "operator multi" && !solution) {
    solution = operate(multiply, firstNumber, secondNumber);
  } else if (sign === "operator divide" && !solution) {
    solution = operate(divide, firstNumber, secondNumber);
  } else if (sign === "operator plus" && solution) {
    solution = operate(add, solution, numbersAfter);
  } else if (sign === "operator sub" && solution) {
    solution = operate(subtract, solution, numbersAfter);
  } else if (sign === "operator multi" && solution) {
    solution = operate(multiply, solution, numbersAfter);
  } else if (sign === "operator divide" && solution) {
    solution = operate(divide, solution, numbersAfter);
  }
}
