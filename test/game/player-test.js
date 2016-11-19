const expect = require("chai").expect;
const Player = require("../../src/game/player.js");

const drawMock = {
  drawCircle: () => {},
  drawLine: () => {}
}

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
    const center = { x: 0, y: 0};
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
    const center = { x: 0, y: 0};
    const length = 5;
    const angle = 60;
    const twoSided = false;

    const line = player.getLinePoints(center.x, center.y, length, angle, twoSided);

    expect(line.start.x).to.be.equal(0);
    expect(line.start.y).to.be.equal(0);
    expect(line.center.x).to.be.equal(0);
    expect(line.center.y).to.be.equal(0);
    expect(line.end.x).to.be.equal(0);
    expect(line.end.y).to.be.equal(-5);

  });
});
