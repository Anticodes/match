import { TextButton } from "../input.js";
import Page from "../pages.js";
import { textsSize } from "../constants.js";
import Board from "./board.js";

const { loadImage, noSmooth, textAlign, rectMode, imageMode, textSize, background, image, width, height, getScale, CENTER } = import("../../index.js");

class MatchingGame extends Page {

    onCreate(args) {
        this.backgroundImage = loadImage("/assets/matching/background.png");
        this.mystery = loadImage("/assets/matching/secret.png");
        this.blueBorder = loadImage("/assets/matching/blue.png");
        this.redBorder = loadImage("/assets/matching/red.png");
        noSmooth();
        textAlign(CENTER, CENTER);
        rectMode(CENTER);
        imageMode(CENTER);
        textSize(textsSize * getScale);
        this.board = new Board(args);
        this.restart = new TextButton("New Board", width / 2 - 300 * getScale, 7 * height / 8, 400 * getScale, 60 * getScale);
        this.restart.setOnClickListener(this.board.newBoard);
        this.reset = new TextButton("Reset Game", width / 2 + 300 * getScale, 7 * height / 8, 400 * getScale, 60 * getScale);
        this.reset.setOnClickListener(this.board.reset);
    }

    onUpdate() {
        background(0);
        if (this.backgroundImage) image(this.backgroundImage, width / 2, height / 2, width, height);
        this.board.onUpdate();
        this.restart.onUpdate();
        this.reset.onUpdate();
    }

    onWindowResized() {
        this.restart.pos.set(width / 2 - 200 * getScale, 7 * height / 8);
        this.restart.size.set(300 * getScale, 50 * getScale);
        this.reset.pos.set(width / 2 + 200 * getScale, 7 * height / 8);
        this.reset.size.set(300 * getScale, 50 * getScale);
        this.board.onWindowResized();
    }

    onMousePress() {
        this.board.onMousePress();
        this.restart.onMousePress();
        this.reset.onMousePress();
    }
}

export const matchingGamePage = new MatchingGame();