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

function operate(operator, num1, num2) {
  return operator(num1, num2);
}

const display = document.querySelector(".display");
const buttons = document.querySelector(".calc");
let limit = 0;

function displayNumbers() {
  buttons.addEventListener("click", (e) => {
    if (e.target.matches(".numbers") && limit < 9) {
      const displayContent = document.createElement("div");
      display.appendChild(displayContent);
      displayContent.textContent = e.target.textContent;
      limit++;
    }
  });
}

displayNumbers();
