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
  const boardSize = 10;
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
      board[x][y] = "miss";
      return "miss";
    }
    if (typeof target === "object") {
      target.hit();
      board[x][y] = "hit";
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

  function getMissedShots() {
    return missedShots;
  }

  return {
    placeShip,
    receiveAttack,
    allShipsSunk,
    getMissedShots,
    getBoard,
  };
};

const Player = () => {
  const gameboard = Gameboard();

  function attack(opponentGameboard, x, y) {
    return opponentGameboard.receiveAttack(x, y);
  }

  // Random attack function for computer players
  function randomAttack(opponentGameboard) {
    let x;
    let y;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (
      opponentGameboard.getBoard()[x][y] === "hit" ||
      opponentGameboard.getBoard()[x][y] === "miss"
    );
    return opponentGameboard.receiveAttack(x, y);
  }

  return {
    gameboard,
    attack,
    randomAttack,
  };
};

export { Ship, Gameboard, Player };
