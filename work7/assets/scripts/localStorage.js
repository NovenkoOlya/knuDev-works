import { btnRefresh } from './dom.js'
let cardsList = []

const addListItem = () => {
    list.innerHTML = ''

    toDo.sort((a, b) => a.isChecked - b.isChecked)

    toDo.forEach((item, index) => {
        list.innerHTML += createElement(item, index)
    })

    updateLocal()
}