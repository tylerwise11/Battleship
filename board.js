import {Ship} from './ship.js';

function checkForWin(targetBoard, player) {
  var board = document.getElementsByClassName('board')[0];
  var messageDiv = document.getElementById("message");

  // if 5 ships on the board have been sunk the game is over
  if (targetBoard.shipsDestroyed >= 5) {
    board.style.pointerEvents = 'none';
    if (player == "player1")
    {
      messageDiv.innerHTML = "Player Two Wins!";
    }
    else{
      messageDiv.innerHTML = "Player One Wins!";
    }
  }
}

function setSunkMessage(){
  var messageDiv = document.getElementById("message");
  messageDiv.innerHTML = "Ship Sunk!";
}

function generateRandomNumber(number)
{
  return Math.floor(Math.random() * number);
}

class Board {
  constructor() {
    this.shipsDestroyed = 0;
    this.boardLength = 10;
    this.board = [];
    this.name = "";
    var self = this;
    for (var i = 0; i < 10; i++) {
      this.board.push(new Array(10).fill(0));
    }
    this.ships = [];

    function placeShip(length) {
        var randomX = -4;
        var randomY = -4;
        // This while loop ensures the starting coordinate of the random ship placement gives enough room for the entire ship to be placed
        while (randomX+length < 0 || randomX+length > 9 || randomY+length < 0 || randomY+length > 9) {
          randomX = generateRandomNumber(self.boardLength);
          randomY = generateRandomNumber(self.boardLength);
        }

        var randomDir = generateRandomNumber(2) < 1 ? "H" : "V";
        var ship;
        if (randomDir == "H") {
          ship = new Ship(`ship${length+1}`, {x: randomX, y: randomY}, {x: randomX, y: randomY+length});
        } else {
          ship = new Ship(`ship${length+1}`, {x: randomX, y: randomY}, {x: randomX+length, y: randomY});
        }
        // check if cells have already been taken before pushing to the array
        var cellAvailable = true
        ship.cells.forEach(cell => {
          if (self.board[cell.x][cell.y] != 0) {
            cellAvailable = false;
          }
        });

        if (cellAvailable) {
          self.ships.push(ship);
          ship.cells.forEach(cell => {
            self.board[cell.x][cell.y] = 1;
          });
        }

        return cellAvailable;
    }

    // 4 ships of length 3 and one of length 4
    var ships = [2,2,2,2,3];
    ships.forEach(length => {
      var cellsAvailable;
      do {
        cellsAvailable = placeShip(length);
      } while (!cellsAvailable)

    });

    console.log(this.board);
  }

  playerShot(event) {
    var messageDiv = document.getElementById("message");
    messageDiv.innerHTML = "";

    var boardTarget = this.playerboard.board[this.x][this.y];

    this.playerboard.attackShip(this.playerboard, this, this.playerboard.name);

    if (boardTarget == 1) {
      this.classList.toggle('red');
    } else {
      boardTarget = 2;
      this.classList.toggle('white');
    }

    // Remove the click event from this square
    this.removeEventListener('click', this.playerboard.playerShot);
  }

  attackShip(board, target, player) {
    for (var ship of board.ships) {
      for (var cell of ship.cells) {
        if (cell.x == target.x && cell.y == target.y) {
            ship.applyHit({x: target.x, y: target.y});
            if (ship.sunk) {
              board.shipsDestroyed++;
              setSunkMessage(player);
              checkForWin(board, player);
            }
            break;
        }
      }
    }
  }
}

export { Board };
