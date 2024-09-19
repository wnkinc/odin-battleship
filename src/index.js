import "normalize.css"; // Importing normalize.css from node_modules
import "./styles.css";

import { Ship, Gameboard, Player } from "./gameLogic.js";

// Function to create a 10x10 grid on the board
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

// Initialize players
const player = Player();
const computer = Player();

// Place ships for both player and computer
const playerShip = Ship(3);
const computerShip = Ship(3);

// Example: placing ships manually
player.gameboard.placeShip(playerShip, 0, 0, "horizontal");
computer.gameboard.placeShip(computerShip, 0, 0, "horizontal");

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
  const { x, y } = e.target.dataset;
  const result = player.attack(
    computer.gameboard,
    parseInt(x, 10),
    parseInt(y, 10),
  );

  if (result === "hit") {
    e.target.classList.add("hit");
  } else if (result === "miss") {
    e.target.classList.add("miss");
  }

  // Check if all ships are sunk
  if (computer.gameboard.allShipsSunk()) {
    alert("You win!");
  } else if (player.gameboard.allShipsSunk()) {
    alert("You win!");
  } else {
    // Computer's turn to attack
    console.log("comp attack");
    console.log(computer.randomAttack(player.gameboard));
    console.table(player.gameboard.getBoard());
    console.table(computer.gameboard.getBoard());
    updateBoardUI(playerBoardElement, player.gameboard);
  }
});
