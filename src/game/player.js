class Player {
  constructor(drawTool){
    this.drawTool = drawTool;

    this.rotation = 0;
    this.color = "yellow";
    this.width = 4;
    this.baseLength = 30;
    this.now = Date.now();
  }

  draw(x, y, rotationMultiplier) {
    //make spinner longer when slower
    const length = this.getLength(this.baseLength, rotationMultiplier);
    this.line = this.getLinePoints(x, y, length, this.rotation, true);
    const points = this.line;
    this.drawTool.drawLine(
      [points.center, points.start, points.end],
      this.color,
      this.width
    );
    this.setNewRotation(rotationMultiplier);

    let newNow = Date.now();
    let delta = newNow - this.now;

    if (delta >= 2000) {
      this.now = newNow;
      this.increaseLength();
    }
  }

  getLength(baseLength, rotationMultiplier){
    return (0.5 * baseLength) + (baseLength / rotationMultiplier);
  }

  getLinePoints(centerX, centerY, length, angle, twoSided){
    //remember that in HTML canvas Y-axis is inverted
    const radians = (Math.PI / 180) * angle;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians)
    const dX = Math.round(cos * length);
    const dY = Math.round(sin * length);
    let start = {};
    let end = {};
    let center = { x: centerX, y : centerY };

    if (!twoSided){
      start.x = centerX;
      start.y = centerY;
      end.x = centerX + dX;
      end.y = centerY + dY;
    } else {
      start.x = centerX - dX;
      start.y = centerY - dY;
      end.x = centerX + dX;
      end.y = centerY + dY;
    }

    return { start, end, center };
  }

  setNewRotation(rotationMultiplier){
    this.rotation = this.rotation + 1 > 359 ? 0 : this.rotation + rotationMultiplier;
  }

  lineIntersect(x1,y1,x2,y2, x3,y3,x4,y4) {
      var x=((x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
      var y=((x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
      if (isNaN(x)||isNaN(y)) {
          return false;
      } else {
          if (x1>=x2) {
              if (!(x2<=x&&x<=x1)) {return false;}
          } else {
              if (!(x1<=x&&x<=x2)) {return false;}
          }
          if (y1>=y2) {
              if (!(y2<=y&&y<=y1)) {return false;}
          } else {
              if (!(y1<=y&&y<=y2)) {return false;}
          }
          if (x3>=x4) {
              if (!(x4<=x&&x<=x3)) {return false;}
          } else {
              if (!(x3<=x&&x<=x4)) {return false;}
          }
          if (y3>=y4) {
              if (!(y4<=y&&y<=y3)) {return false;}
          } else {
              if (!(y3<=y&&y<=y4)) {return false;}
          }
      }
      return true;
  }

  checkCollision(enemy){
    return this.lineIntersect(
      this.line.start.x,
      this.line.start.y,
      this.line.end.x,
      this.line.end.y,
      enemy.x,
      enemy.y,
      enemy.x + enemy.velocity.x * enemy.speed,
      enemy.y + enemy.velocity.y * enemy.speed
    )
  }

  increaseLength(){
    this.baseLength += 1;
  }

  resetLength() {
    this.baseLength = 30;
  }
}

module.exports = Player;
