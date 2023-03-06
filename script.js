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

    if (action === 'plus-minus') {
      displayString(action, key);
    }

    if (action === 'clear') {
      displayString(action, key);
      currentNumber = 0;
      currentSum = 0;
      operation = '';
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

      if (!operation) {
        operation = action;
      }

      if (!currentNumber) {
        operation = action;
        displayTopEl.textContent =
          currentSum +
          ' ' +
          document.querySelector(`[data-action=${action}]`).textContent;
        displayBottomEl.textContent = '';
        return;
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
        displayTopEl.textContent =
          currentSum +
          ' ' +
          document.querySelector(`[data-action=${action}]`).textContent;
      } else if (currentSum === 0) {
        currentSum = parseFloat(displayBottomEl.textContent);
        displayTopEl.textContent =
          currentSum +
          ' ' +
          document.querySelector(`[data-action=${action}]`).textContent;
      } else {
        currentSum = calculator(operation, currentSum, currentNumber);
        displayTopEl.textContent =
          currentSum +
          ' ' +
          document.querySelector(`[data-action=${action}]`).textContent;
      }

      operation = action;
      currentNumber = '';
      displayBottomEl.textContent = '';
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
        currentSum = calculator(operation, currentSum, currentNumber);
        displayString(action, key);
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

  if (action === 'plus-minus') {
    if (!displayBottomEl.textContent) return;

    displayBottomEl.textContent =
      parseFloat(displayBottomEl.textContent) < 0
        ? -parseFloat(displayBottomEl.textContent)
        : 0 - parseFloat(displayBottomEl.textContent);
  }

  if (action === 'clear') {
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
      (operation === 'divide' && parseFloat(displayBottomEl.textContent) === 0)
    ) {
      return;
    } else {
      displayTopEl.textContent += ' ' + currentNumber;
      displayBottomEl.textContent = currentSum;
    }
  }
}
