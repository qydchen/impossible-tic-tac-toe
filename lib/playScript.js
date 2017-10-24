let Game = require('./game');
const readline = require('readline');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function completion() {
  reader.question("Input 'y' to play again: ", restartGame => {
    if (restartGame.toLowerCase() === "y") {
      initGame();
    } else {
      reader.close();
    }
  });
};

function initGame() {
  reader.question("What kind of square grid would you like to play on? (input a number between 3-8) ", answer => {
    let n = Number(answer);
    reader.question("Input player 1 name, or input 'AI' for the computer to start first: ", player1 => {
      reader.question("Input player 2 name, or input 'AI' for the computer to start second: ", player2 => {
        if (n > 2 && n < 9) {
          let g = new Game(n, player1, player2);
          g.run(reader, completion);
        } else {
          console.log("-----------------------------------")
          console.log("Pick a valid number between 3-8");
          initGame();
        }
      })
    })
  });
};

initGame();
