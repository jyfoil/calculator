const display = document.querySelector(".display");
const numberBtns = document.querySelector(".calc");
const deleteBtn = document.querySelector(".delete");
const clearBtn = document.querySelector(".clear");
const operatorBtns = document.querySelector(".b-cont");

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
    displayNumbers(e);
    storeNumInArray(e, secondNumber);
  }
});

operatorBtns.addEventListener("click", (e) => {
  if (e.target.matches(".operator")) {
    convertArrayToNum(firstNumber);
    storeOperator(e);
  }
});

deleteBtn.addEventListener("click", () => {
  if (checkForValues()) {
    deleteLastNum();
  }
});

clearBtn.addEventListener("click", clearDisplay);

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

function clearDisplay() {
  const displayContent = document.querySelectorAll(".number");
  displayContent.forEach((content) => {
    display.removeChild(content);
  });
  num1 = [];
  limit = 0;
}

function storeNumInArray(e, variable) {
  variable.push(e.target.textContent);
}

function convertArrayToNum(array) {
  firstNumber = parseInt(array.join(""));
}

function storeOperator(e) {
  sign = e.target.classList.value;
  const displayNumber = document.querySelectorAll(".number");
  displayNumber.forEach((number) => {
    display.removeChild(number);
  });
  limit = 0;
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
