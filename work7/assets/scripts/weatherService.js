export function processWeatherData(weatherData) {
    if (!weatherData || !weatherData.list) return {}

    let dailyForecast = {}

    weatherData.list.forEach((item) => {
        let date = item.dt_txt.split(" ")[0]

        if (!dailyForecast[date]) {
            dailyForecast[date] = {
                minTemp: item.main.temp_min,
                maxTemp: item.main.temp_max,
                weatherMain: item.weather[0].main,
                windSpeed: item.wind.speed,
                windGusts: item.wind.gust,
                humidity: item.main.humidity,
                chanceFall: item.pop,
                cloudiness: item.clouds.all,
                visibility: item.visibility,
                pressure: item.pressure,
                icon: item.weather[0].icon
            }
        } else {
            dailyForecast[date].minTemp = Math.min(dailyForecast[date].minTemp, item.main.temp_min)
            dailyForecast[date].maxTemp = Math.max(dailyForecast[date].maxTemp, item.main.temp_max)
        }
    })

    return dailyForecast
}