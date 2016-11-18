const DrawTool = require('../tools/draw.js');


class Player {
  constructor(drawTool){
    this.drawTool = drawTool;

    this.rotation = 0;
    this.color = "yellow";
    this.width = 4;
  }

  draw(x, y, rotationMultiplier) {
    //make spinner longer when slower
    let length = 30 + (0.5 / rotationMultiplier);
    let points = this.getLinePoints(x, y, length, this.rotation, true);
    this.drawTool.drawLine(
      [points.center, points.start, points.end],
      this.color,
      this.width
    );
    this.setNewRotation(rotationMultiplier);
  }

  getLinePoints(centerX, centerY, length, angle, twoSided){
    const dX = Math.cos(angle) * length;
    const dY = Math.sin(angle) * length;
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
}

module.exports = Player;
