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

function displayNumbers() {
  buttons.addEventListener("click", (e) => {
    const displayContent = document.createElement("div");
    display.appendChild(displayContent);
    displayContent.textContent = e.target.textContent;
  });
}

displayNumbers();
