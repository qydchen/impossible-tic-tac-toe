const Board = require('../lib/Board');

const emptyGrid = [ [null, null, null], [null, null, null], [null, null, null] ];
const halfFilledGrid = [ ['O', null, null], [null, 'X', null], [null, 'O', 'X'] ];
const tieGrid = [ ['X', 'O', 'X'], ['X', 'O', 'O'], ['O', 'X', 'X'] ];
const diagonalWinGrid = [ ['X', null, 'O'], [null, 'X', null], ['O', null, 'X'] ];
const horizonalWinGrid = [ ['O', 'O', 'O'], ['X', 'X', null], ['O', 'X', 'X'] ];
const verticalWinGrid = [ ['O', 'O', 'X'], ['X', 'O', 'X'], ['O', 'X', 'X'] ];

describe("Board", function() {
  let board;
  beforeEach(function() {
    board = new Board;
  })

  describe('this.grid', function() {
    it('should create a 3x3 grid', function() {
      expect(board.grid).toEqual(emptyGrid);
    });
  });

  describe('new Board(4)', function() {
    let fourGrid = new Board(4);
    it('should create a 4x4 grid', function() {
      expect(fourGrid.grid).toEqual(
        [ [ null, null, null, null ],
          [ null, null, null, null ],
          [ null, null, null, null ],
          [ null, null, null, null ] ]
      );
    });
  });

  describe('placeMark()', function() {
    beforeEach(function() {
      board.grid = [ ['O', null, null], [null, 'X', null], [null, 'O', 'X'] ];
      board.placeMark([1, 0], 'X');
    })
    it('should place a mark and return new grid', function() {
      expect(board.grid).toEqual([ ['O', null, null], ['X', 'X', null], [null, 'O', 'X'] ]);
    });
  });

  describe('colWinConditions()', function() {
    it('should transpose grid and generate array of vertical win conditions', function() {
      board.grid = tieGrid;
      expect(board.colWinConditions()).toEqual([ ['X', 'X', 'O'], ['O', 'O', 'X'], ['X', 'O', 'X'] ]);
    });
  });

  describe('diagonalWinConditions()', function() {
    it("should flatten and generate array of diagonal win conditions", function() {
      board.grid = diagonalWinGrid;
      expect(board.diagonalWinConditions()).toEqual([ ['X', 'X', 'X'], ['O', 'X', 'O'] ]);
    });
  });

  describe('isEmpty()', function() {
    it("should return true if a position is empty", function() {
      board.grid = halfFilledGrid;
      expect(board.isEmpty([0, 2])).toEqual(true);
    });
    it("should return false if a position is filled", function() {
      board.grid = halfFilledGrid;
      expect(board.isEmpty([1, 1])).toEqual(false);
    });
  });

  describe('availableMoves', function() {
    it("should return an array of Cartesian coordinates that represent available moves" ,function() {
      board.grid = halfFilledGrid;
      expect(board.availableMoves()).toEqual([ [0, 1], [0, 2], [1, 0], [1, 2], [2, 0] ])
      board.grid = tieGrid;
      expect(board.availableMoves()).toEqual([]);
    })
  })

  describe('isOver()', function() {
    it("should not be over when the grid is all empty", function() {
      board.grid = emptyGrid;
      expect(board.isOver()).toEqual(false);
    });
    it("should determine if game is not over", function() {
      board.grid = halfFilledGrid;
      expect(board.isOver()).toEqual(false);
    });
    it("should determine if game is tied", function() {
      board.grid = tieGrid;
      expect(board.isOver()).toEqual(true);
    });
    it("should determine if game is won", function() {
      board.grid = diagonalWinGrid;
      expect(board.isOver()).toBeTruthy();
    });
    it("should determine if game is won by a side even when marks are all filled", function() {
      board.grid = verticalWinGrid;
      expect(board.isOver()).toBeTruthy();
    });
  });

  describe('winner()', function() {
    it("should determine if there is a diagonal winner", function() {
      board.grid = diagonalWinGrid;
      expect(board.winner()).toEqual("X");
    });
    it("should determine if there is a horizonal winner", function() {
      board.grid = horizonalWinGrid;
      expect(board.winner()).toEqual("O");
    });
    it("should determine if there is a vertical winner", function() {
      board.grid = verticalWinGrid;
      expect(board.winner()).toEqual("X");
    });
    it("should return null if there is no winner", function() {
      board.grid = halfFilledGrid;
      expect(board.winner()).toBeFalsy();
    });
  })

})
