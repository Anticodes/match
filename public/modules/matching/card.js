class Card {

  constructor(x, y) {
    this.pos = createVector(x, y, cards);
    this.mystery = pageManager.getCurrentPage().mystery;
    this.cards = this.cards;
  }

  render() {
    image(this.revealed ? this.cards[this.type] : this.mystery, this.pos.x, this.pos.y, cardWidth, cardHeight);
    stroke(this.outline ? this.outline : color(13, 65, 67));
    noFill();
    if (this.revealed) rect(this.pos.x, this.pos.y, cardWidth, cardHeight);
    fill(255);
    stroke(13, 65, 67);
  }

  setOutline(col) {
    this.outline = col;
  }

  reveal(type) {
    this.type = type;
    this.revealed = true;
  }

  pressed() {
    if (mouseX > this.pos.x - cardWidth / 2 && mouseX < this.pos.x + cardWidth / 2 && mouseY > this.pos.y - cardHeight / 2 && mouseY < this.pos.y + cardHeight / 2) {
      return true;
    }
    return false;
  }
}