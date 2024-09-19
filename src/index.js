import "normalize.css"; // Importing normalize.css from node_modules
import "./styles.css";

import { Ship, Player } from "./gameLogic.js";

// Function to create a 10x10 grid on the board
function createBoard(boardElement) {
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      const cell = document.createElement("button");
      cell.dataset.x = i;
      cell.dataset.y = j;
      cell.classList.add("cell");
      boardElement.appendChild(cell);
    }
  }
}

const playerBoardElement = document.getElementById("player-board");
const computerBoardElement = document.getElementById("computer-board");

createBoard(playerBoardElement);
createBoard(computerBoardElement);

const player = Player();
const computer = Player();

// Place ships for both player and computer
const playerShip1 = Ship(2);
const playerShip2 = Ship(3);
const playerShip3 = Ship(3);
const playerShip4 = Ship(5);
const playerShip5 = Ship(6);

const computerShip1 = Ship(2);
const computerShip2 = Ship(3);
const computerShip3 = Ship(3);
const computerShip4 = Ship(5);
const computerShip5 = Ship(6);

function randomShipPlacement(gameboard, ship) {
  const boardSize = 10;
  let placed = false;

  while (!placed) {
    // Randomly choose starting coordinates and direction (0 for horizontal, 1 for vertical)
    const startX = Math.floor(Math.random() * boardSize);
    const startY = Math.floor(Math.random() * boardSize);
    const direction = Math.random() > 0.5 ? "horizontal" : "vertical";

    if (canPlaceShip(gameboard.getBoard(), ship, startX, startY, direction)) {
      gameboard.placeShip(ship, startX, startY, direction);
      placed = true;
    }
  }
}

// Helper function to check if a ship can be placed at the given position and direction
function canPlaceShip(board, ship, startX, startY, direction) {
  const shipLength = ship.length;

  if (direction === "horizontal") {
    // Ensure ship fits horizontally and doesn't overlap other ships
    if (startY + shipLength > board.length) return false;
    for (let i = 0; i < shipLength; i += 1) {
      if (board[startX][startY + i] !== null) return false;
    }
  } else if (direction === "vertical") {
    // Ensure ship fits vertically and doesn't overlap other ships
    if (startX + shipLength > board.length) return false;
    for (let i = 0; i < shipLength; i += 1) {
      if (board[startX + i][startY] !== null) return false;
    }
  }

  return true;
}

randomShipPlacement(player.gameboard, playerShip5);
randomShipPlacement(player.gameboard, playerShip4);

randomShipPlacement(computer.gameboard, computerShip5);
randomShipPlacement(computer.gameboard, computerShip4);

// // Example: placing ships manually
// player.gameboard.placeShip(playerShip, 0, 0, "horizontal");
// computer.gameboard.placeShip(computerShip, 0, 0, "horizontal");

// Function to update the UI based on the board state
function updateBoardUI(boardElement, gameboard) {
  const cells = boardElement.querySelectorAll(".cell");
  cells.forEach((cell) => {
    const x = parseInt(cell.dataset.x, 10);
    const y = parseInt(cell.dataset.y, 10);
    const boardValue = gameboard.getBoard()[x][y];

    if (boardValue === "hit") {
      cell.classList.add("hit");
    } else if (boardValue === "miss") {
      cell.classList.add("miss");
    }
  });
}

// Handle player's attack on computer's board
computerBoardElement.addEventListener("click", (e) => {
  // Check if a button with data-x and data-y attributes was clicked
  const target = e.target;
  if (!target || !target.dataset.x || !target.dataset.y) {
    console.log("Clicked outside of valid button area");
    return;
  }

  // Check if the cell has already been attacked (hit or miss)
  if (target.classList.contains("hit") || target.classList.contains("miss")) {
    console.log("You've already attacked this cell!");
    return;
  }

  // Extract the x and y coordinates from the dataset
  const { x, y } = target.dataset;

  // Handle player's attack on the computer's board
  const result = player.attack(
    computer.gameboard,
    parseInt(x, 10),
    parseInt(y, 10),
  );

  if (result === "hit") {
    target.classList.add("hit");
  } else if (result === "miss") {
    target.classList.add("miss");
  }

  if (computer.gameboard.allShipsSunk()) {
    alert("You win!");
    return;
  }

  // Computer's turn to attack
  computer.randomAttack(player.gameboard);
  console.table(player.gameboard.getBoard());
  console.table(computer.gameboard.getBoard());
  updateBoardUI(playerBoardElement, player.gameboard);

  if (player.gameboard.allShipsSunk()) {
    alert("You Lose!");
  }
});
