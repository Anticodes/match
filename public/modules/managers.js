class PageManager {

    constructor() {
        this.pageTree = [];
        this.pages = {
            mainPage: new MainPage(),
            loginPage: new LoginPage(),
            gameSelectorPage: new GameSelector(),
            matchingLobbyPage: new MatchingLobby(),
            matchingGamePage: new MatchingGame()
        }
        this.push("mainPage");
    }

    push(page, args) {
        this.pageTree = this.pageTree.filter(e => e != this.pages[page]);
        this.pageTree.push(this.pages[page]);
        this.pageTree[this.pageTree.length - 1].onCreate(args);
    }

    pop() {
        if (this.pageTree.length > 1)
            this.pageTree.pop();
        else
            console.log("nereye kocum");
    }

    getCurrentPage() {
        return this.pageTree[this.pageTree.length - 1];
    }

    onUpdate() {
        this.pageTree[this.pageTree.length - 1].onUpdate();
        if (this.pageTree.length > 1) {
            text("⬅️", 50, 50);
        }
    }

    onMousePress() {
        this.pageTree[this.pageTree.length - 1].onMousePress();
    }

    onMouseDrag() {
        this.pageTree[this.pageTree.length - 1].onMouseDrag();
    }

    onMouseRelease() {
        this.pageTree[this.pageTree.length - 1].onMouseRelease();
        if (this.pageTree.length > 1) {
            if (mouseX < 70 && mouseX > 30 && mouseY < 70 && mouseY > 30) {
                this.pageTree.pop();
            }
        }
    }

    onKeyPress() {
        this.pageTree[this.pageTree.length - 1].onKeyPress();
    }

    onKeyRelease() {
        this.pageTree[this.pageTree.length - 1].onKeyRelease();
    }
}