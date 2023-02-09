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
  parseInt(firstNumber) + parseInt(secondNumber)
const subtract = (firstNumber, secondNumber) =>
  parseInt(firstNumber) - parseInt(secondNumber)
const divide = (firstNumber, secondNumber) =>
  parseInt(firstNumber) / parseInt(secondNumber)
const multiply = (firstNumber, secondNumber) =>
  parseInt(firstNumber) * parseInt(secondNumber)

const calculator = (operator, firstNumber, secondNumber) => {
  switch (operator) {
    case 'add':
      return add(firstNumber, secondNumber)
    case 'subtract':
      subtract(firstNumber, secondNumber)
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
      displayValue += '.'
      displayBottomEl.textContent = displayValue
    }

    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      operation = action
      if (firstNumber === 0) {
        firstNumber = displayValue
        displayTopEl.textContent = displayBottomEl.textContent
        displayValue = 0
        displayBottomEl.textContent = 0
      } else {
        secondNumber = displayValue
        firstNumber += calculator(action, firstNumber, secondNumber)
        displayTopEl.textContent = firstNumber
      }
    }

    if (action === 'clear') {
      console.log('clear')
    }

    if (action === 'equals') {
    }
  }
})
