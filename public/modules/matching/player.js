class Player {

  constructor(name, x, y) {
    this.name = name
    this.pos = createVector(x, y);
    this.points = 0;
  }

  addPoints(x) {
    this.points += x;
  }

  setPos(x, y) {
    this.pos.set(x, y);
  }

  render(turn) {
    fill(13, 65, 67);
    if (turn) triangle(this.pos.x, this.pos.y - 90 * getScale, this.pos.x - 10 * getScale, this.pos.y - 100 * getScale, this.pos.x + 10 * getScale, this.pos.y - 100 * getScale);
    fill(255);
    text(`${this.name}\nScore\n` + this.points, this.pos.x, this.pos.y);
  }
}

