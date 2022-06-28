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
        background(backColor);
        fill(textColor);
        textSize(headerTextSize * getScale);
        text("Welcome to the\nTwilight Gamezone", width / 2, height / 3);
        this.loginButton.onUpdate();
    }

    onWindowResized() {
        this.loginButton.pos.set(width / 2, 2 * height / 3);
        this.loginButton.size.set(width / 3, 80 * getScale);
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
        rectMode(CENTER);
        textAlign(CENTER, CENTER);
        imageMode(CENTER);
        noStroke();
        this.oneOverSeven = height / 7;
        this.usernameTextbox = new Textbox("Username", width / 2, 4 * this.oneOverSeven, width / 3, 80 * getScale);
        this.usernameTextbox.setOnSubmitListener((text) => {
            if (focus) {
                this.login(text);
            }
        });
        this.loginButton = new TextButton("Login", width / 2, 5 * this.oneOverSeven, width / 3, 80 * getScale);
        this.loginButton.setOnClickListener((focus) => {
            if (focus) {
                this.login();
            }
        });
    }

    onUpdate() {
        background(backColor);
        textSize(headerTextSize * getScale);
        text("Login to the Zone", width / 2, 2 * this.oneOverSeven);
        this.usernameTextbox.onUpdate();
        this.loginButton.onUpdate();
    }

    onWindowResized() {
        this.oneOverSeven = height / 7;
        this.usernameTextbox.pos.set(width / 2, 4 * this.oneOverSeven);
        this.usernameTextbox.size.set(width / 3, 80 * getScale);
        this.loginButton.pos.set(width / 2, 5 * this.oneOverSeven);
        this.loginButton.size.set(width / 3, 80 * getScale);
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
        rectMode(CENTER);
        textAlign(CENTER, CENTER);
        imageMode(CENTER);
        noStroke();
        this.matchingGameButton = new TextButton("Matching Game", width / 5, height / 2, 400 * getScale, 60 * getScale);
        this.matchingGameButton.setOnClickListener(() => pageManager.push("matchingLobbyPage"));
        this.foodshopButton = new TextButton("More coming soon...", 4 * width / 5, height / 2, 500 * getScale, 60 * getScale);
    }

    onUpdate() {
        background(backColor);
        textSize(headerTextSize * getScale);
        fill(textColor);
        text("Game Selector", width / 2, height / 10);
        this.matchingGameButton.onUpdate();
        this.foodshopButton.onUpdate();
    }

    onWindowResized() {
        this.matchingGameButton.pos.set(width / 5, height / 2);
        this.matchingGameButton.size.set(400 * getScale, 60 * getScale);
        this.foodshopButton.pos.set(4 * width / 5, height / 2);
        this.foodshopButton.size.set(500 * getScale, 60 * getScale);
    }

    onMousePress() {
        this.matchingGameButton.onMousePress();
    }
}

export default Page;

export const mainPage = new MainPage();
export const loginPage = new LoginPage();
export const gameSelectorPage = new GameSelector();