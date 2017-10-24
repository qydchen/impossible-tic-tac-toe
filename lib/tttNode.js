const Board = require("./board");

class TicTacToeNode {
  constructor(board, nextMoverMark, prevMovePos = null) {
    this.board = board;
    this.nextMoverMark = nextMoverMark;
    this.prevMovePos = prevMovePos;
  }

  isLosingNode(evaluator) {
    if (!!this.board.isOver()) {
      return board.winner() !== evaluator;
    }

    if (this.nextMoverMark === evaluator) {
      return this.children().every(node => node.isLosingNode(evaluator));
    } else {
      return this.children().some(node => node.isLosingNode(evaluator))
    }
  }

  isWinningNode(evaluator) {
    if (!!this.board.isOver()) {
      return this.board.winner() === evaluator;
    }

    if (this.nextMoverMark === evaluator) {
      return this.children().every(node => node.isWinningNode(evaluator));
    } else {
      return this.children().every(node => node.isWinningNode(evaluator));
    }

  }

  children() {
    let kids = [];
    let nextMoverMark = this.nextMoverMark;
    this.board.grid.forEach((row, i) => {
      row.forEach((cell, j) => {
        let pos = [i, j];
        if (!this.board.isEmpty(pos)) {
          return;
        }
        // make a clone of a new board class
        let newBoard = Object.assign( Object.create( Object.getPrototypeOf(this.board)), this.board);
        newBoard.placeMark(pos, nextMoverMark);
        nextMoverMark = nextMoverMark === Board.marks[0] ? Board.marks[1] : Board.marks[0];
        kids.push(new TicTacToeNode(newBoard, nextMoverMark, pos));
      })
    })

    return kids;
  }

}

module.exports = TicTacToeNode;
