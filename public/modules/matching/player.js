class Player {

  constructor(name, x, y) {
    this.name = name
    this.pos = createVector(x, y);
    this.points = 0;
  }

  addPoints(x) {
    this.points += x;
  }

  render(turn) {
    fill(13, 65, 67);
    if (turn) triangle(this.pos.x, this.pos.y - 90, this.pos.x - 10, this.pos.y - 100, this.pos.x + 10, this.pos.y - 100);
    fill(255);
    text(`${this.name}\nScore\n` + this.points, this.pos.x, this.pos.y);
  }
}

