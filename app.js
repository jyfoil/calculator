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
let num1 = [];

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

function storeFirstNumArray() {
  buttons.addEventListener("click", (e) => {
    if (e.target.matches(".numbers") && limit < 9) {
      num1.push(e.target.textContent);
    }
  });
}

function joinFirstNumArray() {
  buttons.addEventListener("click", (e) => {
    if (e.target.matches(".operator")) {
      const displayContent = document.querySelectorAll(".number");
      displayContent.forEach((content) => {
        display.removeChild(content);
      });
      num1 = +num1.join("");
    }
  });
}

storeFirstNumArray();
joinFirstNumArray();
clearDisplay();
deleteNum();
displayNumbers();
