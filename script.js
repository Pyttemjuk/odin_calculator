'use strict';

// Calculator, display window and clear button
const calculatorEl = document.querySelector('.calculator');
const displayTopEl = document.querySelector('.display-top');
const displayBottomEl = document.querySelector('.display-bottom');
const calculatorBtns = document.querySelector('.calculator-btns');

let previousOperation = '';
let decimal = false;
let currentNumber = 0;
let currentSum = 0;

function calculate(operator, firstNumber, secondNumber) {
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
      if (previousOperation === 'equals') {
        currentNumber = parseFloat(displayBottomEl.textContent);
        currentSum = 0;
        previousOperation = '';
      }

      decimal = false;
      currentNumber = parseFloat(displayBottomEl.textContent);
    }

    if (action === 'decimal') {
      if (previousOperation === 'equals') {
        return;
      }

      if (!displayBottomEl.textContent.includes('.')) {
        currentNumber = displayBottomEl.textContent;
        decimal = true;
      }
    }

    if (action === 'plus-minus') {
      if (previousOperation === 'equals') {
        currentSum = parseFloat(displayBottomEl.textContent);
      } else {
        currentNumber = parseFloat(displayBottomEl.textContent);
      }
    }

    if (action === 'clear') {
      currentNumber = 0;
      currentSum = 0;
      previousOperation = '';
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

      //prettier-ignore
      if (
        (action === 'divide' && currentNumber === 0) ||
        (currentSum === 0 && currentNumber === 0)
        ) {
          previousOperation = action;
          return;
        }

      if (!previousOperation) {
        previousOperation = action;
      }

      if (currentSum && previousOperation === 'equals') {
      } else if (currentSum === 0) {
        currentSum = parseFloat(displayBottomEl.textContent);
      } else {
        currentSum = calculate(previousOperation, currentSum, currentNumber);
      }

      previousOperation = action;
      currentNumber = 0;
    }

    if (action === 'equals') {
      if (
        decimal ||
        previousOperation === 'equals' ||
        !previousOperation ||
        (previousOperation === 'divide' &&
          parseFloat(displayBottomEl.textContent) === 0)
      ) {
        return;
      }

      currentSum = calculate(previousOperation, currentSum, currentNumber);
      currentNumber = 0;
      previousOperation = 'equals';
    }

    displayString(action, key);
  }
});

function displayString(action, key) {
  if (!action) {
    if (
      previousOperation !== 'equals' &&
      displayBottomEl.textContent.length >= 10
    ) {
      return;
    }

    if (previousOperation === 'equals') {
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

  if (
    action === 'add' ||
    action === 'subtract' ||
    action === 'multiply' ||
    action === 'divide'
  ) {
    if (!currentNumber) {
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

    displayTopEl.textContent =
      currentSum +
      ' ' +
      document.querySelector(`[data-action=${action}]`).textContent;
    displayBottomEl.textContent = '';
  }

  if (action === 'equals') {
    displayTopEl.textContent += ' ' + currentNumber;
    displayBottomEl.textContent = currentSum;
  }
}
