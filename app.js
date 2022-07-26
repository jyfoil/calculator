const display = document.querySelector(".display");
const numberBtns = document.querySelector(".calc");
const deleteBtn = document.querySelector(".delete");
const clearBtn = document.querySelector(".clear");
const operatorBtns = document.querySelector(".b-cont");
const equalsBtn = document.querySelector(".equals");

let limit = 0;
let firstNumber = [];
let secondNumber = [];
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
    typeof firstNumber === "number"
  ) {
    clearDisplay();
    displayNumbers(e);
    storeNumInArray(e, secondNumber);
  }
});

operatorBtns.addEventListener("click", (e) => {
  if (e.target.matches(".operator")) {
    convertArrayToNum(firstNumber);
    firstNumber = temp;
    storeOperator(e);
  }
});

equalsBtn.addEventListener("click", () => {
  convertArrayToNum(secondNumber);
  secondNumber = temp;
  const displayNumber = document.querySelectorAll(".number");
  displayNumber.forEach((number) => {
    display.removeChild(number);
  });
  displaySolution();
});

deleteBtn.addEventListener("click", () => {
  if (checkForValues()) {
    deleteLastNum();
  }
});

clearBtn.addEventListener("click", clearNumbers);

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

function clearNumbers() {
  const displayContent = document.querySelectorAll(".number");
  displayContent.forEach((content) => {
    display.removeChild(content);
  });
  num1 = [];
  limit = 0;
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
  const displayValue = document.createElement("div");
  display.appendChild(displayValue);
  displayValue.textContent = calculate();
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
  if (sign === "operator plus") {
    return operate(add, firstNumber, secondNumber);
  } else if (sign === "operator sub") {
    return operate(subtract, firstNumber, secondNumber);
  } else if (sign === "operator multi") {
    return operate(multiply, firstNumber, secondNumber);
  } else if (sign === "operator divide") {
    return operate(divide, firstNumber, secondNumber);
  }
}
