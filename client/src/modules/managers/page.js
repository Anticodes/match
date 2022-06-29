import sketch from "../../index.js";
import { MainPage, LoginPage, GameSelector } from "../pages.js";

class PageManager {

    onCreate() {
        this.pageTree = [];
        this.pages = {
            mainPage: new MainPage(),
            loginPage: new LoginPage(),
            gameSelectorPage: new GameSelector()
        };
        this.push("mainPage");
    }

    async push(page, args) {
        if (!this.pages[page]) {
            const category = page.split("/")[0];
            const pages = Object.entries(await import(`../${category}/pages.js`));
            for (const [key, value] of pages) {
                this.pages[`${category}/${key}`] = value;
            }
        }
        this.pageTree = this.pageTree.filter(e => e != this.pages[page]);
        this.pageTree.push(this.pages[page]);
        this.pageTree[this.pageTree.length - 1].onCreate(args);
    }

    pop() {
        if (this.pageTree.length > 1) {
            this.pageTree.pop();
            this.onWindowResized();
        } else console.log("nereye kocum");
    }

    getCurrentPage() {
        return this.pageTree[this.pageTree.length - 1];
    }

    onUpdate() {
        this.pageTree[this.pageTree.length - 1].onUpdate();
        if (this.pageTree.length > 1) {
            sketch.text("⬅️", 50 * sketch.getScale, 50 * sketch.getScale);
        }
    }

    onWindowResized() {
        this.pageTree[this.pageTree.length - 1].onWindowResized();
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
            if (sketch.mouseX < 70 * sketch.getScale && sketch.mouseX > 30 * sketch.getScale && sketch.mouseY < 70 * sketch.getScale && sketch.mouseY > 30 * sketch.getScale) {
                this.pop();
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

export const pageManager = new PageManager();