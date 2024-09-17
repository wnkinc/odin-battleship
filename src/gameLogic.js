const Ship = (length) => {
  let hits = 0;
  let sunk = false;

  function isSunk() {
    if (hits >= length) {
      sunk = true;
    }
  }

  function hit() {
    hits += 1;
    isSunk();
  }

  return {
    length,
    get hits() {
      return hits;
    },
    get sunk() {
      return sunk;
    },
    hit,
  };
};

const Gameboard = () => {
  const boardSize = 10; // You can adjust this size as needed
  const ships = [];
  const missedShots = [];
  const board = Array(boardSize)
    .fill(null)
    .map(() => Array(boardSize).fill(null));

  function placeShip(ship, startX, startY, direction) {
    if (direction === "horizontal") {
      for (let i = 0; i < ship.length; i += 1) {
        board[startX][startY + i] = ship;
      }
    } else if (direction === "vertical") {
      for (let i = 0; i < ship.length; i += 1) {
        board[startX + i][startY] = ship;
      }
    }
    ships.push(ship); // Store ship to track for later
  }

  function receiveAttack(x, y) {
    const target = board[x][y];

    if (target === null) {
      missedShots.push([x, y]); // Track missed shots
      return "miss";
    }
    if (typeof target === "object") {
      target.hit(); // Call ship's hit function
      board[x][y] = "hit"; // Mark as hit
      return "hit";
    }

    // Default return value if no conditions match
    return null;
  }

  function allShipsSunk() {
    return ships.every((ship) => ship.sunk);
  }

  function getBoard() {
    return board;
  }

  return {
    placeShip,
    receiveAttack,
    allShipsSunk,
    get missedShots() {
      return missedShots;
    },
    getBoard,
  };
};

export { Ship, Gameboard };
