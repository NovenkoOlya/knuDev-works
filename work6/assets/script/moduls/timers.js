import { disableAnswers } from "./dom.js"
import { updateLocal } from "./localStorage.js"

let timers = {}
export let timePerQuestion = 10

export const timerOperation = (question, index) => {
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
                timerDisplay.classList.add("warning")
            }
            if (timeLeft <= 0) {
                clearInterval(timers[index])
                disableAnswers(question)
                timerDisplay.textContent = 0
                updateLocal()
            }
        }, 1000)

        question.querySelectorAll('input[type="radio"]').forEach(input => {
            input.addEventListener("change", () => {
                clearInterval(timers[index])
                disableAnswers(question)
                updateLocal()
            })
        })
    })
}
