const Enemy = require("./enemy.js");

class EnemyFactory {
  constructor(drawTool, maxWidth, maxHeight) {
    this.drawTool = drawTool;
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
  }

  getEnemies(count){
    let enemies = [];

    for (let i = 0; i < count; i += 1){
      let velocity = {
        x: this.getInitialVelocity(),
        y: this.getInitialVelocity()
      };
      let speed = 3;

      let coords;
      if (i % 2 === 0){
        coords = this.getHorizontalStartPosition();
      } else {
        coords = this.getVerticalStartPosition();
      }
      let enemy = new Enemy(this.drawTool, velocity, speed, coords);

      enemies.push(enemy);
    }

    return enemies;
  }

  getInitialVelocity() {
    return Math.random() * 2 - 1;
  }

  getVerticalStartPosition(){
    let x = 0;
    let y = Math.random() * this.maxHeight;

    return {x, y};
  }

  getHorizontalStartPosition(){
    let x = Math.random() * this.maxWidth;
    let y = 0;

    return {x, y};
  }
}

module.exports  = EnemyFactory;
