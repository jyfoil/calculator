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

const display = document.querySelector(".display");
const buttons = document.querySelector(".calc");
let limit = 0;
let num1 = [];
let num2 = [];
let sign;

function displayNumbers() {
  buttons.addEventListener("click", (e) => {
    if (e.target.matches(".numbers") && limit < 9) {
      const displayContent = document.createElement("div");
      displayContent.classList.add("number");
      display.appendChild(displayContent);
      displayContent.textContent = e.target.textContent;
      limit++;
    }
  });
}

function deleteNum() {
  buttons.addEventListener("click", (e) => {
    if (e.target.matches(".delete") && limit > 0) {
      display.removeChild(display.lastElementChild);
      limit--;
      num1.pop();
    }
  });
}

function clearDisplay() {
  buttons.addEventListener("click", (e) => {
    if (e.target.matches(".clear") && limit > 0) {
      const displayContent = document.querySelectorAll(".number");
      displayContent.forEach((content) => {
        display.removeChild(content);
      });
      num1 = [];
      limit = 0;
    }
  });
}

function storeFirstNumAndOperator() {
  buttons.addEventListener("click", (e) => {
    if (e.target.matches(".numbers") && limit < 9 && typeof num1 !== "number") {
      num1.push(e.target.textContent);
    } else if (e.target.matches(".operator") && typeof num1 !== "number") {
      const displayContent = document.querySelectorAll(".number");
      displayContent.forEach((content) => {
        display.removeChild(content);
      });
      limit = 0;
      num1 = +num1.join("");
      sign = e.target.classList.value;
    }
  });
}

storeFirstNumAndOperator();
clearDisplay();
deleteNum();
displayNumbers();
