export let cardsList = []
const EXPIRATION_KEY = 'cardsListExpiration'
const EXPIRATION_TIME = 10 * 60 * 1000 

export const loadLocal = () => {
    const expirationTime = localStorage.getItem(EXPIRATION_KEY)
    if (expirationTime && Date.now() > expirationTime) {
        clearLocal()
    }

    const storedData = localStorage.getItem('cardsList')
    cardsList = storedData ? JSON.parse(storedData) : []
}

export const updateLocal = () => {
    localStorage.setItem('cardsList', JSON.stringify(cardsList))
    localStorage.setItem(EXPIRATION_KEY, Date.now() + EXPIRATION_TIME)
}

export const clearLocal = () => {
    localStorage.removeItem('cardsList')
    localStorage.removeItem(EXPIRATION_KEY)
    cardsList = []
}