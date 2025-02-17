// Task 1
var greeting = "Hello, World!"
const pi = 3.14
let number = 21

console.log(greeting)
let sum = pi + number

greeting = "Hello, the sum of " + pi + " and " + number + " = " + sum

console.log(greeting)

//Task 2
let input = document.querySelector(".input-name")
let sendButton = document.querySelector(".btn-send")

//Task3

const listBlocks = document.querySelector(".list-blocks");
const blocksButton = document.querySelector(".btn-blocks");
const listOperations = document.querySelector(".list-operations");

let blocks = [];
let operation = JSON.parse(localStorage.getItem("operation")) || [];

const updateLocal = () => {
    localStorage.setItem("operation", JSON.stringify(operation));
};

sendButton.onclick = () => {
    try {
        if (input.value.trim() === "") {
            throw new Error("Name must be filled out");
        }
        if (!isNaN(input.value)) {
            throw new Error("Numbers are not allowed!");
        }

        let name = input.value;
        console.log("Hello, " + name);
        input.value = "";

        operation.push(`Button 'Send' was clicked and 'Hello, ${name}' was output to the console`);
        addOperationItems();   
        
    } catch (error) {
        console.error(error.message); 
        operation.push("Button `Send` was clicked, but an error appeared in the console");  
        addOperationItems();         
    }
};

const createBlock = (item, index) => {
    return `
    <div class="new-block" style="height: 3rem; width: 3rem; background-color: blueviolet; display: flex; align-items: center; justify-content: center; position: relative; margin-bottom: 0.2rem;">
        <button class="btn-del" onclick="delElement(${index})" 
            style="position: absolute; top: -5px; right: -5px; background: red; color: white; border: none; cursor: pointer;">
            X
        </button>
    </div>
    `;
};

const addBlocksItems = () => {
    listBlocks.innerHTML = "";
    blocks.forEach((item, index) => {
        listBlocks.innerHTML += createBlock(item, index);
    });
};

const delElement = (index) => {
    blocks.splice(index, 1);
    addBlocksItems();
    operation.push("Button `X` was clicked and a block was deleted");
    addOperationItems();
};

blocksButton.onclick = () => {
    blocks.push(`Block ${blocks.length + 1}`);
    addBlocksItems();
    operation.push("Button `Create blocks` was clicked and a new block was created");
    addOperationItems();
};

const createOperationNote = (item, index) => {
    return `
    <div class="new-operation" style="display: flex; align-items: center; justify-content: center; margin-bottom: 0.2rem; position: relative;">
        <button class="btn-del" onclick="delOperationItem(${index})" 
            style="position: absolute; top: -5px; right: -5px; background: red; color: white; border: none; cursor: pointer;">
            X
        </button>
        <p>${item}</p>
    </div>
    `;
};

const addOperationItems = () => {
    listOperations.innerHTML = "";
    operation.forEach((item, index) => {
        listOperations.innerHTML += createOperationNote(item, index);
    });
    updateLocal();
};

const delOperationItem = (index) => {
    operation.splice(index, 1);
    addOperationItems();
};

addOperationItems();
