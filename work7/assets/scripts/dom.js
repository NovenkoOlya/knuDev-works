import { translations } from "./changeLanguage.js"

export let title = document.querySelector("h1")
export let inputCity = document.getElementById("input-city")
export let btnSend = document.getElementById("search-btn")
export let btnRefresh = document.getElementById("btn-refresh")
export let fieldCards = document.getElementById("weather-cards")
export let weatherSummary = document.getElementById("weather-summary")
export let enableUnits = document.getElementById("enable-units")
export let langChange = document.getElementById("lang-switch")
export let selectUnit = document.getElementById("select-unit")

let hoursForecast = document.getElementById("hours-forecast")

let temperatureChart

function addActiveClass() {
  let fieldContainers = document.getElementsByClassName("field-container")
  for (let i = 0; i < fieldContainers.length; i++) {
    fieldContainers[i].classList.add("active")
  }
}

function delActiveClass() {
  let fieldContainers = document.getElementsByClassName("field-container")
  for (let i = 0; i < fieldContainers.length; i++) {
    fieldContainers[i].classList.remove("active")
  }
}

export function refreshOutput() {
  fieldCards.innerHTML = ""
  weatherSummary.innerHTML = ""
  hoursForecast.innerHTML = ""
  delActiveClass()
  hoursForecast.classList.remove("active")
  temperatureChart.destroy()
}

export function updateWeatherUI(dailyForecast) {
  addActiveClass()
  if (!fieldCards) {
    console.error("Error: Element #weather-cards not found!")
    return
  }
  const language = langChange.textContent.toLowerCase()
  fieldCards.innerHTML = ""
  weatherSummary.innerHTML = ""
  hoursForecast.classList.remove("active")
  clearTemperatureChart()

  Object.entries(dailyForecast).forEach(([date, weather]) => {
    let iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`    
    let temperatureMin = enableUnits.value === "metric" ? weather.minTemp + "°C" : weather.minTemp + "°F"   
    let temperatureMax = enableUnits.value === "metric" ? weather.maxTemp + "°C" : weather.maxTemp + "°F"   
    const cardElement = `
        <li class="card" data-date="${date}">
            <p class="weather-date">${date}</p>
            <div class="weather-image">
                <img src="${iconUrl}" alt="${weather.weatherMain}">
            </div>
            <div class="weather">
                <p class="weather-name">${weather.weatherDescription.charAt(0).toUpperCase() + weather.weatherDescription.slice(1)}</p>
            </div>
            <div class="temperature">
                <div class="temperature-col">
                    <p>${translations[language].cardMin}</p>
                    <p class="temp min">${temperatureMin}</p>
                </div>
                <div class="temperature-col">
                    <p>${translations[language].cardMax}</p>
                    <p class="temp max">${temperatureMax}</p>
                </div>
            </div>
        </li>
        `
    fieldCards.innerHTML += cardElement
  })
  setupCardClickHandlers(dailyForecast)
}

export function outputCurrentDayWeather(todayWeather) {
  if (!todayWeather) return
  let iconUrl = `https://openweathermap.org/img/wn/${todayWeather.weather[0].icon}@2x.png`

  let temperature = enableUnits.value === "metric" ? 
  todayWeather.main.temp.toFixed(1) + "°C" : todayWeather.main.temp.toFixed(1) + "°F"

  let windSpeedUnit = langChange.textContent === "UA" 
  ? (enableUnits.value === "metric" ? "м/с" : "миль/год") 
  : (enableUnits.value === "metric" ? "m/s" : "mph")

  let windSpeed = enableUnits.value === "metric"
  ? todayWeather.wind.speed + ` ${windSpeedUnit}`
  : todayWeather.wind.speed + ` ${windSpeedUnit}`

  let windGust = enableUnits.value === "metric" 
  ? todayWeather.wind.gust + ` ${windSpeedUnit}` 
  : todayWeather.wind.gust + ` ${windSpeedUnit}`

  let visibilityUnit = langChange.textContent === "UA" 
  ? (enableUnits.value === "metric" ? "км" : "милі") 
  : (enableUnits.value === "metric" ? "km" : "mi")

  let visibility = enableUnits.value === "metric" 
  ? todayWeather.visibility / 1000 + ` ${visibilityUnit}`
  : (todayWeather.visibility / 1609.34).toFixed(1) + ` ${visibilityUnit}`

  let pressureUnit = langChange.textContent === "UA" ? "гПа" : "hPa"
  let pressure = todayWeather.main.pressure + ` ${pressureUnit}`

  weatherSummary.innerHTML = `
    <div class="weather-forecast">
        <div class="weather-dataset">
            <p class="weather-city">${todayWeather.name}</p>
            <p class="weather-date">${new Date().toLocaleDateString()}</p>
        </div>
        <div class="temperature">
            <p class="today-temp">${temperature}</p>
            <img src="${iconUrl}" alt="${todayWeather.weather[0].main}">
        </div>
        <p class="weather-name">${todayWeather.weather[0].description.charAt(0).toUpperCase()
           + todayWeather.weather[0].description.slice(1)}</p>
        <div class="weather">
            <p class="weather-condition">${langChange.textContent === "UA" 
              ? "Швидкість вітру:" : "Wind Speed:"} ${windSpeed}</p>
            <p class="weather-condition">${langChange.textContent === "UA" 
              ? "Пориви вітру:" : "Gusts of Wind:"} ${windGust || "N/A"}</p>
            <p class="weather-condition">${langChange.textContent === "UA" 
              ? "Вологість:" : "Humidity:"} ${todayWeather.main.humidity}%</p>
            <p class="weather-condition">${langChange.textContent === "UA" 
              ? "Можливість опади:" : "Chance of Precipitation:"} ${todayWeather.pop
                 ? todayWeather.pop * 100 : 0}%</p>
            <p class="weather-condition">${langChange.textContent === "UA" 
              ? "Хмарність:" : "Cloudiness:"} ${todayWeather.clouds.all}%</p>
            <p class="weather-condition">${langChange.textContent === "UA" 
              ? "Видимість:" : "Visibility:"} ${visibility}</p>
            <p class="weather-condition">${langChange.textContent === "UA" 
              ? "Тиск:" : "Pressure:"} ${pressure}</p>
        </div>
    </div>`
}

export function outputHoursForecast(hourlyItems, selectedDate) {
  if (!Array.isArray(hourlyItems)) {
    console.error("Invalid hourly forecast data:", hourlyItems)
    return
  }

  hoursForecast.classList.add("active")
  hoursForecast.innerHTML = ""

  const temperatures = []
  const times = []

  hourlyItems.forEach(hour => {
    let temperature = enableUnits.value === "metric"
      ? hour.main.temp.toFixed(1) + "°C"
      : hour.main.temp.toFixed(1) + "°F"

    const iconUrl = `https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`
    const forecastTime = new Date(hour.dt_txt).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })

    temperatures.push(enableUnits.value === "metric" ? hour.main.temp.toFixed(1) : (hour.main.temp * 9 / 5 + 32).toFixed(1))
    times.push(new Date(hour.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))

    hoursForecast.innerHTML += `
      <div class="hour-forecast">
          <div class="hour-temperature">
              <img src="${iconUrl}" alt="${hour.weather[0].main}">
              <p class="hour-temp">${temperature}</p>
          </div>
          <div class="weather-set">
              <p class="weather-time">${forecastTime}</p>
          </div>
      </div>
    `
  })
}

function clearTemperatureChart() {
  if (temperatureChart) {
    temperatureChart.destroy()
    temperatureChart = null
  }
}

function createTemperatureChart(temperatures, times, selectedDate) {
  const ctx = document.getElementById('temperatureChart').getContext('2d')
  if (temperatureChart) {
    temperatureChart.destroy()
  }
  temperatureChart = new Chart(ctx, {
    type: 'line', 
    data: {
      labels: times,
      datasets: [{
        label: `Temperature for ${selectedDate}`,
        data: temperatures,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  })
}

function setupCardClickHandlers(dailyForecast) {
  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
      const date = card.dataset.date

      if (!date || !dailyForecast[date] || !dailyForecast[date].hours) {
        console.warn("No hourly data found for date:", date)
        return
      }

      outputHoursForecast(dailyForecast[date].hours, date)

      createTemperatureChart(dailyForecast[date].hours.map(hour => hour.main.temp), 
                             dailyForecast[date].hours.map(hour => new Date(hour.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
                             date)
    })
  })
}

