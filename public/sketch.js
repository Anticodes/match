const textColor = 230;
const backColor = 32;
const textsSize = 48;
const headerTextSize = 96;
const defaultWidth = 1883;
const defaultHeight = 900;
const aspectRatio = defaultWidth / defaultHeight;

let getScale;

var pageManager;
var socketHelper;

function setup() {
  let height, width;
  if (windowWidth / windowHeight < aspectRatio) {
    width = windowWidth;
    height = windowWidth / aspectRatio;
  } else {
    height = windowHeight;
    width = windowHeight * aspectRatio;
  }
  getScale = height / defaultHeight;
  let canvas = createCanvas(width, height);
  canvas.parent("canvas-container")
  socketHelper = new NetworkHelper();
  pageManager = new PageManager();
}

function windowResized() {
  let height, width;
  if (windowWidth / windowHeight < aspectRatio) {
    width = windowWidth;
    height = windowWidth / aspectRatio;
  } else {
    height = windowHeight;
    width = windowHeight * aspectRatio;
  }
  getScale = height / defaultHeight;
  resizeCanvas(width, height);
  pageManager.onWindowResized();
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