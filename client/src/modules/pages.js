import sketch from "../index.js";
import { backColor, headerTextSize, textColor } from "./constants.js";
import { TextButton, Textbox } from "./input.js";
import { pageManager } from "./managers/page.js";
import { networkManager } from "./managers/network.js";

class Page {
    onCreate() { }
    onUpdate() { }
    onWindowResized() { }
    onMousePress() { }
    onMouseRelease() { }
    onMouseDrag() { }
    onKeyPress() { }
    onKeyRelease() { }
}

class MainPage extends Page {

    onCreate() {
        sketch.rectMode(sketch.CENTER);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.imageMode(sketch.CENTER);
        sketch.noStroke();
        this.loginButton = new TextButton("Login", sketch.width / 2, 2 * sketch.height / 3, sketch.width / 3, 80 * sketch.getScale);
        this.loginButton.setOnClickListener((focus) => {
            if (focus) {
                pageManager.push("loginPage");
            }
        });
    }

    onUpdate() {
        sketch.background(backColor);
        sketch.fill(textColor);
        sketch.textSize(headerTextSize * sketch.getScale);
        sketch.text("Welcome to the\nTwilight Gamezone", sketch.width / 2, sketch.height / 3);
        this.loginButton.onUpdate();
    }

    onWindowResized() {
        this.loginButton.pos.set(sketch.width / 2, 2 * sketch.height / 3);
        this.loginButton.size.set(sketch.width / 3, 80 * sketch.getScale);
    }

    onMousePress() {
        this.loginButton.onMousePress();
    }

    onMouseRelease() {
        this.loginButton.onMouseRelease();
    }
}

class LoginPage extends Page {

    onCreate() {
        sketch.rectMode(sketch.CENTER);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.imageMode(sketch.CENTER);
        sketch.noStroke();
        this.oneOverSeven = sketch.height / 7;
        this.usernameTextbox = new Textbox("Username", sketch.width / 2, 4 * this.oneOverSeven, sketch.width / 3, 80 * sketch.getScale);
        this.usernameTextbox.setOnSubmitListener((text) => {
            if (focus) {
                this.login(text);
            }
        });
        this.loginButton = new TextButton("Login", sketch.width / 2, 5 * this.oneOverSeven, sketch.width / 3, 80 * sketch.getScale);
        this.loginButton.setOnClickListener((focus) => {
            if (focus) {
                this.login();
            }
        });
    }

    onUpdate() {
        sketch.background(backColor);
        sketch.textSize(headerTextSize * sketch.getScale);
        sketch.text("Login to the Zone", sketch.width / 2, 2 * this.oneOverSeven);
        this.usernameTextbox.onUpdate();
        this.loginButton.onUpdate();
    }

    onWindowResized() {
        this.oneOverSeven = sketch.height / 7;
        this.usernameTextbox.pos.set(sketch.width / 2, 4 * this.oneOverSeven);
        this.usernameTextbox.size.set(sketch.width / 3, 80 * sketch.getScale);
        this.loginButton.pos.set(sketch.width / 2, 5 * this.oneOverSeven);
        this.loginButton.size.set(sketch.width / 3, 80 * sketch.getScale);
    }

    onMousePress() {
        this.usernameTextbox.onMousePress();
        this.loginButton.onMousePress();
    }

    onMouseRelease() {
        this.loginButton.onMouseRelease();
    }

    onKeyPress() {
        this.usernameTextbox.onKeyPress();
    }

    login(text) {
        if (this.usernameTextbox.isEmpty()) return;
        networkManager.login(text ?? this.usernameTextbox.text, () => {
            this.usernameTextbox.clear();
            pageManager.push("gameSelectorPage");
        });
    }
}

class GameSelector extends Page {

    onCreate() {
        sketch.rectMode(sketch.CENTER);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.imageMode(sketch.CENTER);
        sketch.noStroke();
        this.matchingGameButton = new TextButton("Matching Game", sketch.width / 5, sketch.height / 2, 400 * sketch.getScale, 60 * sketch.getScale);
        this.matchingGameButton.setOnClickListener(() => pageManager.push("matching/matchingLobbyPage"));
        this.foodshopButton = new TextButton("More coming soon...", 4 * sketch.width / 5, sketch.height / 2, 500 * sketch.getScale, 60 * sketch.getScale);
    }

    onUpdate() {
        sketch.background(backColor);
        sketch.textSize(headerTextSize * sketch.getScale);
        sketch.fill(textColor);
        sketch.text("Game Selector", sketch.width / 2, sketch.height / 10);
        this.matchingGameButton.onUpdate();
        this.foodshopButton.onUpdate();
    }

    onWindowResized() {
        this.matchingGameButton.pos.set(sketch.width / 5, sketch.height / 2);
        this.matchingGameButton.size.set(400 * sketch.getScale, 60 * sketch.getScale);
        this.foodshopButton.pos.set(4 * sketch.width / 5, sketch.height / 2);
        this.foodshopButton.size.set(500 * sketch.getScale, 60 * sketch.getScale);
    }

    onMousePress() {
        this.matchingGameButton.onMousePress();
    }
}

export {
    Page,
    MainPage,
    LoginPage,
    GameSelector,
};