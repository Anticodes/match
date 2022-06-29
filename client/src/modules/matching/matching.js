import sketch from "../../index.js";
import Board from "./board.js";
import { Page } from "../pages.js";
import { TextButton } from "../input.js";
import { textsSize } from "../constants.js";

class MatchingGame extends Page {

    onCreate(args) {
        this.backgroundImage = sketch.loadImage("/assets/matching/background.png");
        this.mystery = sketch.loadImage("/assets/matching/secret.png");
        this.blueBorder = sketch.loadImage("/assets/matching/blue.png");
        this.redBorder = sketch.loadImage("/assets/matching/red.png");
        sketch.noSmooth();
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.rectMode(sketch.CENTER);
        sketch.imageMode(sketch.CENTER);
        sketch.textSize(textsSize * sketch.getScale);
        this.board = new Board(args);
        this.restart = new TextButton("New Board", sketch.width / 2 - 300 * sketch.getScale, 7 * sketch.height / 8, 400 * sketch.getScale, 60 * sketch.getScale);
        this.restart.setOnClickListener(this.board.newBoard);
        this.reset = new TextButton("Reset Game", sketch.width / 2 + 300 * sketch.getScale, 7 * sketch.height / 8, 400 * sketch.getScale, 60 * sketch.getScale);
        this.reset.setOnClickListener(this.board.reset);
    }

    onUpdate() {
        sketch.background(0);
        if (this.backgroundImage) sketch.image(this.backgroundImage, sketch.width / 2, sketch.height / 2, sketch.width, sketch.height);
        this.board.onUpdate();
        this.restart.onUpdate();
        this.reset.onUpdate();
    }

    onWindowResized() {
        this.restart.pos.set(sketch.width / 2 - 200 * sketch.getScale, 7 * sketch.height / 8);
        this.restart.size.set(300 * sketch.getScale, 50 * sketch.getScale);
        this.reset.pos.set(sketch.width / 2 + 200 * sketch.getScale, 7 * sketch.height / 8);
        this.reset.size.set(300 * sketch.getScale, 50 * sketch.getScale);
        this.board.onWindowResized();
    }

    onMousePress() {
        this.board.onMousePress();
        this.restart.onMousePress();
        this.reset.onMousePress();
    }
}

export const matchingGamePage = new MatchingGame();