export default class Application {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('webgl2');
    this.locators = new Map();
  }
}