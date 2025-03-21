let btnAnswerOption = document.querySelectorAll('input[type="radio"]')
let btnSend = document.querySelector('.send-button')
let btnUpdate = document.querySelector('.update-button')
let headerMark = document.querySelector('.header-mark')
let quizQuestion =  document.querySelectorAll(".quiz-question")

let timers = {}
let timePerQuestion = 10



let score = JSON.parse(localStorage.getItem('score')) || 0

const updateLocal = (score, selectedAnswers) => {
    localStorage.setItem('score', JSON.stringify(score))
    localStorage.setItem('selectedAnswers', JSON.stringify(selectedAnswers))
}

btnSend.addEventListener("click", () => {
    let selectedAnswers = {}
    let selectedAnswerOptions = document.querySelectorAll('input[type="radio"]:checked')
    score = 0
    selectedAnswerOptions.forEach(selectedInput => { 
        let questionId = selectedInput.name
        selectedAnswers[questionId] = selectedInput.value
        if (selectedInput.dataset.correct === "true") {
            selectedInput.closest(".answer-option").classList.add("correct")
            score++
        } else {
            selectedInput.closest(".answer-option").classList.add("incorrect")
        }
        updateLocal(score, selectedAnswers)
    })
    addResultMark()
})

const outputMark = (score) => {
    return `
        <p class="mark-score">Mark: ${score}/6</p>
    `
}

const addResultMark = () => {
    headerMark.innerHTML = outputMark(score)
}

quizQuestion.forEach((question, index) => {
    question.addEventListener("click", () => {
        if (question.dataset.timerActive === "true") {
            return
        }
        question.dataset.timerActive = "true"
        let timerDisplay = question.querySelector(".time-left")
        let timeLeft = timePerQuestion
        timerDisplay.textContent = timeLeft
        question.querySelectorAll(".answer-option").forEach(answerOption => {
            answerOption.classList.add("active")
        })
        question.classList.add("showOptions")
        timers[index] = setInterval(() => {
            timeLeft--
            timerDisplay.textContent = timeLeft
            
            if (timeLeft <= 5) {
                timerDisplay.classList.add("warning");
            }
            if(timeLeft <= 0) {
                clearInterval(timers[index])
                disableAnswers(question)
            }
        }, 1000) 
        function disableAnswers(question) {
            question.querySelectorAll('input[type="radio"]').forEach(input => {
                input.disabled = true
            })
        }
        question.querySelectorAll('input[type="radio"]').forEach(input => {
            input.addEventListener("change", () => {
                clearInterval(timers[index])
                question.querySelectorAll('input[type="radio"]').forEach(radio => {
                    radio.disabled = true
                })
            })
        })
    })
})

btnUpdate.addEventListener("click", function() {
    localStorage.clear()
})

document.addEventListener("DOMContentLoaded", () => {
    
})