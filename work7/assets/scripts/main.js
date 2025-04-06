import { processWeatherData } from "./weatherService.js"
import { inputCity, updateWeatherUI, btnSend, outputCurrentDayWeather,
     btnRefresh, refreshOutput, langChange, enableUnits } from './dom.js'
import { fetchWeatherData, fetchTodayWeather } from './api.js'
import { cardsList, updateLocal, loadLocal, clearLocal } from './localStorage.js'
import { changeLanguage } from './changeLanguage.js'

async function performService(city) {
    try {
        if (!city) return

        let weatherData = await fetchWeatherData(city)
        if (!weatherData) return

        let todayWeather = await fetchTodayWeather(city)
        if (!todayWeather) return

        let dailyForecast = processWeatherData(weatherData)

        updateWeatherUI(dailyForecast)
        outputCurrentDayWeather(todayWeather)

        const selectedUnit = enableUnits.value
        localStorage.setItem("units", selectedUnit)

        cardsList.push({ city, dailyForecast, todayWeather })
        updateLocal()
    } catch (error) {
        console.error("Error retrieving weather:", error)
        alert("Could not get weather forecast.")
    }
}

setInterval(() => {
    const city = inputCity.value.trim()
    if (city) {
        performService(city)
    }
}, 10 * 60 * 1000)

inputCity.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
        const city = inputCity.value.trim()
        performService(city)
    }
})

function handleWeatherRequest() {
    const city = inputCity.value.trim()
    performService(city)
}

btnSend.addEventListener("click", handleWeatherRequest)

btnRefresh.addEventListener("click", () => {
    clearLocal()
    refreshOutput()
})

langChange.addEventListener("click", () => {
    const currentLang = localStorage.getItem("language") || "ua"
    const newLang = currentLang === "ua" ? "en" : "ua"

    localStorage.setItem("language", newLang)

    changeLanguage(newLang)

    const city = inputCity.value.trim()

    if (city) {
        performService(city)
    }

    const btn = document.getElementById("lang-switch")
    btn.classList.toggle("active")
})

document.addEventListener("DOMContentLoaded", () => {
    const savedUnit = localStorage.getItem("units") || "metric"
    enableUnits.value = savedUnit

    const savedLang = localStorage.getItem("language") || "ua"

    changeLanguage(savedLang)
    
    const btn = document.getElementById("lang-switch")
    if (savedLang === "en") {
        btn.classList.add("active")
    } else {
        btn.classList.remove("active")
    }

    const city = inputCity.value.trim()
    if (city) {
        performService(city)
    }

    loadLocal()

    if (cardsList.length > 0) {
        console.log("Data from local storage loaded:", cardsList)
        
        cardsList.forEach(({ dailyForecast, todayWeather }) => {
            updateWeatherUI(dailyForecast)
            outputCurrentDayWeather(todayWeather)
        })
    } else {
        console.log("There is no data saved in localStorage.")
    }
})

