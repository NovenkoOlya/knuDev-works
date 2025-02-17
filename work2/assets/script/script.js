function getRandomNumber() {
    return Math.floor(Math.random() * 101) 
}

let inputNumber = document.querySelector(".main__number-guess") 

let buttonGuess = document.querySelector(".main__btn-guess") 
let buttonClear = document.querySelector(".main__btn-clear") 
let buttonAnswer = document.querySelector(".main__btn-answer")

let randomNumber = JSON.parse(localStorage.getItem('randomNumber')) || getRandomNumber() 
localStorage.setItem('randomNumber', JSON.stringify(randomNumber)) 

let consoleMessages = JSON.parse(localStorage.getItem('consoleMessages')) || [] 

const originalLog = console.log 
console.log = function(...args) {
    originalLog(...args) 
    let message = args.join(' ') 
    if (!consoleMessages.includes(message)) {  
        consoleMessages.push(message) 
        localStorage.setItem('consoleMessages', JSON.stringify(consoleMessages)) 
    }
} 

const originalError = console.error 
console.error = function(...args) {
    originalError(...args) 
    let message = 'ERROR: ' + args.join(' ') 
    if (!consoleMessages.includes(message)) { 
        consoleMessages.push(message) 
        localStorage.setItem('consoleMessages', JSON.stringify(consoleMessages)) 
    }
} 

window.addEventListener('DOMContentLoaded', () => {
    consoleMessages.forEach(message => console.log(message)) 
}) 

buttonAnswer.addEventListener("click", function() {
    console.log(randomNumber) 
})

buttonGuess.addEventListener("click", function() {
    console.log(inputNumber.value)
    try {
        let userInput = inputNumber.value.trim() 
        if (userInput === "") {
            throw new Error("It must be a number!") 
        } else{
            localStorage.setItem('inputNumber', JSON.stringify(userInput))
        }

        let guessedNumber = Number(userInput) 
        
        if (guessedNumber === randomNumber) {
            console.log("Ви вгадали число") 
            inputNumber.value = "" 
            randomNumber = getRandomNumber() 
            localStorage.setItem('randomNumber', JSON.stringify(randomNumber)) 
        } else if (guessedNumber > randomNumber) {
            console.log("Загадане число менше") 
        } else {
            console.log("Загадане число більше") 
        }

        inputNumber.value = "" 

    } catch (error) {
        console.error(error.message) 
    }
}) 

buttonClear.addEventListener("click", function(){
    console.clear() 
    localStorage.clear() 
    consoleMessages = []   
}) 
