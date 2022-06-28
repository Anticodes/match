import p5 from "p5";
import { pageManager } from "./modules/managers/page.js";
import { toastManager } from "./modules/managers/notification.js";
import { aspectRatio, defaultHeight } from "./modules/constants.js";

const sketch = new p5((sketch) => {
    sketch.setup = () => {
        let height, width;
        if (sketch.windowWidth / sketch.windowHeight < aspectRatio) {
            width = sketch.windowWidth;
            height = sketch.windowWidth / aspectRatio;
        } else {
            height = sketch.windowHeight;
            width = sketch.windowHeight * aspectRatio;
        }
        sketch.getScale = height / defaultHeight;
        let canvas = sketch.createCanvas(width, height);
        canvas.parent("canvas-container");
    };

    sketch.windowResized = () => {
        let height, width;
        if (sketch.windowWidth / sketch.windowHeight < aspectRatio) {
            width = sketch.windowWidth;
            height = sketch.windowWidth / aspectRatio;
        } else {
            height = sketch.windowHeight;
            width = sketch.windowHeight * aspectRatio;
        }
        sketch.getScale = height / defaultHeight;
        sketch.resizeCanvas(width, height);
        pageManager.onWindowResized();
    };

    sketch.draw = () => {
        pageManager.onUpdate();
        toastManager.onUpdate();
    };

    sketch.mousePressed = () => {
        pageManager.onMousePress();
        toastManager.onMousePress();
    };

    sketch.mouseDragged = () => {
        pageManager.onMouseDrag();
        toastManager.onMouseDrag();
    };

    sketch.mouseReleased = () => {
        pageManager.onMouseRelease();
        toastManager.onMouseRelease();
    };

    sketch.keyPressed = () => {
        pageManager.onKeyPress();
        toastManager.onKeyPress();
    };

    sketch.keyReleased = () => {
        pageManager.onKeyRelease();
        toastManager.onKeyRelease();
    };
}, "p5-container");

export default sketch;