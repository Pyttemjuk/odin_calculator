'use strict'

// Display window and clear button
const displayEl = document.querySelector('.display')
const calculatorBtns = document.querySelector('.calculator-btns')

let displayValue = 0
let inputValue, operation
let firstNumber,
  secondNumber = 0

// Functions
const add = (number1, number2) => number1 + number2
const subtract = (number1, number2) => number1 - number2
const divide = (number1, number2) => number1 / number2
const multiply = (number1, number2) => number1 * number2

const operate = (operator, number1, number2) => operator(number1, number2)

calculatorBtns.addEventListener('click', (e) => {
  if (e.target.matches('button')) {
    const key = e.target
    const action = key.dataset.action

    if (!action) {
      inputValue = key.textContent

      if (displayValue === 0) {
        displayValue = inputValue
        displayEl.textContent = displayValue
      } else if (displayValue !== 0) {
        displayValue += inputValue
        displayEl.textContent = displayValue
      }
    }

    if (action === 'decimal') {
      console.log('decimal')
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
      console.log('equals')
    }
  }
})
