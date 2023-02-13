'use strict'

// Display window and clear button
const displayEl = document.querySelector('.display')
const displayTopEl = document.querySelector('.display-top')
const displayBottomEl = document.querySelector('.display-bottom')
const calculatorBtns = document.querySelector('.calculator-btns')

let displayValue = 0
let inputValue, operation
let firstNumber = 0
let secondNumber = 0

// Functions
const add = (firstNumber, secondNumber) =>
  parseFloat(firstNumber) + parseFloat(secondNumber)
const subtract = (firstNumber, secondNumber) =>
  parseFloat(firstNumber) - parseFloat(secondNumber)
const divide = (firstNumber, secondNumber) =>
  parseFloat(firstNumber) / parseFloat(secondNumber)
const multiply = (firstNumber, secondNumber) =>
  parseFloat(firstNumber) * parseFloat(secondNumber)

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

    if (!action) {
      inputValue = key.textContent

      if (displayValue === 0) {
        displayValue = inputValue
        displayBottomEl.textContent = displayValue
      } else if (displayValue !== 0) {
        displayValue += inputValue
        displayBottomEl.textContent = displayValue
      }
    }

    if (action === 'decimal') {
      if (!displayValue.includes('.')) {
        displayValue += '.'
        displayBottomEl.textContent = displayValue
      }
    }

    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      if (firstNumber === 0) {
        firstNumber = displayValue
        operation = action
        displayTopEl.textContent = displayBottomEl.textContent
        displayValue = ''
        displayBottomEl.textContent = ''
      } else {
        if (!displayValue || (displayValue == 0 && operation == 'divide')) {
          return
        } else {
          secondNumber = displayValue
          firstNumber = calculator(operation, firstNumber, secondNumber)
          operation = action
          displayTopEl.textContent = firstNumber
          displayBottomEl.textContent = ''
          displayValue = ''
        }
      }
    }

    if (action === 'clear') {
      console.log('clear')
    }

    if (action === 'equals') {
      console.log('equals')
    }
  }
})
