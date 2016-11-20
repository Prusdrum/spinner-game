class DrawTool {
  constructor(ctx){
    this.ctx = ctx;
    this.canvas = this.ctx.canvas;
  }

  drawCircle(x, y, r, color = "red"){
    let ctx = this.ctx;
    const TAU = 2 * Math.PI;
    const arcStart = 0;
    const arcEnd = TAU;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, r, arcStart, arcEnd, false);
    ctx.fill();
  }

  drawLine(points, color = "red", width = 5) {
    let ctx = this.ctx;
    ctx.beginPath();
    points.forEach((p, i) => {
      if (i === 0){
        ctx.moveTo(p.x, p.y)
      } else {
        ctx.lineTo(p.x, p.y);
      }
    });
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.stroke();
  }

  fillCanvas(color = "blue"){
    const width = this.canvas.width;
    const height = this.canvas.height;

    this.ctx.beginPath();
    this.ctx.rect(0, 0, width, height);
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }

  drawScore(score){
    let ctx = this.ctx;

    ctx.font = "30px Verdana";
    ctx.fillStyle = "yellow";
    ctx.fillText(`Score: ${score.toString()}`, 50, 50);
  }
}

module.exports = DrawTool;
