'use strict'

// Display window and clear button
const displayEl = document.querySelector('.display')
const displayTopEl = document.querySelector('.display-top')
const displayBottomEl = document.querySelector('.display-bottom')
const calculatorBtns = document.querySelector('.calculator-btns')

let displayValue = 0
let inputValue, operation
let firstNumber,
  secondNumber = 0

// Functions
const add = (firstNumber, secondNumber) => firstNumber + secondNumber
const subtract = (firstNumber, secondNumber) => firstNumber - secondNumber
const divide = (firstNumber, secondNumber) => firstNumber / secondNumber
const multiply = (firstNumber, secondNumber) => firstNumber * secondNumber

const calculator = (operator, firstNumber, secondNumber) =>
  operator(firstNumber, secondNumber)

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
      } else {
        secondNumber = displayValue
      }
    }

    if (action === 'clear') {
      console.log('clear')
    }

    if (action === 'equals') {
    }
  }
})
