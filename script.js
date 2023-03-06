'use strict';

// Display window and clear button
const displayTopEl = document.querySelector('.display-top');
const displayBottomEl = document.querySelector('.display-bottom');
const calculatorBtns = document.querySelector('.calculator-btns');

let operation = '';
let decimal = false;
let currentNumber = 0;
let currentSum = 0;

function calculator(operator, firstNumber, secondNumber) {
  if (operator === 'add') return firstNumber + secondNumber;

  if (operator === 'subtract') return firstNumber - secondNumber;

  if (operator === 'divide') return firstNumber / secondNumber;

  if (operator === 'multiply') return firstNumber * secondNumber;
}

calculatorBtns.addEventListener('click', (e) => {
  if (e.target.matches('button')) {
    const key = e.target;
    const action = key.dataset.action;

    if (!action) {
      displayString(action, key);

      if (operation === 'equals') {
        currentSum = 0;
        operation = '';
      }

      decimal = false;
      currentNumber = parseFloat(displayBottomEl.textContent);
    }

    if (action === 'decimal') {
      if (!displayBottomEl.textContent.includes('.')) {
        displayString(action, key);
        currentNumber = displayBottomEl.textContent;
        decimal = true;
      }
    }

    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      if (decimal) {
        return;
      }

      if (!displayBottomEl.textContent) {
        operation = action;
        displayTopEl.textContent =
          currentSum +
          ' ' +
          document.querySelector(`[data-action=${action}]`).textContent;
        currentNumber = '';
        return;
      }

      if (!operation) {
        operation = action;
      }

      displayTopEl.textContent =
        displayBottomEl.textContent +
        ' ' +
        document.querySelector(`[data-action=${action}]`).textContent;

      //prettier-ignore
      if (
        (action === 'divide' && 
        (currentNumber === 0 || !currentNumber)) ||
        (currentSum === 0 && currentNumber === 0)
      ) {
        operation = action;
        return;
      }

      if (currentSum && operation === 'equals') {
        operation = action;
        displayTopEl.textContent =
          currentSum +
          ' ' +
          document.querySelector(`[data-action=${action}]`).textContent;
      } else if (currentSum === 0) {
        currentSum = parseFloat(displayBottomEl.textContent);
        operation = action;
        displayTopEl.textContent =
          currentSum +
          ' ' +
          document.querySelector(`[data-action=${action}]`).textContent;
      } else {
        currentSum = calculator(operation, currentSum, currentNumber);
        operation = action;
        displayTopEl.textContent =
          currentSum +
          ' ' +
          document.querySelector(`[data-action=${action}]`).textContent;
      }

      currentNumber = '';
      displayBottomEl.textContent = '';
    }

    if (action === 'plus-minus') {
      if (!displayBottomEl.textContent) return;

      displayBottomEl.textContent =
        parseFloat(displayBottomEl.textContent) < 0
          ? -parseFloat(displayBottomEl.textContent)
          : 0 - parseFloat(displayBottomEl.textContent);
    }

    if (action === 'clear') {
      currentNumber = 0;
      currentSum = 0;
      operation = '';
      displayBottomEl.textContent = 0;
      displayTopEl.textContent = '';
    }

    if (action === 'equals') {
      if (
        decimal ||
        operation === 'equals' ||
        !currentNumber ||
        !currentSum ||
        !operation ||
        (operation === 'divide' &&
          parseFloat(displayBottomEl.textContent) === 0)
      ) {
        return;
      } else {
        displayTopEl.textContent += ' ' + currentNumber;
        currentSum = calculator(operation, currentSum, currentNumber);
        displayBottomEl.textContent = currentSum;
        currentNumber = '';
        operation = 'equals';
      }
    }
  }
});

function displayString(action, key) {
  if (!action) {
    if (displayBottomEl.textContent.length === 10) {
      return;
    }

    if (operation === 'equals') {
      displayTopEl.textContent = '';
      displayBottomEl.textContent = key.textContent;
    } else if (currentNumber === 0 || !currentNumber) {
      displayBottomEl.textContent = key.textContent;
    } else if (currentNumber !== 0) {
      displayBottomEl.textContent += key.textContent;
    }
  }

  if (action === 'decimal') {
    if (!displayBottomEl.textContent.includes('.')) {
      displayBottomEl.textContent += !displayBottomEl.textContent ? '0.' : '.';
    }
  }
}
