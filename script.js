//your code here
// Snake game logic
const gameContainer = document.getElementById('gameContainer');
const scoreElement = document.getElementById('score');
const snakeBodyPixels = [document.getElementById('pixel20_1')];
let foodPixel;
let score = 0;

// Function to create and move the food pixel to a random location
function moveFood() {
  if (foodPixel) {
    foodPixel.remove();
  }

  const randomRow = Math.floor(Math.random() * 20) + 1;
  const randomCol = Math.floor(Math.random() * 20) + 1;
  foodPixel = document.createElement('div');
  foodPixel.classList.add('food');
  foodPixel.id = `pixel${randomRow}_${randomCol}`;
  gameContainer.appendChild(foodPixel);
}

// Function to check for collisions with the food or walls
function checkCollisions() {
  const headPixel = snakeBodyPixels[0];
  const headRow = parseInt(headPixel.id.split('_')[0].replace('pixel', ''));
  const headCol = parseInt(headPixel.id.split('_')[1]);

  // Check for collision with food
  if (headPixel.id === foodPixel.id) {
    score++;
    scoreElement.innerText = score;
    moveFood();
  }

  // Check for collision with walls
  if (headRow < 1 || headRow > 20 || headCol < 1 || headCol > 20) {
    endGame();
  }
}

// Function to update the snake's movement
function moveSnake() {
  let currentRow, currentCol;
  let prevRow, prevCol;

  for (let i = 0; i < snakeBodyPixels.length; i++) {
    if (i === 0) {
      // Update the head of the snake
      currentRow = parseInt(snakeBodyPixels[i].id.split('_')[0].replace('pixel', ''));
      currentCol = parseInt(snakeBodyPixels[i].id.split('_')[1]);
      switch (currentCol) {
        case 20:
          currentCol = 1;
          break;
        default:
          currentCol++;
      }
      snakeBodyPixels[i].id = `pixel${currentRow}_${currentCol}`;
    } else {
      // Update the body of the snake
      prevRow = currentRow;
      prevCol = currentCol;
      currentRow = parseInt(snakeBodyPixels[i].id.split('_')[0].replace('pixel', ''));
      currentCol = parseInt(snakeBodyPixels[i].id.split('_')[1]);
      snakeBodyPixels[i].id = `pixel${prevRow}_${prevCol}`;
    }
  }

  // Check for collisions after the snake has moved
  checkCollisions();
}

// Function to end the game
function endGame() {
  clearInterval(snakeInterval);
  alert(`Game Over! Your Score: ${score}`);
}

// Initial setup
moveFood();
const snakeInterval = setInterval(moveSnake, 100);

// Event listener for keyboard controls
document.addEventListener('keydown', (event) => {
  const key = event.key;
  const headPixel = snakeBodyPixels[0];
  const headRow = parseInt(headPixel.id.split('_')[0].replace('pixel', ''));
  const headCol = parseInt(headPixel.id.split('_')[1]);

  switch (key) {
    case 'ArrowUp':
      if (headRow > 1) {
        headPixel.id = `pixel${headRow - 1}_${headCol}`;
      }
      break;
    case 'ArrowDown':
      if (headRow < 20) {
        headPixel.id = `pixel${headRow + 1}_${headCol}`;
      }
      break;
    case 'ArrowLeft':
      if (headCol > 1) {
        headPixel.id = `pixel${headRow}_${headCol - 1}`;
      }
      break;
    case 'ArrowRight':
      if (headCol < 20) {
        headPixel.id = `pixel${headRow}_${headCol + 1}`;
      }
      break;
  }

  // Check for collisions after each keyboard input
  checkCollisions();
});
