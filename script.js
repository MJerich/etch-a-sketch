// setup variables
const DEFAULT_COLOR = '#000000'
const DEFAULT_MODE = 'plain'
const DEFAULT_SIZE = 16
let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE
let currentSize = DEFAULT_SIZE

// setting the mode (plain, rainbow, or eraser)
function setColor(newMode) {
  activateButton(newMode)
  currentMode = newMode
}

// change the grid size
function setCurrentSize(newSize) {
  currentSize = newSize
  reloadGrid()
}

// setup variables for the HTML elements
const plainBtn = document.getElementById('plainBtn')
const rainbowBtn = document.getElementById('rainbowBtn')
const sixteenBtn = document.getElementById('sixteenBtn')
const thirtytwoBtn = document.getElementById('thirtytwoBtn')
const eraserBtn = document.getElementById('eraserBtn')
const clearBtn = document.getElementById('clearBtn')
const grid = document.getElementById('grid')

// arrow functions for all the button presses
plainBtn.onclick = () => setColor('plain')
rainbowBtn.onclick = () => setColor('rainbow')
eraserBtn.onclick = () => setColor('eraser')
sixteenBtn.onclick = () => setCurrentSize(16)
thirtytwoBtn.onclick = () => setCurrentSize(32)
clearBtn.onclick = () => reloadGrid()

// reload the grid with the new size
function reloadGrid() {
  clearGrid()
  setupGrid(currentSize)
}

// clear the grid
function clearGrid() {
  grid.innerHTML = ''
}

// setup the grid with said size
function setupGrid(size) {
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
  

    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement('div')
        gridElement.addEventListener('mouseover', changeColor)
        grid.appendChild(gridElement)
    }
}

// color change setup
function changeColor(e) {
  if (currentMode === 'rainbow') {
    const randomR = Math.floor(Math.random() * 256)
    const randomG = Math.floor(Math.random() * 256)
    const randomB = Math.floor(Math.random() * 256)
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
  } else if (currentMode === 'plain') {
    e.target.style.backgroundColor = currentColor
  } else if (currentMode === 'eraser') {
    e.target.style.backgroundColor = 'rgb(211, 211, 211)'
  }
}

// activate button css class (plain, rainbow, eraser)
function activateButton(newMode) {
  if (currentMode === 'rainbow') {
    rainbowBtn.classList.remove('active')
  } else if (currentMode === 'plain') {
    plainBtn.classList.remove('active')
  } else if (currentMode === 'eraser') {
    eraserBtn.classList.remove('active')
  }

  if (newMode === 'rainbow') {
    rainbowBtn.classList.add('active')
  } else if (newMode === 'plain') {
    plainBtn.classList.add('active')
  } else if (newMode === 'eraser') {
    eraserBtn.classList.add('active')
  }
}

// call function we need to start
setupGrid(DEFAULT_SIZE)
activateButton(DEFAULT_MODE)
