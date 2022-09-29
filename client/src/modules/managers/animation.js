import sketch from "../../index.js";

class AnimationManager {

    constructor() {
        this.animations = [];
    }

    onUpdate() {
        if (this.animations) {
            for (const animation of this.animations) {
                if (sketch.millis() - animation.start > animation.length) {
                    animation.finish();
                    animation.finished = true;
                } else {
                    animation.running(sketch.millis() - animation.start);
                }
            }
            this.animations = this.animations.filter(e => !e.finished);
        }
    }

    onMousePress() {
        return !this.animations.some(e => e.lockedMouse);
    }
    onMouseDrag() {
        return !this.animations.some(e => e.lockedMouse);
    }
    onMouseRelease() {
        return !this.animations.some(e => e.lockedMouse);
    }
    onKeyPress() {
        return !this.animations.some(e => e.lockedKeyboard);
    }
    onKeyRelease() {
        return !this.animations.some(e => e.lockedKeyboard);
    }
}

export const animationManager = new AnimationManager();