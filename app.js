const display = document.querySelector(".display");
const numberBtns = document.querySelector(".calc");
const deleteBtn = document.querySelector(".delete");
const clearBtn = document.querySelector(".clear");
const operatorBtns = document.querySelector(".b-cont");
const equalsBtn = document.querySelector(".equals");

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
    typeof firstNumber === "number" &&
    typeof secondNumber !== "number"
  ) {
    clearDisplay();
    displayNumbers(e);
    storeNumInArray(e, secondNumber);
  } else if (
    e.target.matches(".numbers") &&
    typeof firstNumber === "number" &&
    typeof secondNumber === "number"
  ) {
    clearDisplay();
    displayNumbers(e);
    storeNumInArray(e, numbersAfter);
  }
});

operatorBtns.addEventListener("click", (e) => {
  const operator = document.querySelector(".op");
  if (
    e.target.matches(".operator") &&
    !operator &&
    typeof firstNumber !== "number"
  ) {
    convertArrayToNum(firstNumber);
    firstNumber = temp;
    storeOperator(e);
  } else if (
    e.target.matches(".operator") &&
    typeof firstNumber === "number" &&
    typeof secondNumber === "number" &&
    !operator
  ) {
    storeOperator(e);
  }
});

equalsBtn.addEventListener("click", () => {
  if (typeof secondNumber === "object" && !solution) {
    convertArrayToNum(secondNumber);
    secondNumber = temp;
    const displayNumber = document.querySelectorAll(".number");
    displayNumber.forEach((number) => {
      display.removeChild(number);
    });
    displaySolution();
  } else if (solution) {
    convertArrayToNum(numbersAfter);
    numbersAfter = temp;
    const displayNumber = document.querySelectorAll(".number");
    displayNumber.forEach((number) => {
      display.removeChild(number);
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
  limit--;
  num1.pop();
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

function storeNumInArray(e, variable) {
  variable.push(e.target.textContent);
}

function convertArrayToNum(array) {
  temp = parseInt(array.join(""));
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
