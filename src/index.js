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

// Add event listeners to each ship div
document.querySelectorAll(".ships-container .ship").forEach((shipElement) => {
  shipElement.addEventListener("click", () => {
    const shipLength = parseInt(shipElement.dataset.length, 10);
    const ship = Ship(shipLength);

    // Place the ship on the player's board
    randomShipPlacement(player.gameboard, ship);

    // Optionally, remove the ship from the ship container to indicate it's placed
    shipElement.classList.add("placed");
    updateBoardUI(playerBoardElement, player.gameboard);
    shipElement.removeEventListener("click", () => {}); // Disable further clicks
  });
});

randomShipPlacement(computer.gameboard, computerShip5);
randomShipPlacement(computer.gameboard, computerShip4);
randomShipPlacement(computer.gameboard, computerShip3);
randomShipPlacement(computer.gameboard, computerShip2);
randomShipPlacement(computer.gameboard, computerShip1);

// Function to update the UI based on the board state
function updateBoardUI(boardElement, gameboard) {
  const cells = boardElement.querySelectorAll(".cell");
  cells.forEach((cell) => {
    const x = parseInt(cell.dataset.x, 10);
    const y = parseInt(cell.dataset.y, 10);
    const boardValue = gameboard.getBoard()[x][y];

    if (typeof boardValue === "object" && boardValue !== null) {
      cell.classList.add("ship");
    } else if (boardValue === "hit") {
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
  console.log(player.gameboard.getBoard());
  updateBoardUI(playerBoardElement, player.gameboard);

  if (player.gameboard.allShipsSunk()) {
    alert("You Lose!");
  }
});
