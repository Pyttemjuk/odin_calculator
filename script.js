'use strict'

// Display window and clear button
const displayEl = document.querySelector('.display')
const clearEl = document.querySelector('.clear')

// Numbers
const zeroEl = document.querySelector('.zero')
const oneEl = document.querySelector('.one')
const twoEl = document.querySelector('.two')
const threeEl = document.querySelector('.three')
const fourEl = document.querySelector('.four')
const fiveEl = document.querySelector('.five')
const sixEl = document.querySelector('.six')
const sevenEl = document.querySelector('.seven')
const eightEl = document.querySelector('.eight')
const nineEl = document.querySelector('.nine')

// Operators
const addEl = document.querySelector('.add')
const subtractEl = document.querySelector('.subtract')
const divideEl = document.querySelector('.divide')
const multiplyEl = document.querySelector('.multiply')
const equalEl = document.querySelector('.equal')

// Functions
const add = (number1, number2) => number1 + number2
const subtract = (number1, number2) => number1 - number2
const divide = (number1, number2) => number1 / number2
const multiply = (number1, number2) => number1 * number2

const operate = (operator, number1, number2) => operator(number1, number2)
