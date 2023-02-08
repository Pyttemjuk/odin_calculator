'use strict'

// Display window and clear button
const display = document.querySelector('.display')
const clear = document.querySelector('.clear')

// Numbers
const zero = document.querySelector('.zero')
const one = document.querySelector('.one')
const two = document.querySelector('.two')
const three = document.querySelector('.three')
const four = document.querySelector('.four')
const five = document.querySelector('.five')
const six = document.querySelector('.six')
const seven = document.querySelector('.seven')
const eight = document.querySelector('.eight')
const nine = document.querySelector('.nine')

// Operators
const add = document.querySelector('.add')
const subtract = document.querySelector('.subtract')
const divide = document.querySelector('.divide')
const multiply = document.querySelector('.multiply')
const equal = document.querySelector('.equal')

// Functions
const Add = (number1, number2) => number1 + number2
const Subtract = (number1, number2) => number1 - number2
const Divide = (number1, number2) => number1 / number2
const Multiply = (number1, number2) => number1 * number2

const operate = (operator, number1, number2) => operator(number1, number2)
