export let inputCity = document.getElementById("input-city")
export let btnSend = document.getElementById("search-btn")
export let btnRefresh = document.getElementById("btn-refresh")
let fieldCards = document.getElementById("weather-cards")
let weatherSummary = document.getElementById("weather-summary")

function addActiveClass() {
    let fieldContainers = document.getElementsByClassName("field-container")
    for (let i = 0; i < fieldContainers.length; i++) {
        fieldContainers[i].classList.add("active")
    }
}

export function updateWeatherUI(dailyForecast) {
    addActiveClass()
    if (!fieldCards) {
        console.error("Error: Element #weather-cards not found!")
        return
    }
    fieldCards.innerHTML = ''

    Object.entries(dailyForecast).forEach(([date, weather]) => {
        let iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`
        fieldCards.innerHTML += `
        <li class="card">
            <p class="weather-date">${date}</p>
            <div class="weather-image">
                <img src="${iconUrl}" alt="${weather.weatherMain}">
            </div>
            <div class="weather">
                <p class="weather-name">${weather.weatherMain}</p>
            </div>
            <div class="temperature">
                <div class="temperature-col">
                    <p>min</p>
                    <p class="temp min">${weather.minTemp}°C</p>
                </div>
                <div class="temperature-col">
                    <p>max</p>
                    <p class="temp max">${weather.maxTemp}°C</p>
                </div>
            </div>
        </li>
        `
    })
}

export function outputCurrentDayWeather(todayWeather) {
    if (!todayWeather) return;

    let iconUrl = `https://openweathermap.org/img/wn/${todayWeather.weather[0].icon}@2x.png`;

    weatherSummary.innerHTML = `
    <div class="weather-forecast">
        <div class="weather-dataset">
            <p class="weather-city">${todayWeather.name}</p>
            <p class="weather-date">${new Date().toLocaleDateString()}</p>
        </div>
        <div class="temperature">
            <p class="today-temp">${todayWeather.main.temp.toFixed(1)}°C</p>
            <img src="${iconUrl}" alt="${todayWeather.weather[0].main}">
        </div>
        <p class="weather-name">${todayWeather.weather[0].main}</p>
        <div class="weather">
            <p class="weather-condition">Wind Speed: ${todayWeather.wind.speed} m/s</p>
            <p class="weather-condition">Gusts of Wind: ${todayWeather.wind.gust || 'N/A'} m/s</p>
            <p class="weather-condition">Humidity: ${todayWeather.main.humidity}%</p>
            <p class="weather-condition">Chance of Precipitation: ${todayWeather.pop ? (todayWeather.pop * 100) : 0}%</p>
            <p class="weather-condition">Cloudiness: ${todayWeather.clouds.all}%</p>
            <p class="weather-condition">Visibility: ${todayWeather.visibility / 1000} km</p>
            <p class="weather-condition">Pressure: ${todayWeather.main.pressure} hPa</p>
        </div>
    </div>`
}
