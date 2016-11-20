const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const Enemy = require("../../src/game/enemy.js");

const expect = chai.expect;
chai.use(sinonChai);

describe("enemy test", () => {
  let enemy;
  let drawMock;

  beforeEach(() => {
    drawMock = {
      drawCircle: sinon.spy(),
      drawLine: sinon.spy()
    };
    enemy = new Enemy(drawMock);
  });
});
