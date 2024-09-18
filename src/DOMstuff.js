// Function to create a 10x10 grid
function createBoard(boardElement) {
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      const cell = document.createElement("div");
      cell.dataset.x = i;
      cell.dataset.y = j;
      cell.classList.add("cell");
      boardElement.appendChild(cell);
    }
  }
}

// Get the player and computer board elements
const playerBoardElement = document.getElementById("player-board");
const computerBoardElement = document.getElementById("computer-board");

// Create 10x10 grids for both boards
createBoard(playerBoardElement);
createBoard(computerBoardElement);

// Add interactivity (e.g., click events for attacks)
document.querySelectorAll(".grid div").forEach((cell) => {
  cell.addEventListener("click", (e) => {
    const x = e.target.dataset.x;
    const y = e.target.dataset.y;
    console.log(`Clicked cell at (${x}, ${y})`); // Example of interaction
    e.target.classList.add("hit"); // Mark the cell as "hit" when clicked
  });
});
