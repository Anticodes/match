import sketch from "../../index.js";
import { Page } from "../pages.js";
import { TextButton } from "../input.js";
import { textsSize, backColor, textColor, headerTextSize } from "../constants.js";
import { networkManager } from "../managers/network.js";
import { pageManager } from "../managers/page.js";

class MatchingLobby extends Page {

    onCreate() {
        sketch.rectMode(sketch.CENTER);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.imageMode(sketch.CENTER);
        sketch.noStroke();
        this.loading = true;
        this.buttons = [];
        this.joinLobby();
        this.getLobbies();
    }

    onUpdate() {
        sketch.background(backColor);
        sketch.textSize(headerTextSize * sketch.getScale);
        sketch.fill(textColor);
        sketch.text("Matching Lobby", sketch.width / 2, sketch.height / 10);
        sketch.textSize(textsSize * sketch.getScale);
        sketch.text("🔃", sketch.width - 50 * sketch.getScale, 50 * sketch.getScale);
        if (this.loading) {
            sketch.text("Loading", sketch.width / 2, sketch.height / 2 + 100 * sketch.getScale);
            sketch.textSize(headerTextSize * sketch.getScale);
            sketch.push();
            sketch.translate(sketch.width / 2, sketch.height / 2);
            sketch.rotate(sketch.frameCount / 10);
            sketch.text("↻", -2 * sketch.getScale, 11 * sketch.getScale);
            sketch.pop();
            return;
        }
        for (const button of this.buttons) {
            button.onUpdate();
        }
    }

    onWindowResized() {
        for (const [index, button] of this.buttons.entries()) {
            button.pos.set(index % 2 ? 2 * sketch.width / 3 : sketch.width / 3, Math.floor(index / 2 + 2) * sketch.height / 10);
            button.size.set(400 * sketch.getScale, 50 * sketch.getScale);
        }
    }

    onMousePress() {
        for (const button of this.buttons) {
            button.onMousePress();
        }
        if (sketch.mouseX < sketch.width - 30 * sketch.getScale && sketch.mouseX > sketch.width - 70 * sketch.getScale && sketch.mouseY < 70 * sketch.getScale && sketch.mouseY > 30 * sketch.getScale) {
            this.getLobbies();
        }
    }

    joinLobby() {
        this.page = 0;
        networkManager.joinLobby("matching", this.startGame);
    }

    startGame(socket) {
        socket.on("matching:startGame", (opponent) => {
            pageManager.push("matching/matchingGamePage", { username: networkManager.user.username, opponentname: opponent.username });
        });
        socket.on("matching:alreadyPlaying", () => {
            this.getLobbies();
        });
    }

    getLobbies() {
        this.loading = true;
        networkManager.getLobby("matching", 0 + this.page * 16, 16 + this.page * 16, (lobbies) => {
            this.loading = false;
            this.buttons = [];
            for (const lobby of lobbies) {
                const button = new TextButton(lobby.username, this.buttons.length % 2 ? 2 * sketch.width / 3 : sketch.width / 3, Math.floor(this.buttons.length / 2 + 2) * sketch.height / 10, 400 * sketch.getScale, 50 * sketch.getScale);
                button.setOnClickListener((focus) => this.lobbyButtonListener(focus, lobby));
                this.buttons.push(button);
            }
        });
    }

    lobbyButtonListener(focus, lobby) {
        if (focus) {
            networkManager.joinRoom("matching", lobby);
        }
    }
}

export const matchingLobbyPage = new MatchingLobby();