import { timerOperation } from './moduls/timers.js'
import { updateLocal, loadStateFromLocalStorage, clearStorage } from './moduls/localStorage.js'
import { showAnswers } from './moduls/answers.js'
import { btnSend, btnUpdate, quizQuestion } from './moduls/dom.js'

quizQuestion.forEach((question, index) => {
    timerOperation(question, index)
}) 


btnSend.addEventListener("click", () => {
    showAnswers()
    updateLocal()
})

btnUpdate.addEventListener("click", function() {
    clearStorage()
})

document.addEventListener("DOMContentLoaded", () => {
    loadStateFromLocalStorage()
})