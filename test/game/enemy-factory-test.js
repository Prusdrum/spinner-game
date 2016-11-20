const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const EnemyFactory = require("../../src/game/enemy-factory.js");

const expect = chai.expect;
chai.use(sinonChai);

describe("enemy factory test", () => {
  let enemyFactory;
  let drawMock;

  beforeEach(() => {
    drawMock = {
      drawCircle: sinon.spy(),
      drawLine: sinon.spy()
    };
    enemyFactory = new EnemyFactory(drawMock, 500, 200);
  });

  describe("getInitialVelocity", () => {

    it("should return value between -1, 1", () => {
      for (let i = 0; i < 500; i++){
        let velocity = enemyFactory.getInitialVelocity();
        expect(velocity).to.be.within(-1, 1);
      }
    });
  });

  describe("getHorizontalStartPosition", () => {
    it("should have value between 0 and maxWidth", () => {
      for (let i = 0; i < 500; i++){
        let pos = enemyFactory.getHorizontalStartPosition();
        expect(pos.x).to.be.within(0, 500);
        expect(pos.y).to.be.equal(0);
      }
    });
  });

  describe("getVerticalStartPosition", () => {
    it("should have value between 0 and maxHeight", () => {
      for (let i = 0; i < 500; i++){
        let pos = enemyFactory.getVerticalStartPosition();
        expect(pos.x).to.be.equal(0);
        expect(pos.y).to.be.within(0, 200);
      }
    });
  });
});
