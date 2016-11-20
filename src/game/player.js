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
    const length = this.getLength(30, rotationMultiplier);
    let points = this.getLinePoints(x, y, length, this.rotation, true);
    this.drawTool.drawLine(
      [points.center, points.start, points.end],
      this.color,
      this.width
    );
    this.setNewRotation(rotationMultiplier);
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
}

module.exports = Player;
