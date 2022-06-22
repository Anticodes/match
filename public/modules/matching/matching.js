class MatchingGame extends Page {

    onCreate(args) {
        this.backgroundImage = loadImage("data/background.png");
        this.mystery = loadImage("data/secret.png");
        noSmooth();
        textAlign(CENTER, CENTER);
        rectMode(CENTER);
        imageMode(CENTER);
        noFill();
        strokeWeight(10);
        textSize(textsSize);
        this.board = new Board(6, 3, args);
        this.restart = new TextButton("New Board", width / 2 - 200, 7 * height / 8, 300, 50);
        this.restart.setOnClickListener(this.board.newBoard);
        this.reset = new TextButton("Reset Game", width / 2 + 200, 7 * height / 8, 300, 50);
        this.reset.setOnClickListener(this.board.reset);
    }

    onUpdate() {
        background(0);
        image(this.backgroundImage, width / 2, height / 2, width, height);
        this.board.render();
        this.restart.onUpdate(width / 2 - 200, 7 * height / 8);
        this.reset.onUpdate(width / 2 + 200, 7 * height / 8);
    }

    onMousePress() {
        this.board.pressed();
        this.restart.onMousePress();
        this.reset.onMousePress();
    }
}