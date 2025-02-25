const buttonsNumber = document.querySelectorAll(".btn-number")
let calculatorField = document.querySelector(".calculator-screen__field")
let buttonsOperation = document.querySelectorAll(".btn-operation")
let buttonEqualSign = document.querySelector(".equal-sign")
let buttonMathOperation = document.querySelectorAll(".btn-math")
let buttonDelete = document.querySelector(".btn-delete")
let buttonClear = document.querySelector(".btn-clear")
let buttonSubstraction = document.querySelector(".btn-operation-subtraction")
let buttonSqrtRoot = document.querySelector(".square-root")
let buttonExponentiation = document.querySelector(".exponentiation")
let buttonEulersNumber = document.querySelector(".eulers-number")
let buttonPiNumber = document.querySelector(".pi")
let currentOperation = ""
let currentValue = ""
let value = []
let operation = []
let calculationHistory = JSON.parse(localStorage.getItem("calculationHistory")) || []
let listCalculationHistory = document.querySelector(".list-history")

const updateLocal = () => {
    localStorage.setItem("calculationHistory", JSON.stringify(calculationHistory))
}

buttonsNumber.forEach(button => {
    button.onclick = () => {
        const lastChar = calculatorField.textContent.slice(-1)
        if(!["e"].includes(lastChar)) {
            currentValue += button.textContent
            calculatorField.textContent += button.textContent
        }
        
        if (value.length == 0 || operation.length >= value.length) {
            value.push(currentValue)
        }  else {
            value[value.length - 1] = currentValue
        }
        console.log(value)  
    }
}) 

buttonsOperation.forEach(button => {
        button.onclick = () => {
           if (currentValue != "") {
                value.push(currentValue)
                currentValue = ""
            }
            const lastChar = calculatorField.textContent.slice(-1)
            if (calculatorField.textContent.length == 0 || lastChar === "^") {
                if (button.textContent == "-") {
                    currentValue += button.textContent
                    calculatorField.textContent += button.textContent
                    console.log(value)
                }
            } else if (!["+", "-", "*", "/", "^"].includes(lastChar)) {
                operation.push(button.textContent)
                calculatorField.textContent += button.textContent
                console.log(operation)
            }
        }
    }
)

buttonDelete.onclick = () => {
    currentValue = ""
    value.length = 0
    operation.length = 0
    calculatorField.textContent = ""
}

buttonClear.onclick = () => {
    if (calculatorField.textContent.length > 0) {
        const lastChar = calculatorField.textContent.slice(-1)
        calculatorField.textContent = calculatorField.textContent.slice(0, -1)
       
        if (["+", "-", "*", "/", "^"].includes(lastChar)) {
            operation.pop()
        } 
        else {
            if (currentValue.length > 0) {
                currentValue = currentValue.slice(0, -1)
                value[value.length - 1] = currentValue
            } 
            if (value[value.length - 1] == '') {
                value.pop()
                if (value.length > 0) {
                    currentValue = value[value.length - 1]
                } else {
                    currentValue = ''
                }
            }
        }
        console.log(value, operation)
    }
}

buttonEulersNumber.onclick = () => {
    value.pop()
    const lastChar = calculatorField.textContent.slice(-1)
    if (["+", "-", "*", "/", "^", ""].includes(lastChar)) {
        calculatorField.textContent += buttonEulersNumber.textContent
        currentValue += Math.E
        value.push(currentValue)
    }
}

buttonPiNumber.onclick = () => {
    value.pop()
    const lastChar = calculatorField.textContent.slice(-1)
    if (["+", "-", "*", "/", "^", ""].includes(lastChar)) {
        calculatorField.textContent += buttonPiNumber.textContent
        currentValue += Math.PI
        value.push(currentValue)
    }
}

buttonSqrtRoot.onclick = () => {
    let result = Math.sqrt(calculationResult())
    calculatorField.textContent = result
    currentValue = result.toString() 
    value.length = 0
    value.push(currentValue)
    operation.length = 0
}

buttonExponentiation.onclick = () => {
    if (currentValue != "") {
        value.push(currentValue)
        currentValue = ""
    }
    const lastChar = calculatorField.textContent.slice(-1)
    if (!["^", "", "+", "-", "*", "/"].includes(lastChar)) {
        operation.push("^")
        calculatorField.textContent += buttonExponentiation.textContent
        console.log(operation)
    }
}

function calculationResult(modification) {
    if (currentValue != "") {
        value.push(currentValue)
    }
    value = value.map(num => parseFloat(num))

    for (let i = 0; i < operation.length; i++) {
        if (operation[i] === "^") {
            if(value.length > 2) {
                value[i] = Math.pow(value[i], value[i + 1])
            } else {
                value[i] = Math.pow(value[i], 1)
            }
            value.splice(i + 1, 1)
            operation.splice(i, 1)
            i--
        }
    }

    for (let i = 0; i < operation.length; i++) {
        if (operation[i] === "*" || operation[i] === "/") {
            value[i] = operation[i] === "*" ? value[i] * value[i + 1] : value[i] / value[i + 1]
            value.splice(i + 1, 1)
            operation.splice(i, 1)
            i--;
        }
    }

    let result = value[0]
    for (let i = 0; i < operation.length; i++) {
        result = operation[i] === "+" ? result + value[i + 1] : result - value[i + 1]
    }     
    return result
}

buttonEqualSign.onclick = () => {
    calculationHistory.push(calculatorField.textContent)
    addOperationItems()
    console.log(calculationHistory)
    let result = calculationResult()
    
    calculatorField.textContent = result
    currentValue = result.toString() 
    value.length = 0
    value.push(currentValue)
    operation.length = 0
}

const createCalculationNote = (item, index) => {
    return `
    <div class="new-calculation" style="display: flex; align-items: center; justify-content: center; margin-bottom: 0.2rem; position: relative; color: grey;">
        <button class="btn-del" onclick="delOperationItem(${index})" 
            style="position: absolute; top: 1px; right: 1px; background: gray; color: white; border: none; cursor: pointer;">
            X
        </button>
        <p class="history-calculation" style="cursor: pointer;">${item}</p>
    </div>
    `
}

const addOperationItems = () => {
    listCalculationHistory.innerHTML = ""
    calculationHistory.forEach((item, index) => {
        listCalculationHistory.innerHTML += createCalculationNote(item, index)
    })
    updateLocal()
}

const delOperationItem = (index) => {
    calculationHistory.splice(index, 1)
    addOperationItems();
}

addOperationItems()