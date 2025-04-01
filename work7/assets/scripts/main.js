import { processWeatherData } from "./weatherService.js"
import {inputCity, updateWeatherUI, btnSend, outputCurrentDayWeather } from './dom.js'
import { fetchWeatherData, fetchTodayWeather } from './api.js'

async function performService() {
    try {
        let city = inputCity.value.trim()
        if (!city) return

        // Отримуємо дані для поточної погоди
        let weatherData = await fetchWeatherData(city)
        if (!weatherData) return

        // Отримуємо дані для поточної погоди (без forecast)
        let todayWeather = await fetchTodayWeather(city)
        if (!todayWeather) return

        // Обробка даних прогнозу на кілька днів
        let dailyForecast = processWeatherData(weatherData)


        // Виводимо прогноз на кілька днів
        updateWeatherUI(dailyForecast)
        // Виводимо поточну погоду
        outputCurrentDayWeather(todayWeather)
    } catch (error) {
        console.error("Error retrieving weather:", error)
        alert("Could not get weather forecast.")
    }
}

inputCity.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
        performService()
    }
})

function handleWeatherRequest() {
    performService()
}

btnSend.addEventListener("click", handleWeatherRequest)