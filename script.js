'use strict'

// Display window and clear button
const displayEl = document.querySelector('.display')
const displayTopEl = document.querySelector('.display-top')
const displayBottomEl = document.querySelector('.display-bottom')
const calculatorBtns = document.querySelector('.calculator-btns')

let operation
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
    const displayValue = displayBottomEl.textContent

    if (!action) {
      if (displayValue === '0') {
        displayBottomEl.textContent = key.textContent
      } else if (displayValue !== 0) {
        displayBottomEl.textContent += key.textContent
      }
    }

    if (action === 'decimal') {
      if (!displayValue.includes('.')) {
        displayBottomEl.textContent += '.'
      }
    }

    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      if (operation === 'divide' && parseFloat(displayValue) === 0) {
        operation = action
        return
      } else if (firstNumber === 0) {
        firstNumber = displayValue
        operation = action
        displayTopEl.textContent = displayBottomEl.textContent
        displayBottomEl.textContent = 0
      } else {
        secondNumber = displayValue
        firstNumber = calculator(operation, firstNumber, secondNumber)
        operation = action
        displayTopEl.textContent = firstNumber
        displayBottomEl.textContent = 0
      }
    }

    if (action === 'clear') {
      console.log('clear')
    }

    if (action === 'equals') {
    }
    if (
      !firstNumber ||
      !operation ||
      (operation === 'divide' && parseFloat(displayValue) === 0)
    )
      return

    secondNumber = calculator(operation, firstNumber, displayValue)
    displayTopEl.textContent = secondNumber
    displayBottomEl.textContent = 0
  }
})
