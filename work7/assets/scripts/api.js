import { enableUnits, langChange } from "./dom.js"

const APIKey = "a0abf325a5252652c8445c7b65a1de30"

export async function fetchGeocoding(city) {
    let geoData = await fetchGeocodingData(city)
    if (!geoData) return
}

async function fetchGeocodingData(city) {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKey}`
    try {
        let response = await fetch(url)
        if (!response.ok) throw new Error("API Error")
        
        let data = await response.json()
        if (data.length === 0) throw new Error("The city you requested could not be found.")
        
        return { lat: data[0].lat, lon: data[0].lon }
    } catch (error) {
        console.error("Error:", error.message)
        alert(error.message)
        return null
    }
}

export async function fetchWeatherData(city) {
    let geoData = await fetchGeocodingData(city)
    if (!geoData) return

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${geoData.lat}&lon=${geoData.lon}&appid=${APIKey}&lang=${langChange.textContent}&units=${enableUnits.value}`

    try {
        let response = await fetch(url)
        if (!response.ok) throw new Error("API Error")

        let weatherData = await response.json()
        return weatherData
    } catch (error) {
        console.error("Error:", error.message)
        return null
    }
}

export async function fetchTodayWeather(city) {
    let geoData = await fetchGeocodingData(city)
    if (!geoData) return

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${geoData.lat}&lon=${geoData.lon}&appid=${APIKey}&lang=${langChange.textContent}&units=${enableUnits.value}`

    try {
        let response = await fetch(url)
        if (!response.ok) throw new Error("API Error")

        let weatherData = await response.json()
        return weatherData
    } catch (error) {
        console.error("Error:", error.message)
        return null
    }
}