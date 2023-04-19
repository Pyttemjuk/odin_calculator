'use strict';

// Calculator, display window and clear button
const calculatorEl = document.querySelector('.calculator');
const displayTopEl = document.querySelector('.display-top');
const displayBottomEl = document.querySelector('.display-bottom');
const calculatorBtns = document.querySelector('.calculator-btns');

let operation = '';
let decimal = false;
let currentNumber = 0;
let previousNumber = 0;
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
    const previousAction = calculatorEl.dataset.previousAction;

    doCalculations(action, previousAction, key);
    displayString(action, previousAction, key);

    calculatorEl.dataset.previousAction = action;
  }
});

function doCalculations(action, previousAction, key) {
  if (!action) {
    if (operation === 'equals') {
      currentNumber = parseFloat(key.textContent);
      currentSum = 0;
    }

    if (currentNumber === 0) {
      currentNumber = parseFloat(key.textContent);
    } else {
      currentNumber = parseFloat(currentNumber.toString() + key.textContent);
    }
    decimal = false;
  }

  if (action === 'decimal') {
    if (operation === 'equals') {
      return;
    }

    if (!displayBottomEl.textContent.includes('.')) {
      currentNumber = displayBottomEl.textContent;
      decimal = true;
    }
  }

  if (action === 'plus-minus') {
    if (previousAction === 'equals') {
      currentSum = -currentSum;
    } else {
      currentNumber = -currentNumber;
    }
  }

  if (action === 'clear') {
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

    if (operation === 'divide' && currentNumber === 0) {
      return;
    }

    if (previousAction === 'undefined' || previousAction === 'plus-minus') {
      if (currentSum === 0) {
        currentSum = currentNumber;
      } else {
        currentSum = calculate(operation, currentSum, currentNumber);
      }
    }

    operation = action;
    currentNumber = 0;
  }

  if (action === 'equals') {
    if (
      decimal ||
      !operation ||
      operation === 'equals' ||
      (operation === 'divide' && parseFloat(displayBottomEl.textContent) === 0)
    ) {
      return;
    }

    currentSum = calculate(operation, currentSum, currentNumber);
    previousNumber = currentNumber;
    currentNumber = 0;
    operation = 'equals';
  }
}

function displayString(action, previousAction, key) {
  if (!action) {
    if (operation !== 'equals' && displayBottomEl.textContent.length >= 10) {
      return;
    }

    if (operation === 'equals') {
      displayTopEl.textContent = '';
      displayBottomEl.textContent = key.textContent;
    } else if (displayBottomEl.textContent === '0') {
      displayBottomEl.textContent = key.textContent;
    } else {
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
    displayTopEl.textContent =
      currentSum +
      ' ' +
      document.querySelector(`[data-action=${action}]`).textContent;
    displayBottomEl.textContent = '';
  }

  if (action === 'equals') {
    if (
      decimal ||
      !operation ||
      previousAction === 'equals' ||
      (operation === 'divide' && parseFloat(displayBottomEl.textContent) === 0)
    ) {
      return;
    }

    displayTopEl.textContent += ' ' + previousNumber;
    displayBottomEl.textContent = currentSum;
  }
}
