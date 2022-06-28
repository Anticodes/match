import sketch from "../../index.js";

class Player {

    constructor(name, x, y) {
        this.name = name;
        this.pos = sketch.createVector(x, y);
        this.points = 0;
    }

    addPoints(x) {
        this.points += x;
    }

    setPos(x, y) {
        this.pos.set(x, y);
    }

    render(turn) {
        sketch.fill(13, 65, 67);
        if (turn) sketch.triangle(this.pos.x, this.pos.y - 90 * sketch.getScale, this.pos.x - 10 * sketch.getScale, this.pos.y - 100 * sketch.getScale, this.pos.x + 10 * sketch.getScale, this.pos.y - 100 * sketch.getScale);
        sketch.fill(255);
        sketch.text(`${this.name}\nScore\n` + this.points, this.pos.x, this.pos.y);
    }
}

export default Player;