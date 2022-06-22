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
        textSize(headerTextSize);
        fill(textColor);
        text("Matching Lobby", width / 2, height / 10);
        textSize(textsSize);
        text("🔃", width - 50, 50);
        if (this.loading) {
            text("Loading", width / 2, height / 2 + 100);
            textSize(headerTextSize);
            push();
            translate(width / 2, height / 2);
            rotate(frameCount / 10);
            text("↻", -2, 11);
            pop();
            return;
        }
        for (const button of this.buttons) {
            button.onUpdate();
        }
    }

    onMousePress() {
        for (const button of this.buttons) {
            button.onMousePress();
        }
        if (mouseX < width - 30 && mouseX > width - 70 && mouseY < 70 && mouseY > 30) {
            this.getLobbies();
        }
    }

    joinLobby() {
        this.page = 0;
        socketHelper.joinLobby("matching", this.startGame);
    }

    startGame(socket) {
        socket.on("matching:startGame", (opponent) => {
            pageManager.push("matchingGamePage", { username: socketHelper.user.username, opponentname: opponent.username, room: opponent.id });
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
                const button = new TextButton(lobby.username, this.buttons.length % 2 ? 2 * width / 3 : width / 3, Math.floor(this.buttons.length / 2 + 2) * height / 10, 400, 50);
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
