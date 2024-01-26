// * Elements
const grid = document.querySelector('.grid')
const livesDisplay = document.querySelector('.lives-display')
const cells = []

// ! Variables
const width = 13
const height = 9
const cellcount = width * height
const startingPos = 0
let currentPos = startingPos

// const car1Pos = 91
// let car = car1Pos
const car1Pos = [91, 95, 99]
const car2Pos = [65, 69, 73]
const car3Pos = [39, 43, 47]
const car4Pos = [14, 17, 21]

//! let lives = 3
// let gameActive = false

// function restVariables() {
//   lives = 3
//   livesDisplay.innerText = '❤️❤️❤️'
// }

// function startGame(evt) {
//   if (!gameActive) {
//     restVariables()
//     gameActive = true
//     const carHit = removeLive()
//   }
//! }


// # Create a function to display my grid 
function createGrid() {
  for (let i = 0; i < cellcount; i++) {
    const cell = document.createElement('div')
    cell.innerText = i
    cell.id = i
    cell.style.width = `${100 / width}%`
    cell.style.height = 'auto'
    grid.append(cell)
    cells.push(cell)
  }
  addChicken(currentPos)
  car1Pos.forEach(pos => addCar(pos))
  car2Pos.forEach(pos => addCar(pos))
  car3Pos.forEach(pos => addCar(pos))
  car4Pos.forEach(pos => addCar(pos))
  setInterval(moveCars, 500)
}


// ? Execution 
function addChicken() {
  cells[currentPos].classList.add('chicken')
}

function removeChicken() {
  cells[currentPos].classList.remove('chicken')
}

function addCar(position) {
  cells[position].classList.add('cars')
}

function removeCar(position) {
  cells[position].classList.remove('cars')
}

function moveCars() {
  [car1Pos, car2Pos, car3Pos, car4Pos].forEach(carPositions => {
    carPositions.forEach((pos, index) => {
      removeCar(pos)

      if (pos % width === width - 1) {
        carPositions[index] -= (width - 1) // Reset position to the start of the row
      } else {
        carPositions[index]++
      }

      addCar(carPositions[index])
    })
  })
}

// Chicken movements
function keyPress(evt) {
  const key = evt.code

  removeChicken()

  if (key === 'ArrowUp' && currentPos >= width) {
    currentPos -= width
  } else if (key === 'ArrowDown' && currentPos + width < cells.length) {
    currentPos += width
  } else if (key === 'ArrowLeft' && currentPos % width !== 0) {
    currentPos--
  } else if (key === 'ArrowRight' && currentPos % width !== width - 1) {
    currentPos++
  }

  addChicken()
}

// ? Events
document.addEventListener('keydown', keyPress)

// Page load
createGrid()

