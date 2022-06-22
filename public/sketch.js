const textColor = 230;
const backColor = 32;
const textsSize = 48;
const headerTextSize = 128;

var pageManager;
var socketHelper;

function setup() {
  let canvas = createCanvas(1883, 900);
  canvas.parent("canvas-container")
  socketHelper = new NetworkHelper();
  pageManager = new PageManager();
}

function draw() {
  pageManager.onUpdate();
}

function mousePressed() {
  pageManager.onMousePress();
}

function mouseDragged() {
  pageManager.onMouseDrag();
}

function mouseReleased() {
  pageManager.onMouseRelease();
}

function keyPressed() {
  pageManager.onKeyPress();
}

function keyReleased() {
  pageManager.onKeyRelease();
}

