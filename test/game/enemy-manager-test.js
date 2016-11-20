const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const EnemyManager = require("../../src/game/enemy-manager.js");

const expect = chai.expect;
chai.use(sinonChai);

describe("enemy manager test", () => {
  let enemyManager;
  let drawMock;

  beforeEach(() => {
    drawMock = {
      drawCircle: sinon.spy(),
      drawLine: sinon.spy()
    };
    const canvas = { width: 500, height: 200 };

    enemyManager = new EnemyManager(drawMock, canvas);
  });
});
