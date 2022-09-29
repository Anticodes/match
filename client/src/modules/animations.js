import sketch from "../index.js";

class Animation{

}

class WaitAnimation extends Animation {
    constructor(length, during, finish){
        this.start = sketch.millis();
    }
}