import { Ship, Gameboard, Player } from "./gameLogic"; // Adjust the path if needed

describe("Ship Factory", () => {
  test("initializes with correct length and zero hits", () => {
    const ship = Ship(3);
    expect(ship.length).toBe(3); // Length should be 3
    expect(ship.hits).toBe(0); // Hits should start at 0
    expect(ship.sunk).toBe(false); // Ship should not be sunk initially
  });

  test("hit() increments hits count", () => {
    const ship = Ship(3);
    ship.hit();
    expect(ship.hits).toBe(1); // After one hit, hits should be 1
    expect(ship.sunk).toBe(false); // Ship should not be sunk after one hit
  });

  test("ship is sunk after receiving hits equal to its length", () => {
    const ship = Ship(3);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.hits).toBe(3); // After 3 hits, hits should be equal to length
    expect(ship.sunk).toBe(true); // Ship should be sunk after 3 hits
  });

  test("ship does not sink before receiving enough hits", () => {
    const ship = Ship(3);
    ship.hit();
    ship.hit();
    expect(ship.sunk).toBe(false); // Ship should not be sunk after 2 hits
  });
});

describe("Gameboard", () => {
  test("initialize board with correct dimensions", () => {
    const gameboard = Gameboard();
    const boardSize = 10;

    const board = gameboard.getBoard();

    expect(board.length).toBe(boardSize); // Check the number of rows
    board.forEach((row) => {
      expect(row.length).toBe(boardSize); // Check the number of columns
      row.forEach((cell) => {
        expect(cell).toBeNull();
      });
    });
  });

  test("placeShip horizontally", () => {
    const gameboard = Gameboard();
    const ship = Ship(3);

    gameboard.placeShip(ship, 0, 0, "horizontal");
    const board = gameboard.getBoard();

    expect(board[0][0]).toBe(ship);
    expect(board[0][1]).toBe(ship);
    expect(board[0][2]).toBe(ship);
  });

  test("placeShip vertically", () => {
    const gameboard = Gameboard();
    const ship = Ship(3);

    gameboard.placeShip(ship, 0, 0, "vertical");
    const board = gameboard.getBoard();

    expect(board[0][0]).toBe(ship);
    expect(board[1][0]).toBe(ship);
    expect(board[2][0]).toBe(ship);
  });

  test("receiveAttack missedShots", () => {
    const gameboard = Gameboard();

    gameboard.receiveAttack(0, 0);
    const missedShots = gameboard.getMissedShots();
    expect(missedShots).toEqual([[0, 0]]);
  });

  test("receiveAttack hit", () => {
    const gameboard = Gameboard();
    const ship = Ship(3);

    gameboard.placeShip(ship, 0, 0, "vertical");
    gameboard.receiveAttack(0, 0);
    const board = gameboard.getBoard();

    expect(board[0][0]).toBe("hit");
  });

  test("real Player attack", () => {
    const player = Player();
    const opponent = Player();

    player.attack(opponent, 0, 0);
  });
});
