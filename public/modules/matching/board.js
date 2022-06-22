class Board {

  constructor(args) {
    this.socket = args.socket;
    this.first = new Player(args.username, this.offX / 2, height / 2);
    this.second = new Player(args.opponentname, width - this.offX / 2, height / 2);
    this.animation = false;
    this.handleNewBoard();
    this.newBoard();
  }

  render() {
    strokeWeight(10);
    if (this.animation) {
      if (millis() - this.startMs > 1000) {
        if (this.fir.type == this.sec.type) {
          if (this.turn) {
            this.second.addPoints(this.combo ? 20 : 10);
            this.combo = !this.combo;
          } else {
            this.first.addPoints(this.combo ? 20 : 10);
            this.combo = !this.combo;
          }
        } else {
          this.fir.revealed = false;
          this.sec.revealed = false;
          this.combo = false;
        }
        this.fir = null;
        this.sec = null;
        if (!this.combo) this.turn = !this.turn;
        this.animation = false;
      }
    }
    for (let y = 0; y < this.gridH; y++) {
      for (let x = 0; x < this.gridW; x++) {
        this.grid[y][x].render();
      }
    }
    strokeWeight(1);
    this.first.render(!this.turn);
    this.second.render(this.turn);
  }

  newBoard() {
    this.socket.emit("matching:newBoard");
  }

  handleNewBoard() {
    this.socket.on("matching:newBoard", (args) => {
      const cards = args.cardList;
      this.cards = [];
      for (const card of cards) {
        this.cards[i] = loadImage(`assets/${card}.png`);
      }
      this.gridW = args.gridW;
      this.gridH = args.gridH;
      this.offX = (width - (cardWidth + 20) * (this.gridW - 1)) / 2;
      this.first.setPos(this.offX / 2, height / 2);
      this.second.setPos(width - this.offX / 2, height / 2);
      this.grid = [];
      const max = this.gridW * this.gridH / 2;
      for (let i = 0; i < gridH; i++) {
        for (let j = 0; j < gridW; j++) {
          if (!this.grid[i]) {
            this.grid[i] = [];
          }
          this.grid[i][j] = new Card(j * (cardWidth + 20) + this.offX, i * (cardHeight + 20) + 200, cards);
        }
      }
    })
  }

  reset() {
    this.first.points = 0;
    this.second.points = 0;
    this.turn = false;
    this.fir = null;
    this.sec = null;
    this.animation = false;
    this.newBoard();
  }

  pressed() {
    if (this.animation || this.second.turn) return;
    for (let y = 0; y < this.gridH; y++) {
      for (let x = 0; x < this.gridW; x++) {
        if (this.grid[y][x].pressed() && !this.grid[y][x].revealed) {
          if (this.fir == null) {
            this.socket.emit("matching:firstCard", { x, y });
            this.fir = this.grid[y][x];
            this.fir.setOutline(this.turn ? color(255, 0, 0) : color(0, 0, 255));
          } else {
            this.sec = this.grid[y][x];
            this.sec.setOutline(this.turn ? color(255, 0, 0) : color(0, 0, 255));
            this.animation = true;
            this.startMs = millis();
          }
          this.grid[y][x].revealed = true;
          return;
        }
      }
    }
  }
}