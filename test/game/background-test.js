const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const Background = require("../../src/game/background.js");

const expect = chai.expect;
chai.use(sinonChai);

describe("background test", () => {
  let drawMock;

  beforeEach(() => {
    drawMock = {
      fillCanvas: sinon.spy()
    };
  });

  describe("draw", () => {
    let bg;

    beforeEach(() => {
      bg = new Background(drawMock);
    })

    it("should call fill Canvas", () => {
      bg.draw();

      expect(drawMock.fillCanvas).to.have.been.called;
    });
  })
});
