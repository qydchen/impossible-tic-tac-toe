const Game = require("../lib/Game");
const Board = require("../lib/Board");
const TicTacToeNode = require("../lib/tttNode");

describe("Game", function() {
  let game;

  beforeEach(function() {
    game = new Game(3, "Dave", "AI");
  })

  describe("this.board", function() {
    it("exposes a board", function () {
      expect(game.board).toEqual(jasmine.any(Object));
    });
  });

  describe("this.player1", function() {
    it("should start the game with player1", function() {
      expect(game.player1).toBe("Dave");
    });
  });

  describe("this.player2", function() {
    it("should start the game with player2", function() {
      expect(game.player2).toBe("AI");
    });
  });

  describe("this.currentPlayer", function() {
    it("should start the game with currentPlayer as player1", function() {
      expect(game.currentPlayer).toBe("Dave");
    });
  });

  describe("this.currentMark", function() {
    it("should start the game with currentMark as X", function() {
      expect(game.currentMark).toBe('X');
    });
  });

  describe("playTurn(pos)", function() {
    let game;
    beforeEach(function() {
      game = new Game(3);
      game.playTurn([1, 1], "X");
    })

    it("gets a move from the current player and performs it", function() {
      expect(game.board.grid).toEqual([ [null, null, null], [null, "X", null], [null, null, null] ])
    });

    it("passes the turn to the other player", function() {
      expect(game.currentMark).toEqual("O");
    });
  });

  describe("isValidAnswer(pos)", function() {
    let game;
    beforeEach(function() {
      game = new Game(3);
      game.playTurn([2, 2], "O");
    })

    it("should make sure that array represents a Cartesian coordinate", function() {
      expect(game.isValidAnswer(["1", "1"])).toEqual(true);
      expect(game.isValidAnswer(["as1", "12"])).toEqual(false);
    });

    it("should make sure that out of bound coordinates are invalid", function() {
      expect(game.isValidAnswer(["0", "4"])).toEqual(false);
      expect(game.isValidAnswer(["5", "3"])).toEqual(false);
    });

    it("should make sure that filled squares are invalid", function() {
      expect(game.isValidAnswer(["1", "1"])).toEqual(true);
      expect(game.isValidAnswer(["2", "2"])).toEqual(false);
    });
  });

  describe("switchPlayers()", function() {
    beforeEach(function() {
      game.switchPlayers();
    })
    it("updates the value of this.currentMark", function () {
      expect(game.currentMark).toEqual('O');
    });
    it("updates the value of this.currentMark", function () {
      expect(game.currentPlayer).toEqual('AI');
    });
  });

})
