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

function colorSquares() {
    const listSquare = document.querySelectorAll(".squares");

    rgbButton.addEventListener("click",()=>{
        listSquare.forEach(square => {
            square.dataset.mode = "rgb";
            square.removeEventListener("mouseenter",colorPicker);
            square.addEventListener("mouseenter", rgbColor);
        })
    })

    inpt.addEventListener("input", () =>{
        listSquare.forEach(square => {
            square.dataset.mode = "custom";
            square.dataset.opacity = "0.1";
            square.removeEventListener("mouseenter", rgbColor);
            square.addEventListener("mouseenter", colorPicker);
        })
    })
}


function randomColor(){
    let r = Math.floor(Math.random()*256);
    let g = Math.floor(Math.random()*256);
    let b = Math.floor(Math.random()*256);
    return `rgb(${r}, ${g}, ${b})`;
}

function colorPicker(){
    let opacity = parseFloat(this.dataset.opacity) || 0.1;
    if (opacity<1){
        opacity = Math.min(opacity+0.1, 1);
        this.dataset.opacity = opacity.toFixed(2);
    }

    const desiredColor = inpt.value;

    const r = parseInt(desiredColor.substring(1,3),16);
    const g = parseInt(desiredColor.substring(3,5),16);
    const b = parseInt(desiredColor.substring(5,7),16);

    const rgbaColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
    this.style.backgroundColor = rgbaColor;
}

function rgbColor() {
    this.style.backgroundColor = randomColor();;
}