const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const Player = require("../../src/game/player.js");

const expect = chai.expect;
chai.use(sinonChai);

describe("player test", () => {
  let drawMock;

  beforeEach(() => {
    drawMock = {
      drawCircle: sinon.spy(),
      drawLine: sinon.spy()
    };
  });

  describe("new player", () => {
    let player;

    beforeEach(() => {
      player = new Player(drawMock);
    })

    it("should have 0 rotation", () => {
      expect(player.rotation).to.be.equal(0);
    });
  });

  describe("getLinePoints", () => {
    let player;

    beforeEach(() => {
      player = new Player(drawMock);
    });

    it("should calculate line for onesided with no angle", () => {
      const center = { x: 0, y: 0 };
      const length = 5;
      const angle = 0;
      const twoSided = false;

      const line = player.getLinePoints(center.x, center.y, length, angle, twoSided);

      expect(line.start.x).to.be.equal(0);
      expect(line.start.y).to.be.equal(0);
      expect(line.center.x).to.be.equal(0);
      expect(line.center.y).to.be.equal(0);
      expect(line.end.x).to.be.equal(5);
      expect(line.end.y).to.be.equal(0);

    });

    it("should calculate line for onesided with 90deg angle", () => {
      const center = { x: 0, y: 0 };
      const length = 5;
      const angle = 90;
      const twoSided = false;

      const line = player.getLinePoints(center.x, center.y, length, angle, twoSided);

      expect(line.start.x).to.be.equal(0);
      expect(line.start.y).to.be.equal(0);
      expect(line.center.x).to.be.equal(0);
      expect(line.center.y).to.be.equal(0);
      expect(line.end.x).to.be.equal(0);
      expect(line.end.y).to.be.equal(5);
    });

    it("should calculate line for twosided with 90deg angle", () => {
      const center = { x: 0, y: 0 };
      const length = 5;
      const angle = 90;
      const twoSided = true;

      const line = player.getLinePoints(center.x, center.y, length, angle, twoSided);

      expect(line.start.x).to.be.equal(0);
      expect(line.start.y).to.be.equal(-5);
      expect(line.center.x).to.be.equal(0);
      expect(line.center.y).to.be.equal(0);
      expect(line.end.x).to.be.equal(0);
      expect(line.end.y).to.be.equal(5);
    });
  });

  describe("getLength", () => {
    const speed = {
      slow: 1,
      normal: 2,
      fast: 3
    };
    let player;

    beforeEach(() => {
      player = new Player(drawMock);
    });

    it("should be longer when slower", () => {
      let len = player.getLength(30, speed.slow);

      expect(len).to.be.equal(45);
    });

    it("should be as big as base for normal", () => {
      let len = player.getLength(30, speed.normal);

      expect(len).to.be.equal(30);
    });

    it("should be shorter when fast", () => {
      let len = player.getLength(30, speed.fast);

      expect(len).to.be.equal(25);
    });
  });

  describe("draw", () => {
    let player;

    beforeEach(() => {
      player = new Player(drawMock);
    });

    it("should call drawLine", () => {
      player.draw(0, 0, 2);
      expect(drawMock.drawLine).to.have.been.calledOnce;
    });
  });
});
