const Background = require("./game/background.js");
const Player = require("./game/player.js");
const EnemyFactory = require("./game/enemy-factory.js");
const EnemyManager = require("./game/enemy-manager.js");
const DrawTool = require("./tools/draw.js");
const speed = require("./tools/speed.js");
const keys = require("./tools/keys.js");

class Game {
  constructor (ctx) {
    this.ctx = ctx;
    this.cursor = {
      x: this.ctx.canvas.width / 2,
      y: this.ctx.canvas.height / 2
    };
    this.alive = true;
    this.canvas = this.ctx.canvas;
    this.drawTool = new DrawTool(this.ctx);
    this.rotationMult = speed.normal;
    this.score = 0;
    this.now = Date.now();
    this.scoreDelta = 500;

    this.canvas.addEventListener("mousemove", (e) => {
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
    const width = this.canvas.width;
    const height = this.canvas.height;
    this.background = new Background(this.drawTool);
    this.player = new Player(this.drawTool);
    this.enemyFactory = new EnemyFactory(this.drawTool, width, height);
    this.enemyManager = new EnemyManager(
      this.drawTool,
      this.enemyFactory,
      width, height
      );
    this.enemyManager.onCollision = () => {
      console.log('you lost');
      this.alive = false;
    }
    this.mainLoop();
  }

  mainLoop(){
    let newNow = Date.now();
    this.background.draw();
    this.player.draw(this.cursor.x, this.cursor.y, this.rotationMult);
    this.enemyManager.draw(this.player);

    let delta = newNow - this.now;

    if (delta >= this.scoreDelta){
      this.score += 10;
      this.now = newNow;
    }

    this.drawTool.drawScore(this.score);

    if (this.alive){
      requestAnimationFrame(this.mainLoop.bind(this));
    }
  }
}

module.exports = Game;
