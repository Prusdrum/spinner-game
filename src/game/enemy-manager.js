class EnemyManager {
  constructor(drawTool, enemyFactory, maxWidth, maxHeight){
    this.drawTool = drawTool;
    this.enemyFactory = enemyFactory;
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
    this.enemies = this.enemyFactory.getEnemies(30);
  }

  onCollision() {}

  draw(player) {
    for (let i = 0, l = this.enemies.length; i < l; i += 1){
      let enemy = this.enemies[i];
      enemy.draw();

      if (player.checkCollision(enemy)){
        this.onCollision();
        break;
      }

      if (
        enemy.x >= this.maxWidth ||
        enemy.x <= 0 ||
        enemy.y >= this.maxHeight ||
        enemy.y <= 0
      ) {
        enemy.resetPosition({
          x: this.enemyFactory.getInitialVelocity(),
          y: this.enemyFactory.getInitialVelocity()
        });
      }
    }
  }
}

module.exports = EnemyManager;
