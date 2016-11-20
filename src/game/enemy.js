class Enemy {
  constructor(drawTool, velocity, speed, initCoords){
    this.initX = initCoords.x;
    this.initY = initCoords.y;
    this.drawTool = drawTool;
    this.velocity = velocity;
    this.speed = speed;
    this.x = initCoords.x;
    this.y = initCoords.y;
  }

  draw() {
    this.drawTool.drawCircle(this.x, this.y, 3, "red");

    this.x += this.velocity.x * this.speed;
    this.y += this.velocity.y * this.speed;
  }

  resetPosition(){
    this.x = this.initX;
    this.y = this.initY;
  }
}

module.exports = Enemy;
