import { title, btnRefresh, langChange, inputCity, selectUnit, enableUnits, updateWeatherUI } from "./dom.js"
export const translations = {
    en: {
        title: "Weather Forecast",
        btnRefresh: "Refresh",
        inputCity: "Search Location...",
        selectUnit: "Select unit:",
        enableUnits: {
            default: "--Please choose an option--",
            metric: "Metric",
            imperial: "Imperial"
        },
        langChange: "EN",
        cardMin: "min",
        cardMax: "max",
        windSpeed: "Wind Speed",
        windGusts: "Gusts of Wind",
        humidity: "Humidity",
        chancePrecipitation: "Chance of Precipitation",
        cloudiness: "Cloudiness",
        visibility: "Visibility",
        pressure: "Pressure",
    },
    ua: {
        title: "Прогноз погоди",
        btnRefresh: "Оновити",
        inputCity: "Знайти місто...",
        selectUnit: "Система вимірювання:",
        enableUnits: {
            default: "--Виберіть систему одиниць--",
            metric: "Метрична",
            imperial: "Імперська"
        },
        langChange: "UA",
        cardMin: "мін.",
        cardMax: "макс.",
        windSpeed: "Швидкість вітру",
        windGusts: "Пориви вітру",
        humidity: "Вологість",
        chancePrecipitation: "Можливість опадів",
        cloudiness: "Хмарність",
        visibility: "Видимість",
        pressure: "Тиск",
    }
}

export function changeLanguage(lang) {
    title.textContent = translations[lang].title
    btnRefresh.textContent = translations[lang].btnRefresh
    langChange.textContent = translations[lang].langChange
    inputCity.placeholder = translations[lang].inputCity
    selectUnit.textContent = translations[lang].selectUnit

    enableUnits.querySelector('option[value="default"]').textContent = translations[lang].enableUnits.default
    enableUnits.querySelector('option[value="metric"]').textContent = translations[lang].enableUnits.metric
    enableUnits.querySelector('option[value="imperial"]').textContent = translations[lang].enableUnits.imperial

    localStorage.setItem("language", lang)
}