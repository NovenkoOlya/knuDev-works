import {score} from './localStorage.js'

export let btnSend = document.querySelector('.send-button')
export let btnUpdate = document.querySelector('.update-button')
let headerMark = document.querySelector('.header-mark')
export let quizQuestion = document.querySelectorAll(".quiz-question")

const outputMark = (score) => {
    return `
        <p class="mark-score">Mark: ${score}/6</p>
    `
}

export const addResultMark = () => {
    headerMark.innerHTML = outputMark(score)
}

export const disableAnswers = (question) => {
    question.querySelectorAll('input[type="radio"]').forEach(input => {
        input.disabled = true
    })
}
