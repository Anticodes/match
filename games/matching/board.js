import { Card } from "./card";

class Board {

    constructor(gridW, gridH, io, room) {
        this.gridW = gridW;
        this.gridH = gridH;
        this.boardRequests = 0;
        this.room = room;
        this.io = io;
        this.possibleValues = [];
        for (let i = 0; i < 43; i++) this.possibleValues.push(i);
        this.possibleValues = this.possibleValues.sort(() => .5 - Math.random());
    }

    newBoard(requester) {
        this.boardRequests++;
        if (this.boardRequests == 2) {
            this.grid = [];
            const max = this.gridW * this.gridH / 2;
            const cards = this.randomCards(9);
            for (let card of cards) {
                for (let j = 0; j < 2; j++) {
                    const pos = this.findIndex();
                    this.grid[pos.y * gridW + pos.x] = new Card(card);
                }
            }
            this.io.to(this.room).emit("matching:newBoard", { cardlist: this.possibleCards(), gridW: this.gridW, gridH: this.gridH });
        } else {
            requester.emit("matching:waitForNewBoard");
        }
    }

    possibleCards() {
        return this.grid.map(e => e.type);
    }

    randomCards(count) {
        return this.possibleValues.sort(() => .5 - Math.random()).slice(0, count);
    }

    findIndex() {
        const pos = new Pos();
        do {
            const rand = Math.floor(Math.random(this.gridW * this.gridH));
            pos.x = rand % this.gridW;
            pos.y = floor(rand / this.gridW);
        } while (this.grid[pos.y] != null && this.grid[pos.y][pos.x] != null);
        return pos;
    }
}

class Pos {
    constructor(x, y) {
        this.x = x ?? 0;
        this.y = y ?? 0;
    }
}

export { Board };