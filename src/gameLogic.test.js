import { Ship, Gameboard, Player } from "./gameLogic";

describe("Ship Factory", () => {
  test("initializes with correct length and zero hits", () => {
    const ship = Ship(3);
    expect(ship.length).toBe(3);
    expect(ship.hits).toBe(0);
    expect(ship.sunk).toBe(false);
  });

  test("hit() increments hits count", () => {
    const ship = Ship(3);
    ship.hit();
    expect(ship.hits).toBe(1);
    expect(ship.sunk).toBe(false);
  });

  test("ship is sunk after receiving hits equal to its length", () => {
    const ship = Ship(3);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.hits).toBe(3);
    expect(ship.sunk).toBe(true);
  });

  test("ship does not sink before receiving enough hits", () => {
    const ship = Ship(3);
    ship.hit();
    ship.hit();
    expect(ship.sunk).toBe(false);
  });
});

describe("Gameboard", () => {
  test("initialize board with correct dimensions", () => {
    const gameboard = Gameboard();
    const boardSize = 10;

    const board = gameboard.getBoard();

    expect(board.length).toBe(boardSize);
    board.forEach((row) => {
      expect(row.length).toBe(boardSize);
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
});

describe("Player attack logic", () => {
  let player, opponentGameboard;

  beforeEach(() => {
    player = Player();
    opponentGameboard = Gameboard(); // Create a mock of opponent's gameboard

    opponentGameboard.receiveAttack = jest.fn(); // Mock the receiveAttack function
  });

  test("attacks the opponent at the correct coordinates", () => {
    const x = 3;
    const y = 4;

    player.attack(opponentGameboard, x, y);

    expect(opponentGameboard.receiveAttack).toHaveBeenCalledWith(x, y);
  });
});
