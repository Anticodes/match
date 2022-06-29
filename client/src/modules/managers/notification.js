import sketch from "../../index.js";
import { textsSize } from "../constants.js";

class ToastManager {

    constructor() {
        this.toasts = [];
    }

    onUpdate() {
        const deleteIndexes = [];
        for (const [index, toast] of this.toasts.entries()) {
            if (toast.time) {
                const x = sketch.millis() - toast.start;
                sketch.image(toast.graphic, sketch.width / 2, sketch.height / 2 + sketch.max((sketch.sq(x) - (x - 250) * toast.time) / (250 * toast.time), 0) * sketch.height / 16, sketch.width, sketch.height);
                if (sketch.millis() - toast.start > toast.time) {
                    deleteIndexes.push(index);
                }
            }
        }
        for (const index of deleteIndexes) {
            this.toasts.splice(index, 1);
        }
    }

    onMousePress() { }
    onMouseDrag() { }
    onMouseRelease() { }
    onKeyPress() { }
    onKeyRelease() { }

    text(string, time = 5000) {
        const graphic = sketch.createGraphics(sketch.width, sketch.height);
        graphic.textSize(textsSize / 2);
        graphic.noStroke();
        graphic.rectMode(sketch.CENTER);
        graphic.textAlign(sketch.CENTER, sketch.CENTER);
        graphic.fill(0, 48);
        graphic.rect(sketch.width / 2, sketch.height - sketch.height / 16, string.length * 16, 32);
        graphic.fill(255);
        graphic.text(string, sketch.width / 2, sketch.height - sketch.height / 16);
        this.toasts.push({ graphic, time, start: sketch.millis() });
    }

    dialog(header, description, defaultAction, secondaryAction) {
        const graphic = sketch.createGraphics(sketch.width, sketch.height);
        this.overlay(graphic);
        console.log(header, description, defaultAction, secondaryAction);
    }

    loading(cancelAction) {
        const graphic = sketch.createGraphics(sketch.width, sketch.height);
        this.overlay(graphic);
        console.log(cancelAction);
    }

    overlay(graphic) {
        graphic.background(0, 48);
    }
}

export const toastManager = new ToastManager();