let row;
let col;
const CONTAINER = document.querySelector(".container");
const button = document.querySelector("#gridLayout");
button.addEventListener("click", gridLayout);
const rgbButton = document.querySelector("#rgb");
let inpt = document.querySelector("#favcolor");


function gridLayout(){
    deleteDiv();
    let grid = prompt("please enter the grid of your liking (eg. 16x16)");
    while (!grid.toLowerCase().includes("x")){
        grid = prompt("That is not a correct format to type a grid. Please use the same format as the example (eg. 16x16)");
    }
    size = grid.toLowerCase().split("x");

    row = Number(size[0]);
    col = Number(size[1]);

    if (row>100 && col>100){
        row=100;
        col=100;
    }else if (row>100){
        row=100;
    }else if(col>100){
        col=100;
    }
    createDiv();
    colorSquares();
}

function createDiv(){
    for (let i=1; i<=row;i++){
        for (let j=1;j<=col;j++){
            var square = document.createElement("div");
            square.classList.add("squares");
            square.style.width = `${800/row}px`;
            square.style.height = `${800/col}px`;
            CONTAINER.append(square);
        }
    }
}

function deleteDiv(){
    const listSquare = document.querySelectorAll(".squares");
    listSquare.forEach(element => CONTAINER.removeChild(element));
}

function colorSquares(){
    const listSquare = document.querySelectorAll(".squares");
    
    listSquare.forEach(element => {  
        rgbButton.addEventListener('click', () => {
            element.addEventListener('mouseover', () => element.style.backgroundColor=randomColor());
        })
        inpt.addEventListener('click', () => {
            element.addEventListener('mouseover', () => element.style.backgroundColor=inpt.value);
        })
    })
}

function randomColor(){
    let r = Math.floor(Math.random()*256);
    let g = Math.floor(Math.random()*256);
    let b = Math.floor(Math.random()*256);
    return `rgb(${r}, ${g}, ${b})`;
}