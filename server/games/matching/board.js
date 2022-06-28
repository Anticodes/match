import Card from "./card.js";

class Board {

    constructor(gridW, gridH, io, socket1, socket2) {
        this.gridW = gridW;
        this.gridH = gridH;
        this.boardRequests = 0;
        this.combo = false;
        this.room = socket2.id;
        this.io = io;
        this.possibleValues = [];
        for (let i = 0; i < 42; i++) this.possibleValues.push(i);
        this.possibleValues = this.possibleValues.sort(() => .5 - Math.random());
        socket1.on("matching:newBoard", () => this.newBoard(socket1));
        socket1.on("matching:openCard", (args) => this.openCard(args, socket1.id, socket2.id));
        socket2.on("matching:newBoard", () => this.newBoard(socket2));
        socket2.on("matching:openCard", (args) => this.openCard(args, socket2.id, socket1.id));
    }

    newBoard(requester) {
        this.boardRequests++;
        if (this.boardRequests === 2) {
            this.grid = [];
            const cards = this.randomCards(9);
            for (let card of cards) {
                for (let j = 0; j < 2; j++) {
                    const pos = this.findIndex();
                    this.grid[pos.y * this.gridW + pos.x] = new Card(card);
                }
            }
            this.turn = requester.id;
            this.io.to(this.room).emit("matching:board", { cardList: this.possibleCards(), gridW: this.gridW, gridH: this.gridH, turn: this.turn });
            this.boardRequests = 0;
        } else {
            requester.emit("matching:waitForNewBoard");
        }
    }

    openCard(args, requester, opponent) {
        if (this.turn == requester) {
            const index = args.y * this.gridW + args.x;
            this.io.to(this.room).emit("matching:reveal", { y: args.y, x: args.x, type: this.grid[index].type });
            if (this.fir == null) {
                this.fir = this.grid[index].type;
            } else {
                if (this.fir == this.grid[index].type) {
                    this.io.to(this.room).emit("matching:correct", { points: this.combo ? 20 : 10, turn: this.combo ? opponent : requester });
                    this.combo = !this.combo;
                } else {
                    this.io.to(this.room).emit("matching:incorrect", { turn: opponent });
                    this.combo = false;
                }
                this.fir = null;
                if (!this.combo) this.turn = opponent;
            }
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
            const rand = Math.floor(Math.random() * this.gridW * this.gridH);
            pos.x = rand % this.gridW;
            pos.y = Math.floor(rand / this.gridW);
        } while (this.grid[pos.y * this.gridW + pos.x]);
        return pos;
    }
}

class Pos {
    constructor(x, y) {
        this.x = x ?? 0;
        this.y = y ?? 0;
    }
}

export default Board;