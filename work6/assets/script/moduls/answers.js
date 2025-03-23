import { disableAnswers, addResultMark } from "./dom.js"
import { score, updateScore } from "./localStorage.js"

export const showAnswers = () => {
    let selectedAnswerOptions = document.querySelectorAll('input[type="radio"]:checked')
    updateScore(0)
    selectedAnswerOptions.forEach(selectedInput => {
        if (selectedInput.dataset.correct === "true") {
            selectedInput.closest(".answer-option").classList.add("correct")
            updateScore(score + 1)
        } else {
            selectedInput.closest(".answer-option").classList.add("incorrect")
        }
        disableAnswers(selectedInput.closest(".quiz-question"))
    })
    addResultMark()
}
