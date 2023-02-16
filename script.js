'use strict'

// Display window and clear button
const displayTopEl = document.querySelector('.display-top')
const displayBottomEl = document.querySelector('.display-bottom')
const calculatorBtns = document.querySelector('.calculator-btns')

let operation = ''
let decimal = false
let currentNumber = 0
let currentSum = 0

// Functions
const add = (firstNumber, secondNumber) => firstNumber + secondNumber
const subtract = (firstNumber, secondNumber) => firstNumber - secondNumber
const divide = (firstNumber, secondNumber) => firstNumber / secondNumber
const multiply = (firstNumber, secondNumber) => firstNumber * secondNumber

const calculator = (operator, firstNumber, secondNumber) => {
  switch (operator) {
    case 'add':
      return add(firstNumber, secondNumber)
    case 'subtract':
      return subtract(firstNumber, secondNumber)
    case 'divide':
      return divide(firstNumber, secondNumber)
    case 'multiply':
      return multiply(firstNumber, secondNumber)
  }
}

calculatorBtns.addEventListener('click', (e) => {
  if (e.target.matches('button')) {
    const key = e.target
    const action = key.dataset.action
    const displayValue = displayBottomEl.textContent

    if (!action) {
      if (operation === 'equals') {
        currentSum = 0
        displayTopEl.textContent = ''
        operation = ''
        displayBottomEl.textContent = key.textContent
      } else if (displayValue === '0') {
        displayBottomEl.textContent = key.textContent
      } else if (displayValue !== 0) {
        displayBottomEl.textContent += key.textContent
      }

      decimal = false
      currentNumber = parseFloat(displayBottomEl.textContent)
    }

    if (action === 'decimal') {
      if (!displayValue.includes('.')) {
        displayBottomEl.textContent += !displayValue ? '0.' : '.'
        currentNumber = displayBottomEl.textContent
        decimal = true
      }
    }

    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      if (decimal) {
        return
      }

      if (!displayValue) {
        operation = action
        displayTopEl.textContent =
          parseFloat(displayTopEl.textContent) +
          ' ' +
          document.querySelector(`[data-action=${action}]`).textContent
        return
      }

      if (!operation) {
        operation = action
      }

      displayTopEl.textContent =
        displayValue +
        ' ' +
        document.querySelector(`[data-action=${action}]`).textContent

      if (currentSum && operation === 'equals') {
        operation = action
        displayTopEl.textContent =
          currentSum +
          ' ' +
          document.querySelector(`[data-action=${operation}]`).textContent
        displayBottomEl.textContent = ''
      } else if (
        (action === 'divide' && currentNumber === 0) ||
        (currentSum === 0 && currentNumber === 0)
      ) {
        operation = action
        return
      } else if (currentSum === 0) {
        currentSum = parseFloat(displayValue)
        operation = action
        displayTopEl.textContent =
          currentSum +
          ' ' +
          document.querySelector(`[data-action=${operation}]`).textContent
        displayBottomEl.textContent = ''
      } else {
        currentSum = calculator(operation, currentSum, currentNumber)
        operation = action
        displayTopEl.textContent =
          currentSum +
          ' ' +
          document.querySelector(`[data-action=${operation}]`).textContent
        displayBottomEl.textContent = ''
      }

      displayBottomEl.textContent = ''
    }

    if (action === 'plus-minus') {
      displayBottomEl.textContent =
        parseFloat(displayValue) < 0
          ? -parseFloat(displayValue)
          : 0 - parseFloat(displayValue)
    }

    if (action === 'clear') {
      currentNumber = 0
      currentSum = 0
      operation = ''
      displayBottomEl.textContent = 0
      displayTopEl.textContent = ''
    }

    if (action === 'equals') {
      if (
        decimal ||
        operation === 'equals' ||
        !currentSum ||
        !operation ||
        (operation === 'divide' && parseFloat(displayValue) === 0)
      ) {
        return
      } else {
        displayTopEl.textContent += ' ' + currentNumber
        currentSum = calculator(operation, currentSum, currentNumber)
        displayBottomEl.textContent = currentSum
        currentNumber = 0
        operation = 'equals'
      }
    }
  }
})
