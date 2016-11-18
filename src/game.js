const Background = require("./game/background.js");
const Player = require("./game/player.js");
const DrawTool = require("./tools/draw.js");
const speed = require("./tools/speed.js");
const keys = require("./tools/keys.js");

class Game {
  constructor (ctx) {
    this.ctx = ctx;
    this.cursor = {
      x: 0,
      y: 0
    }
    this.drawTool = new DrawTool(this.ctx);
    this.rotationMult = speed.normal;

    this.ctx.canvas.addEventListener("mousemove", (e) => {
      const canvasRect = e.target.getBoundingClientRect();
      this.cursor.x = e.clientX - canvasRect.left;
      this.cursor.y = e.clientY - canvasRect.top;
    });

    document.addEventListener("keydown", (e) => {
      switch (e.keyCode){
        case keys.speedUp:
          this.rotationMult = speed.fast;
          break;
        case keys.speedDown:
          this.rotationMult = speed.slow;
          break;
      }
    });

    document.addEventListener("keyup", (e) => {
      this.rotationMult = speed.normal;
    });
  }

  start() {
    this.background = new Background(this.drawTool);
    this.player = new Player(this.drawTool);
    this.mainLoop();
  }

  mainLoop(){
    this.background.draw();
    this.player.draw(this.cursor.x, this.cursor.y, this.rotationMult);
    requestAnimationFrame(this.mainLoop.bind(this));
  }
}

module.exports = Game;
