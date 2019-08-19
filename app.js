var numSquares = 6;
var colors = [];
var pickedColor;
var square = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
    setupModeButtons();
    setupSquares();
    reset();
}

function setupModeButtons() {
    for(var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
            reset();
        });
    }
}

function setupSquares() {
    for(var i = 0; i < square.length; i++) {
        //add initial colors to squares
        square[i].style.backgroundColor = colors[i];
    
        //add listeners to squares
        square[i].addEventListener("click", function() {
            var clickedColor = this.style.backgroundColor;
    
            //compare picked and clicked color
            if(clickedColor === pickedColor) {
                messageDisplay.textContent = "Hurray!";
                resetButton.textContent = "Play again?";
                changeColors(clickedColor);
            } else {
                messageDisplay.textContent = "Try again";
                this.style.backgroundColor = "#232323";
            }
        });
    }
}

function reset() {
    //generate new colors
    colors = generateRandomColors(numSquares);
    //choose a pickedColor
    pickedColor = pickColor();
    //change the colorDisplay
    colorDisplay.textContent = pickedColor;
    messageDisplay.textContent = "";
    //change the color of squares
    for(var i = 0; i < square.length; i++) {
        if(colors[i]) {
            square[i].style.display = "block";
            square[i].style.backgroundColor = colors[i];
        } else {
            square[i].style.display = "none";
        }
    }
    resetButton.textContent = "New Colors";
    h1.style.backgroundColor = "steelblue"
}

resetButton.addEventListener("click", function() {
    reset();
});

function changeColors(color) {
    //loop through all squares
    for(var i = 0; i < square.length; i++) {
        //change each color to match given color
        square[i].style.backgroundColor = color;
    }
    h1.style.backgroundColor = color;
}

function pickColor() { 
    var random = Math.floor(Math.random() * numSquares);
    return colors[random];
}

function generateRandomColors(num) {
    //create an array
    var arr = [];
    //pick random colors and push it into array
    for(var i = 0; i < num; i++) {
        arr[i] = randomColor();
    }
    //return that array
    return arr;
}

function randomColor() {
    //pick a random rgb values
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    //return rgb string with random values
    return "rgb(" + r + ", " + g + ", " + b + ")";
}