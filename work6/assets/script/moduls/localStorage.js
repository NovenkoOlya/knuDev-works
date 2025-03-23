import { quizQuestion, addResultMark, disableAnswers } from "./dom.js"
import { timePerQuestion} from "./timers.js"

export let score = JSON.parse(localStorage.getItem('score')) || 0

export const updateScore = (newScore) => {
    score = newScore
    localStorage.setItem('score', JSON.stringify(score))
}

export const updateLocal = () => {
    let selectedAnswers = {}
    let disabledInputs = {}
    let questionTimers = {}
    
    document.querySelectorAll('input[type="radio"]').forEach(input => {
        let questionId = input.name
        if (input.checked) {
            selectedAnswers[questionId] = {
                index: Array.from(input.closest(".quiz-question").querySelectorAll('input[type="radio"]')).indexOf(input),
                value: input.value,
                correct: input.dataset.correct === "true",
                parentClass: input.closest(".answer-option").classList.value
            }
        }
        disabledInputs[input.name + input.value] = input.disabled
    })

    quizQuestion.forEach((question, index) => {
        let timerDisplay = question.querySelector(".time-left")
        questionTimers[index] = timerDisplay ? parseInt(timerDisplay.textContent) : timePerQuestion
    })

    let questionsState = Array.from(quizQuestion).map((q, index) => ({
        timerActive: q.dataset.timerActive,
        questionClass: q.classList.value,
        answerOptionsClass: Array.from(q.querySelectorAll(".answer-option")).map(option => option.classList.value),
        timerReachedZero: questionTimers[index] <= 0
    }))

    localStorage.setItem('score', JSON.stringify(score))
    localStorage.setItem('selectedAnswers', JSON.stringify(selectedAnswers))
    localStorage.setItem('disabledInputs', JSON.stringify(disabledInputs))
    localStorage.setItem('questionTimers', JSON.stringify(questionTimers))
    localStorage.setItem('questionsState', JSON.stringify(questionsState))
}

export const loadStateFromLocalStorage = () => {
    let selectedAnswers = JSON.parse(localStorage.getItem('selectedAnswers')) || {}
    let disabledInputs = JSON.parse(localStorage.getItem('disabledInputs')) || {}
    let questionTimers = JSON.parse(localStorage.getItem('questionTimers')) || {}
    let questionsState = JSON.parse(localStorage.getItem('questionsState')) || []
    score = JSON.parse(localStorage.getItem('score')) || 0

    quizQuestion.forEach((question, index) => {
        let timerDisplay = question.querySelector(".time-left")
        if (timerDisplay) {
            timerDisplay.textContent = questionTimers[index] !== undefined ? questionTimers[index] : timePerQuestion
            if (parseInt(timerDisplay.textContent) <= 5) {
                timerDisplay.classList.add("warning")
            }
            
            if (questionsState[index] && questionsState[index].timerReachedZero) {
                disableAnswers(question)
                timerDisplay.textContent = 0
            }
        }

        if (questionsState[index]) {
            question.dataset.timerActive = questionsState[index].timerActive
            question.className = questionsState[index].questionClass
            question.querySelectorAll(".answer-option").forEach((option, i) => {
                option.className = questionsState[index].answerOptionsClass[i]
            })
        }

        question.querySelectorAll('input[type="radio"]').forEach((input, inputIndex) => {
            if (disabledInputs[input.name + input.value]) {
                input.disabled = true
            }

            let answerData = selectedAnswers[input.name]
            if (answerData && answerData.index === inputIndex) {
                input.checked = true
            }
        })
    })
    addResultMark()
}

export const clearStorage = () => {
    localStorage.clear()
    location.reload()
}