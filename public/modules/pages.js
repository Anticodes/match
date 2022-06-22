class Page {
    onCreate() { }
    onUpdate() { }
    onMousePress() { }
    onMouseRelease() { }
    onMouseDrag() { }
    onKeyPress() { }
    onKeyRelease() { }
}

class MainPage extends Page {

    onCreate() {
        rectMode(CENTER);
        textAlign(CENTER, CENTER);
        imageMode(CENTER);
        noStroke();
        this.loginButton = new TextButton("Login", width / 2, 2 * height / 3, width / 3, 80);
        this.loginButton.setOnClickListener((focus) => {
            if (focus) {
                pageManager.push("loginPage");
            }
        });
    }

    onUpdate() {
        background(backColor);
        fill(textColor);
        textSize(headerTextSize);
        text("TWILIGHT", width / 2, height / 3);
        this.loginButton.onUpdate();
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
        this.usernameTextbox = new Textbox("Username", width / 2, 4 * this.oneOverSeven, width / 3, 80);
        this.usernameTextbox.setOnSubmitListener((text) => {
            this.usernameTextbox.isFocused = false;
            this.passwordTextbox.isFocused = true;
        });
        this.loginButton = new TextButton("Login", width / 2, 5 * this.oneOverSeven, width / 3, 80);
        this.loginButton.setOnClickListener((focus) => {
            if (focus) {
                this.login();
            }
        });
    }

    onUpdate() {
        background(backColor);
        textSize(headerTextSize);
        text("LOGIN TO GAMES", width / 2, 2 * this.oneOverSeven);
        this.usernameTextbox.onUpdate();
        this.loginButton.onUpdate();
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

    login() {
        if (this.usernameTextbox.isEmpty()) return;
        socketHelper.login(this.usernameTextbox.text, () => {
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
        this.matchingGameButton = new TextButton("Matching Game", width / 5, height / 2, 400, 60);
        this.matchingGameButton.setOnClickListener((focus) => pageManager.push("matchingLobbyPage"));
        this.foodshopButton = new TextButton("More coming soon...", 4 * width / 5, height / 2, 500, 60);
    }

    onUpdate() {
        background(backColor);
        textSize(headerTextSize);
        fill(textColor);
        text("Game Selector", width / 2, height / 10);
        this.matchingGameButton.onUpdate();
        this.foodshopButton.onUpdate();
    }

    onMousePress() {
        this.matchingGameButton.onMousePress();
    }
}
