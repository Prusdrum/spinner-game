class Background {


  constructor(drawTool){
    this.drawTool = drawTool;
  }

  draw(){
    this.drawTool.fillCanvas();
  }
}


module.exports = Background;
