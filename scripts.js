const squaresContainer = document.querySelector('.squares-container');

const widthSquareContainer = squaresContainer.clientWidth
const heightSquareContainer = squaresContainer.clientHeight


// Find out width and height in terms of squares
function findSquaresForWH(width, height, squarePixels) {
    // Width and Height for Square is same
    let widthInSquares = width/ squarePixels
    let heightInSquares = height/ squarePixels
    let totalAreaInSquares = widthInSquares * heightInSquares

    // console.log(
    //     `For a ${squarePixels}px by ${squarePixels}px square:\n`,
    //     `Width in squares: ${widthInSquares}\n`,
    //     `Height in squares: ${heightInSquares}\n`, 
    //     `Total Area in squares: ${totalAreaInSquares}`, 
    // )
    return [widthInSquares, heightInSquares, totalAreaInSquares]
}



// Chose size of square
let pixels = 25

function makeSquares(pixels) {
    squaresContainer.innerHTML = ''
    
    let [widthInSquares, heightInSquares, totalAreaInSquares] = findSquaresForWH(widthSquareContainer, heightSquareContainer, pixels)

    // Make squares
    for (let i = 1; i <= totalAreaInSquares + 1; i++){
        const square = document.createElement('div');
        square.classList = 'square'
        square.style.width = `${pixels}px`;
        square.style.height = `${pixels}px`;
    
        if (i === widthInSquares + 1) { // Add break
            square.style.width = "100%";
            square.style.height = "0px";
            square.style.border = "0";
            square.style.margin = "0";
        }
        squaresContainer.appendChild(square)
    };
    
    updateEventListener()
}
makeSquares(pixels)



// Mouse Checks
let mouseDown = false;

function updateEventListener() {
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
        // One Click
        square.addEventListener('mousedown', () => {
            mouseDown = true;
            
            // Rainbow
            if (mouseDown && isRGB) {
                getRGB()
                let [one, two, three] = getRGB()
                square.style.backgroundColor = `rgb(${one}, ${two}, ${three})`
                return;
            } else {
                square.style.backgroundColor = 'black';
                return;
            };
        });
        // Click and Hold
        square.addEventListener('mouseover', () => {
            if (mouseDown && !isRGB) { 
                square.style.backgroundColor = 'black';
                return;
            }
            // Rainbow Mode
            if (mouseDown && isRGB) {
                getRGB()
                let [one, two, three] = getRGB()
                square.style.backgroundColor = `rgb(${one}, ${two}, ${three})`
                return;
            }
        });
        // Stop
        square.addEventListener('mouseup', () => {
            mouseDown = false;
            return;
        });
    });
}
updateEventListener()



// Reset Button
function clearScreen() {
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
        square.style.backgroundColor = ''
    });
}
const resetButton = document.querySelector('.reset-button');
resetButton.addEventListener('click', () => {
    clearScreen()
});



// Resize Container
function promptResize() {
    let userInput = prompt('Please enter a number between 1 to 5 (included, smallest to largest)')

    let choices = {1:3, 2:5, 3:10, 4:25, 5:35}

    if (choices.hasOwnProperty(userInput)) {
        makeSquares(choices[userInput])
        updateEventListener()
        return;
    }
}
const resizeButton = document.querySelector('.resize-button');
resizeButton.addEventListener('click', () => {
    promptResize()
});



// Change Color



// Rainbow Color
function getRandomArbitrary(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
}

function getRGB() {
    let [one, two, three] = [getRandomArbitrary(0,256), getRandomArbitrary(0,256), getRandomArbitrary(0,256)]

    return [one, two, three]
}

let isRGB = false;

const egg = document.querySelector('.egg');
egg.addEventListener('click', () => {
    isRGB = true;
});

const logo = document.querySelector('.logo');
logo.addEventListener('click', () => {
    isRGB = false;
});