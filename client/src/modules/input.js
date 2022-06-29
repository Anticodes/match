import sketch from "../index.js";
import { textColor, textsSize } from "./constants.js";

class Button {

    constructor(x, y, w, h) {
        this.pos = sketch.createVector(x, y);
        this.size = sketch.createVector(w, h);
        this.focus = false;
    }

    onUpdate() {
        sketch.fill(64);
        sketch.rect(this.pos.x, this.pos.y, this.size.x, this.size.y, this.size.y / 4);
    }

    onMousePress() {
        if (this.isPressing()) {
            this.focus = true;
            this.listener(this.focus);
        }
    }

    setOnClickListener(listener) {
        this.listener = listener;
    }

    onMouseRelease() {
        this.focus = false;
        this.listener(this.focus);
    }

    isPressing() {
        return this.pos.x - this.size.x / 2 < sketch.mouseX && this.pos.x + this.size.x / 2 > sketch.mouseX && this.pos.y - this.size.y / 2 < sketch.mouseY && this.pos.y + this.size.y / 2 > sketch.mouseY;
    }
}

class TextButton extends Button {

    constructor(text, x, y, w, h) {
        super(x, y, w, h);
        this.text = text;
    }

    onUpdate() {
        super.onUpdate();
        sketch.fill(textColor);
        sketch.textSize(textsSize * sketch.getScale);
        sketch.text(this.text, this.pos.x, this.pos.y);
    }
}

class ImageButton extends Button {


    constructor(image, x, y, w, h) {
        super(x, y, w, h);
        this.image = image;
    }

    onUpdate() {
        super.onUpdate();
        sketch.image(this.image, this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
}

class Textbox {

    constructor(pholder, x, y, w, h, obscureText) {
        this.pos = sketch.createVector(x, y);
        this.size = sketch.createVector(w, h);
        this.placeholder = pholder;
        this.isObscured = obscureText;
        this.text = "";
        this.isFocused = false;
        this.blinking = false;
        this.next = 0;
    }

    onUpdate() {
        if (this.next <= sketch.millis() && this.isFocused) {
            this.next = sketch.millis() + 500;
            this.blinking = !this.blinking;
        }
        sketch.fill(64);
        sketch.textSize(textsSize * sketch.getScale);
        sketch.rect(this.pos.x, this.pos.y, this.size.x, this.size.y, this.size.y / 4);
        let output = this.text;
        if (this.isObscured) {
            output = "";
            for (let i = 0; i < this.text.length; i++)
                output += "•";
        }
        if (this.text.length > 0 || this.isFocused) {
            sketch.fill(235);
            if (this.blinking && this.isFocused) sketch.text(output + "|", this.pos.x + 3, this.pos.y, this.size.x, this.size.y);
            else sketch.text(output, this.pos.x + 3, this.pos.y, this.size.x, this.size.y);
        } else {
            sketch.fill(150, 180, 220, 128);
            sketch.text(this.placeholder, this.pos.x + 3, this.pos.y, this.size.x, this.size.y);
        }
    }

    onMousePress() {
        if (this.isPressing()) {
            this.isFocused = true;
            this.next = sketch.millis() + 500;
            return true;
        }
        this.isFocused = false;
        return false;
    }

    onKeyPress() {
        if (!this.isFocused) return;
        if (sketch.keyCode == sketch.BACKSPACE) {
            if (this.text.length > 0) this.text = this.text.substring(0, this.text.length - 1);
        } else if (sketch.keyCode == sketch.RETURN) {
            this.listener(this.text);
        } else if (sketch.keyCode < 91 && sketch.keyCode > 47) {
            this.text += sketch.key;
        }
    }

    setOnSubmitListener(listener) {
        this.listener = listener;
    }

    clear() {
        this.text = "";
        this.isFocused = false;
    }

    isEmpty() {
        return this.text == "";
    }

    isPressing() {
        return this.pos.x - this.size.x / 2 < sketch.mouseX && this.pos.x + this.size.x / 2 > sketch.mouseX && this.pos.y - this.size.y / 2 < sketch.mouseY && this.pos.y + this.size.y / 2 > sketch.mouseY;
    }
}

export {
    Button,
    TextButton,
    ImageButton,
    Textbox
};