class EnemyManager {
  constructor(drawTool, enemies, maxWidth, maxHeight){
    this.drawTool = drawTool;
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
    this.enemies = enemies;
  }

  draw(player) {
    this.enemies.forEach((enemy) => {
      enemy.draw();

      if (
        enemy.x >= this.maxWidth ||
        enemy.x <= 0 ||
        enemy.y >= this.maxHeight ||
        enemy.y <= 0
      ) {
        enemy.resetPosition();
      }
    })
  }
}

module.exports = EnemyManager;
