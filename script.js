'use strict'

// Display window and clear button
const displayEl = document.querySelector('.display')
const calculatorBtns = document.querySelector('.calculator-btns')

let displayValue, inputValue, operation

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
      displayValue = key.textContent
      displayEl.textContent = displayValue
    }

    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide' ||
      action === 'equals'
    ) {
      console.log(action)
    }

    if (action === 'clear') {
      console.log(action)
    }
  }
})
