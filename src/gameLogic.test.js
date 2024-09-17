import { Ship, Gameboard } from "./gameLogic"; // Adjust the path if needed

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
  test("placeShip horizontally", () => {
    const gameboard = Gameboard();
    const ship = Ship(3);

    gameboard.placeShip(ship, 0, 0, "horizontal");

    expect(gameboard.board[0][0]).toBe(ship);
    expect(gameboard.board[0][1]).toBe(ship);
    expect(gameboard.board[0][2]).toBe(ship);
  });

  test("should place ship vertically", () => {
    const gameboard = Gameboard();
    const ship = Ship(3); // Create a ship using the Ship factory

    gameboard.placeShip(ship, 0, 0, "vertical");

    expect(gameboard.board[0][0]).toBe(ship);
    expect(gameboard.board[1][0]).toBe(ship);
    expect(gameboard.board[2][0]).toBe(ship);
  });
});
