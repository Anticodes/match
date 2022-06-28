class Card {

  constructor(x, y, cards) {
    this.pos = createVector(x, y);
    this.mystery = pageManager.getCurrentPage().mystery;
    this.cards = cards;
    this.revealed = false;
  }

  render() {
    image(this.revealed ? this.cards[this.type] : this.mystery, this.pos.x, this.pos.y, cardWidth * getScale, cardHeight * getScale);
    if (this.revealed) image(this.border, this.pos.x, this.pos.y - (borderHeight - cardHeight) / 3 * getScale, borderWidth * getScale, borderHeight * getScale);
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
    if (mouseX > this.pos.x - cardWidth / 2 * getScale && mouseX < this.pos.x + cardWidth / 2 * getScale && mouseY > this.pos.y - cardHeight / 2 * getScale && mouseY < this.pos.y + cardHeight / 2 * getScale) {
      return true;
    }
    return false;
  }
}