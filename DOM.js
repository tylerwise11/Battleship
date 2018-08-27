import {Board} from  "./board.js";

window.onload = initialSetup;

function initialSetup() {
  // build each players board
  buildBoards("player1");
  buildBoards("player2");

  var newGame = document.getElementById('newGame');
  newGame.addEventListener('click', () => window.location.reload());
}


function buildBoards(playerId) {

  var playerBoard = new Board();
  playerBoard.name = playerId;
  var boardDiv = playerId == "player1" ? document.getElementById('playerOneBoard') : document.getElementById('playerTwoBoard'); 
  var boardLength = 10;
  for (var x=0; x<boardLength; x++) {
    for (var y=0; y<boardLength; y++) {
      var square = document.createElement('div');
      square.classList = 'square';

      //puts a unique identifier on each square for click binding
      square.id = `${playerId}X${x}${playerId}Y${y}`;

      if (y == 0) {
        square.classList.toggle('first');
      }
      square.x = x;
      square.y = y;
      square.playerboard = playerBoard;
      square.addEventListener('click', playerBoard.playerShot);
      boardDiv.appendChild(square);
    }
  }
}




