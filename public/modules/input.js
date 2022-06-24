class Button {

    constructor(x, y, w, h) {
        this.pos = createVector(x, y);
        this.size = createVector(w, h);
        this.focus = false;
    }

    onUpdate() {
        fill(64);
        rect(this.pos.x, this.pos.y, this.size.x, this.size.y, this.size.y / 4);
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
        return this.pos.x - this.size.x / 2 < mouseX && this.pos.x + this.size.x / 2 > mouseX && this.pos.y - this.size.y / 2 < mouseY && this.pos.y + this.size.y / 2 > mouseY;
    }
}

class TextButton extends Button {

    constructor(text, x, y, w, h) {
        super(x, y, w, h);
        this.text = text;
    }

    onUpdate() {
        super.onUpdate();
        fill(textColor);
        textSize(textsSize * getScale);
        text(this.text, this.pos.x, this.pos.y);
    }
}

class ImageButton extends Button {


    constructor(image, x, y, w, h) {
        super(x, y, w, h);
        this.image = image;
    }

    onUpdate() {
        super.onUpdate();
        image(this.image, this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
}

class Textbox {

    constructor(pholder, x, y, w, h, obscureText) {
        this.pos = createVector(x, y);
        this.size = createVector(w, h);
        this.placeholder = pholder;
        this.isObscured = obscureText;
        this.text = "";
        this.isFocused = false;
        this.blinking = false;
        this.next = 0;
    }

    onUpdate() {
        if (this.next <= millis() && this.isFocused) {
            this.next = millis() + 500;
            this.blinking = !this.blinking;
        }
        fill(64);
        textSize(textsSize * getScale);
        rect(this.pos.x, this.pos.y, this.size.x, this.size.y, this.size.y / 4);
        let output = this.text;
        if (this.isObscured) {
            output = "";
            for (let i = 0; i < this.text.length; i++)
                output += "•";
        }
        if (this.text.length > 0 || this.isFocused) {
            fill(235);
            if (this.blinking && this.isFocused) text(output + '|', this.pos.x + 3, this.pos.y, this.size.x, this.size.y);
            else text(output, this.pos.x + 3, this.pos.y, this.size.x, this.size.y);
        } else {
            fill(150, 180, 220, 128);
            text(this.placeholder, this.pos.x + 3, this.pos.y, this.size.x, this.size.y);
        }
    }

    onMousePress() {
        if (this.isPressing()) {
            this.isFocused = true;
            this.next = millis() + 500;
            return true;
        }
        this.isFocused = false;
        return false;
    }

    onKeyPress() {
        if (!this.isFocused) return;
        if (keyCode == BACKSPACE) {
            if (this.text.length > 0) this.text = this.text.substring(0, this.text.length - 1);
        } else if (keyCode == RETURN) {
            this.listener(this.text);
        } else if (keyCode < 91 && keyCode > 47) {
            this.text += key;
        } else {
            console.log(key, keyCode);
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
        return this.pos.x - this.size.x / 2 < mouseX && this.pos.x + this.size.x / 2 > mouseX && this.pos.y - this.size.y / 2 < mouseY && this.pos.y + this.size.y / 2 > mouseY;
    }
}