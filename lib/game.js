const Board = require("./board");
const TicTacToeNode = require("./tttNode");

class Game {
  constructor(n, player1, player2) {
    this.board = new Board(n);
    this.currentMark = Board.marks[0];
    this.player1 = player1;
    this.player2 = player2;
    this.currentPlayer = this.player1;
  }

  isOver() {
    return this.board.isOver();
  }

  isEmpty(pos) {
    return this.board.isEmpty(pos);
  }

  winner() {
    return this.board.winner();
  }

  availableMoves() {
    return this.board.availableMoves();
  }

  playTurn(pos) {
    this.board.placeMark(pos, this.currentMark);
    this.switchPlayers();
  }

  getAIMove(currentMark) {
    let node = new TicTacToeNode(this.board, currentMark);
    if (node) {
      let possibleWinningMoves = node.children().filter(child => child.isWinningNode(currentMark));
      node = possibleWinningMoves[0];
      return node.prevMovePos;
    }

    if (node) {
      let possibleLosingMoves = node.children().filter(child => child.isLosingNode(currentMark))
      node = possibleLosingMoves[0];
      return node.prevMovePos;
    }

    console.log("Oh no! You found a way to break this AI! Ahh I'm not gonna get a job!!!");
  }

  promptMove(reader, cb) {
    this.board.print();
    console.log(`Current Turn: ${this.currentPlayer}`);
    reader.question("Where do you want to place your mark? (format: row, column): ", answer => {
      let pos = answer.split(",");
      if (this.isValidAnswer(pos)) {
        cb(pos);
      } else {
        console.log("Invalid position: try again");
        this.promptMove(reader, cb);
      }
    })
  }

  isValidAnswer(pos) {
    let isValidLength = pos.length === 2;
    let isValidIndex = pos.every(n => n.length === 1 && parseInt(n) >= 0 && parseInt(n) <= this.board.grid.length);
    return isValidLength && isValidIndex && this.isEmpty(pos);
  }

  switchPlayers() {
    this.currentMark = this.currentMark === Board.marks[0] ? Board.marks[1] : Board.marks[0];
    this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
  }

  run(reader, gameCompletionCb) {
    if (this.currentPlayer === 'AI') {
      let AIpos = this.getAIMove(this.currentMark);
      this.playTurn(AIpos);
      this.gameLoop(reader, gameCompletionCb);
    } else {
      this.promptMove(reader, move => {
        this.playTurn(move);
        this.gameLoop(reader, gameCompletionCb);
      });
    }

  }

  gameLoop(reader, gameCompletionCb) {
    if (this.isOver()) {
      this.board.print();
      if (this.winner()) {
        console.log(`${this.currentPlayer} has won!`);
      } else {
        console.log("Tie game");
      }
      gameCompletionCb();
    } else {
      this.run(reader, gameCompletionCb);
    }
  }

}

module.exports = Game;
