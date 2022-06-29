import sketch from "../../index.js";
import { cardHeight, cardWidth, borderHeight, borderWidth } from "./matchingConstants.js";
import { pageManager } from "../managers/page.js";

class Card {

    constructor(x, y, cards) {
        this.pos = sketch.createVector(x, y);
        this.mystery = pageManager.getCurrentPage().mystery;
        this.cards = cards;
        this.revealed = false;
    }

    render() {
        sketch.image(this.revealed ? this.cards[this.type] : this.mystery, this.pos.x, this.pos.y, cardWidth * sketch.getScale, cardHeight * sketch.getScale);
        if (this.revealed) sketch.image(this.border, this.pos.x, this.pos.y - (borderHeight - cardHeight) / 3 * sketch.getScale, borderWidth * sketch.getScale, borderHeight * sketch.getScale);
    }

    setBorder(border) {
        this.border = border;
    }

    reveal(type) {
        this.type = type;
        this.revealed = true;
    }

    unreveal() {
        this.type = null;
        this.revealed = false;
    }

    pressed() {
        if (sketch.mouseX > this.pos.x - cardWidth / 2 * sketch.getScale && sketch.mouseX < this.pos.x + cardWidth / 2 * sketch.getScale && sketch.mouseY > this.pos.y - cardHeight / 2 * sketch.getScale && sketch.mouseY < this.pos.y + cardHeight / 2 * sketch.getScale) {
            return true;
        }
        return false;
    }
}

export default Card;