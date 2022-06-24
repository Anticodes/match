class MatchingLobby extends Page {

    onCreate() {
        rectMode(CENTER);
        textAlign(CENTER, CENTER);
        imageMode(CENTER);
        noStroke();
        this.loading = true;
        this.buttons = [];
        this.joinLobby();
        this.getLobbies();
    }

    onUpdate() {
        background(backColor);
        textSize(headerTextSize * getScale);
        fill(textColor);
        text("Matching Lobby", width / 2, height / 10);
        textSize(textsSize * getScale);
        text("🔃", width - 50 * getScale, 50 * getScale);
        if (this.loading) {
            text("Loading", width / 2, height / 2 + 100 * getScale);
            textSize(headerTextSize * getScale);
            push();
            translate(width / 2, height / 2);
            rotate(frameCount / 10);
            text("↻", -2 * getScale, 11 * getScale);
            pop();
            return;
        }
        for (const button of this.buttons) {
            button.onUpdate();
        }
    }

    onWindowResized() {
        for (const [index, button] of this.buttons.entries()) {
            button.pos.set(index % 2 ? 2 * width / 3 : width / 3, Math.floor(index / 2 + 2) * height / 10);
            button.size.set(400 * getScale, 50 * getScale);
        }
    }

    onMousePress() {
        for (const button of this.buttons) {
            button.onMousePress();
        }
        if (mouseX < width - 30 * getScale && mouseX > width - 70 * getScale && mouseY < 70 * getScale && mouseY > 30 * getScale) {
            this.getLobbies();
        }
    }

    joinLobby() {
        this.page = 0;
        socketHelper.joinLobby("matching", this.startGame);
    }

    startGame(socket) {
        socket.on("matching:startGame", (opponent) => {
            console.log("aa");
            pageManager.push("matchingGamePage", { username: socketHelper.user.username, opponentname: opponent.username });
        });
        socket.on("matching:alreadyPlaying", () => {
            this.getLobbies();
        });
    }

    getLobbies() {
        this.loading = true;
        socketHelper.getLobby("matching", 0 + this.page * 16, 16 + this.page * 16, (lobbies) => {
            this.loading = false;
            this.buttons = [];
            for (const lobby of lobbies) {
                console.log(lobby);
                const button = new TextButton(lobby.username, this.buttons.length % 2 ? 2 * width / 3 : width / 3, Math.floor(this.buttons.length / 2 + 2) * height / 10, 400 * getScale, 50 * getScale);
                button.setOnClickListener((focus) => this.lobbyButtonListener(focus, lobby));
                this.buttons.push(button);
            }
        });
    }

    lobbyButtonListener(focus, lobby) {
        if (focus) {
            socketHelper.joinRoom("matching", lobby);
        }
    }
}
