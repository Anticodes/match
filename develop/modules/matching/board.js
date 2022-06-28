class Board {

  constructor(args) {
    this.first = new Player(args.username, 500 * getScale, height / 2);
    this.second = new Player(args.opponentname, 1333 * getScale, height / 2);
    this.animation = false;
    this.handleNewBoard();
    this.newBoard();
  }

  onUpdate() {
    if (this.animation) {
      if (millis() - this.startMs > 1000) {
        this.animation = false;
      }
    }
    for (let y = 0; y < this.gridH; y++) {
      for (let x = 0; x < this.gridW; x++) {
        this.grid[y][x].render();
      }
    }
    this.first.render(this.turn);
    this.second.render(!this.turn);
  }

  onWindowResized() {
    this.offX = (width - (cardWidth + 20) * (this.gridW - 1) * getScale) / 2;
    this.first.setPos(this.offX / 2, height / 2);
    this.second.setPos(width - this.offX / 2, height / 2);
    for (let i = 0; i < this.gridH; i++) {
      for (let j = 0; j < this.gridW; j++) {
        if (!this.grid[i]) {
          this.grid[i] = [];
        }
        this.grid[i][j].pos.set(j * (cardWidth + 20) * getScale + this.offX, i * (cardHeight + 20) * getScale + 200 * getScale);
      }
    }
  }

  newBoard() {
    console.log("new board requested");
    socketHelper.socket.emit("matching:newBoard");
  }

  handleNewBoard() {
    socketHelper.socket.on("matching:board", (args) => {
      console.log("new board");
      const cards = {};
      this.turn = args.turn == socketHelper.socket.id;
      for (const card of args.cardList) {
        loadImage(`assets/matching/${card}.png`, (ar) => cards[card] = ar, console.log);
      }
      this.gridW = args.gridW;
      this.gridH = args.gridH;
      this.offX = (width - (cardWidth + 20) * (this.gridW - 1) * getScale) / 2;
      this.first.setPos(this.offX / 2, height / 2);
      this.second.setPos(width - this.offX / 2, height / 2);
      this.grid = [];
      for (let i = 0; i < this.gridH; i++) {
        for (let j = 0; j < this.gridW; j++) {
          if (!this.grid[i]) {
            this.grid[i] = [];
          }
          this.grid[i][j] = new Card(j * (cardWidth + 20) * getScale + this.offX, i * (cardHeight + 20) * getScale + 200 * getScale, cards);
        }
      }
    });
    socketHelper.socket.on("matching:reveal", (args) => {
      if (this.fir == null) {
        this.fir = this.grid[args.y][args.x];
        this.fir.reveal(args.type);
        this.fir.setBorder(this.turn ? pageManager.getCurrentPage().redBorder : pageManager.getCurrentPage().blueBorder);
      } else {
        this.sec = this.grid[args.y][args.x];
        this.sec.reveal(args.type);
        this.sec.setBorder(this.turn ? pageManager.getCurrentPage().redBorder : pageManager.getCurrentPage().blueBorder);
        this.animation = true;
        this.startMs = millis();
      }
    });
    socketHelper.socket.on("matching:correct", (args) => {
      setTimeout(() => {
        if (this.turn) {
          this.first.addPoints(args.points);
        } else {
          this.second.addPoints(args.points);
        }
        this.turn = socketHelper.socket.id == args.turn;
        this.fir = null;
        this.sec = null;
      }, 1000);
    });
    socketHelper.socket.on("matching:incorrect", (args) => {
      setTimeout(() => {
        this.turn = socketHelper.socket.id == args.turn;
        this.fir.unreveal();
        //TODO find why this.sec becomes null
        this.sec.unreveal();
        this.fir = null;
        this.sec = null;
      }, 1000);
    });
    socketHelper.socket.on("matching:waitForNewBoard", () => {
      //TODO show the user a waiting screen with cancel button
      //Additionally make a notification system like bottom toast
    });
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

  onMousePress() {
    if (this.animation || this.second.turn) return;
    for (let y = 0; y < this.gridH; y++) {
      for (let x = 0; x < this.gridW; x++) {
        if (this.grid[y][x].pressed() && !this.grid[y][x].revealed) {
          socketHelper.socket.emit("matching:openCard", { x, y });
          return;
        }
      }
    }
  }
}