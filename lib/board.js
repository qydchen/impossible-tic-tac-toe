class Board {
  constructor(n = 3) {
    this.grid = this.createGrid(n);
    this.placeMark = this.placeMark.bind(this);
  }

  createGrid(n) {
    const grid = [];
    for (let i = 0; i < n; i++) {
      grid.push([]);
      for (let j = 0; j < n; j++) {
        grid[i].push(null);
      }
    }
    return grid;
  }

  placeMark(pos, mark) {
    this.grid[pos[0]][pos[1]] = mark;
  }

  diagonalWinConditions() {
    const diagonals = [];
    const downDiag = [];
    for (let i = 0; i < this.grid.length; i++) {
      downDiag.push([i, i]);
    }
    const upDiag = [];
    for (let i = 0; i < this.grid.length; i++) {
      upDiag.push([i, this.grid.length - i - 1]);
    }
    diagonals.push(this.flattenDiag(downDiag));
    diagonals.push(this.flattenDiag(upDiag));
    return diagonals;
  }

  flattenDiag(positions) {
    return positions.map(pos => {
      let posX = pos[0];
      let posY = pos[1];
      return this.grid[posX][posY];
    })
  }

  colWinConditions() {
    let columns = [];
    for (let i = 0; i < this.grid.length; i++) {
      columns.push([]);
    }
    this.grid.forEach(row => {
      row.forEach((cell, idx) => {
        columns[idx].push(cell);
      });
    });
    return columns;
  }

  isEmpty(pos) {
    let row = pos[0];
    let col = pos[1];
    return !this.grid[row][col];
  }

  availableMoves() {
    let available = [];
    this.grid.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (this.isEmpty([i, j])) {
          available.push([i, j]);
        }
      });
    });
    return available;
  }

  isOver() {
    const flatten = this.grid.reduce((flat, row) => flat.concat(row), []);
    return this.winner() ? this.winner() : flatten.every(el => !!el);
  }

  winner() {
    const winConditions = this.grid.concat(this.diagonalWinConditions(), this.colWinConditions());
    let isWon = null;
    winConditions.forEach(possibleWinCondition => {
      if (this.isWinCondition(possibleWinCondition, "X")) {
        isWon = "X";
      }
      if (this.isWinCondition(possibleWinCondition, "O")) {
        isWon = "O";
      }
    });
    return isWon;
  }

  isWinCondition(possibleWinCondition, str) {
    return possibleWinCondition.every(mark => mark === str);
  }

  print() {
    this.grid.forEach(row => {
      this.renderRow()
      this.renderRow(row);
    });
    this.renderRow();
  }

  renderRow(row) {
    if (row) {
      const standardized = row.map(cell => (!cell ? "|  " : "| " + cell));
      console.log(standardized.join(" ") + " |");
    } else {
      let borders = "";
      for (let i = 0; i < this.grid.length; i++) {
        borders += "----";
      }
      console.log(borders + "-");
    }
  }

}

Board.marks = ["X", "O"];

module.exports = Board;
