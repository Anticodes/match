class ToastManager {

    constructor() {
        this.toasts = [];
    }

    onUpdate() {
        const deleteIndexes = [];
        for (const [index, toast] of this.toasts.entries()) {
            if (toast.time) {
                const x = millis() - toast.start;
                image(toast.graphic, width / 2, height / 2 + max((sq(x) - (x - 250) * toast.time) / (250 * toast.time), 0) * height / 16, width, height);
                if (millis() - toast.start > toast.time) {
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
        const graphic = createGraphics(width, height);
        graphic.textSize(textsSize / 2);
        graphic.noStroke();
        graphic.rectMode(CENTER);
        graphic.textAlign(CENTER, CENTER);
        graphic.fill(0, 48);
        graphic.rect(width / 2, height - height / 16, string.length * 16, 32);
        graphic.fill(255);
        graphic.text(string, width / 2, height - height / 16);
        this.toasts.push({ graphic, time, start: millis() });
    }

    dialog(header, description, defaultAction, secondaryAction) {
        const graphic = createGraphics(width, height);
        this.overlay(graphic);
        
    }

    loading(cancelAction) {
        const graphic = createGraphics(width, height);
        this.overlay(graphic);

    }

    overlay(graphic) {
        graphic.background(0, 48);
    }
}