const btn = document.querySelector('.btn-add')
const inputText = document.querySelector('.input')
const list = document.querySelector('.list')

let toDo = []

if (!localStorage.toDo) {
    toDo = []
} else {
    toDo = JSON.parse(localStorage.getItem('toDo'))
}

btn.addEventListener('click', () => {
    let textValue = inputText.value
    if (textValue.trim() === "") return

    let today = new Date()
    let date = today.toLocaleDateString()
    let time = today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    let dateTimeString = `${date} ${time}`

    toDo.unshift({ text: textValue, createdAt: dateTimeString, isChecked: false })
    updateLocal()
    addListItem()
})

const createElement = (item, index) => {
    return `
    <li class="list_item ${item.isChecked ? 'changed' : ''}">
        <button class="btn-del" onclick="delElement(${index})">x</button>
        <input type="checkbox" onclick="checkElement(${index})" ${item.isChecked ? 'checked' : ''}>
        <p class="text-element ${item.isChecked ? 'strike' : ''}" contenteditable="true" oninput="editText(${index})">${item.text}</p>   
        <div class="datetime">${item.createdAt}</div>
    </li>
    `
}


const addListItem = () => {
    list.innerHTML = ''

    toDo.sort((a, b) => a.isChecked - b.isChecked)

    toDo.forEach((item, index) => {
        list.innerHTML += createElement(item, index)
    })

    updateLocal()
}



const updateLocal = () => {
    localStorage.setItem('toDo', JSON.stringify(toDo))
}

const delElement = (index) => {
    toDo.splice(index, 1)
    addListItem()
    updateLocal()
}

function editText(index) {
    const p = document.querySelectorAll('.text-element')[index]
    toDo[index].text = p.textContent
    updateLocal()
}

const checkElement = (index) => {
    const [task] = toDo.splice(index, 1, {
        ...toDo[index], 
        isChecked: !toDo[index].isChecked
    })

    const text = document.querySelectorAll('.text-element')[index]
    const block = document.querySelectorAll('.list_item')[index]

    text.classList.toggle('strike', toDo[index].isChecked)
    block.classList.toggle('changed', toDo[index].isChecked)
    
    if (toDo[index].isChecked) {
        toDo.push(toDo.splice(index, 1)[0])
    }

    updateLocal()
    addListItem()
}

addListItem()
