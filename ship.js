
class Ship {
  constructor(name, start, end) {
    this.name = name;
    this.sunk = false;

    this.cells = [];
    if (start.y == end.y) {
      for (var i = start.x; i <= end.x; i++) {
        this.cells.push({x: i, y: start.y, hit: false});
      }
    } else {
      for (var i = start.y; i <= end.y; i++) {
        this.cells.push({x: start.x, y: i, hit: false})
      }
    }
  }
  applyHit(target) {
    var index = this.cells.indexOf(this.cells.find((cell) => cell.x == target.x && cell.y == target.y))
    this.cells[index].hit = true;

    if (this.cells.every(cell => cell.hit == true)) {
      this.sunk = true;
    }
  }
}

export { Ship }
