"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);throw new Error("Cannot find module '" + o + "'");
      }var f = n[o] = { exports: {} };t[o][0].call(f.exports, function (e) {
        var n = t[o][1][e];return s(n ? n : e);
      }, f, f.exports, e, t, n, r);
    }return n[o].exports;
  }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
    s(r[o]);
  }return s;
})({ 1: [function (require, module, exports) {
    var Game = require("./game.js");

    var canvas = document.getElementById("spinerCanvas");
    var ctx = canvas.getContext("2d");

    var game = new Game(ctx);

    game.start();
  }, { "./game.js": 2 }], 2: [function (require, module, exports) {
    var Background = require("./game/background.js");
    var Player = require("./game/player.js");
    var EnemyFactory = require("./game/enemy-factory.js");
    var EnemyManager = require("./game/enemy-manager.js");
    var DrawTool = require("./tools/draw.js");
    var speed = require("./tools/speed.js");
    var keys = require("./tools/keys.js");

    var Game = function () {
      function Game(ctx) {
        var _this = this;

        _classCallCheck(this, Game);

        this.ctx = ctx;
        this.cursor = {
          x: this.ctx.canvas.width / 2,
          y: this.ctx.canvas.height / 2
        };
        this.alive = true;
        this.canvas = this.ctx.canvas;
        this.drawTool = new DrawTool(this.ctx);
        this.rotationMult = speed.normal;
        this.score = 0;
        this.now = Date.now();
        this.scoreDelta = 500;

        this.canvas.addEventListener("mousemove", function (e) {
          var canvasRect = e.target.getBoundingClientRect();
          _this.cursor.x = e.clientX - canvasRect.left;
          _this.cursor.y = e.clientY - canvasRect.top;
        });

        document.addEventListener("keydown", function (e) {
          switch (e.keyCode) {
            case keys.speedUp:
              _this.rotationMult = speed.fast;
              break;
            case keys.speedDown:
              _this.rotationMult = speed.slow;
              break;
          }
        });

        document.addEventListener("keyup", function (e) {
          _this.rotationMult = speed.normal;
        });
      }

      _createClass(Game, [{
        key: "start",
        value: function start() {
          var _this2 = this;

          var width = this.canvas.width;
          var height = this.canvas.height;
          this.background = new Background(this.drawTool);
          this.player = new Player(this.drawTool);
          this.enemyFactory = new EnemyFactory(this.drawTool, width, height);
          this.enemyManager = new EnemyManager(this.drawTool, this.enemyFactory, width, height);
          this.enemyManager.onCollision = function () {
            console.log('you lost');
            _this2.alive = false;
          };
          this.mainLoop();
        }
      }, {
        key: "mainLoop",
        value: function mainLoop() {
          var newNow = Date.now();
          this.background.draw();
          this.player.draw(this.cursor.x, this.cursor.y, this.rotationMult);
          this.enemyManager.draw(this.player);

          var delta = newNow - this.now;

          if (delta >= this.scoreDelta) {
            this.score += 10;
            this.now = newNow;
          }

          this.drawTool.drawScore(this.score);

          if (this.alive) {
            requestAnimationFrame(this.mainLoop.bind(this));
          }
        }
      }]);

      return Game;
    }();

    module.exports = Game;
  }, { "./game/background.js": 3, "./game/enemy-factory.js": 4, "./game/enemy-manager.js": 5, "./game/player.js": 7, "./tools/draw.js": 8, "./tools/keys.js": 9, "./tools/speed.js": 10 }], 3: [function (require, module, exports) {
    var Background = function () {
      function Background(drawTool) {
        _classCallCheck(this, Background);

        this.drawTool = drawTool;
      }

      _createClass(Background, [{
        key: "draw",
        value: function draw() {
          this.drawTool.fillCanvas();
        }
      }]);

      return Background;
    }();

    module.exports = Background;
  }, {}], 4: [function (require, module, exports) {
    var Enemy = require("./enemy.js");

    var EnemyFactory = function () {
      function EnemyFactory(drawTool, maxWidth, maxHeight) {
        _classCallCheck(this, EnemyFactory);

        this.drawTool = drawTool;
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
      }

      _createClass(EnemyFactory, [{
        key: "getEnemies",
        value: function getEnemies(count) {
          var enemies = [];

          for (var i = 0; i < count; i += 1) {
            var velocity = {
              x: this.getInitialVelocity(),
              y: this.getInitialVelocity()
            };
            var speed = 3;

            var coords = void 0;
            if (i % 2 === 0) {
              coords = this.getHorizontalStartPosition();
            } else {
              coords = this.getVerticalStartPosition();
            }
            var enemy = new Enemy(this.drawTool, velocity, speed, coords);

            enemies.push(enemy);
          }

          return enemies;
        }
      }, {
        key: "getInitialVelocity",
        value: function getInitialVelocity() {
          var rand = Math.random() * 2 - 1;
          return rand;
        }
      }, {
        key: "getVerticalStartPosition",
        value: function getVerticalStartPosition() {
          var x = 0;
          var y = Math.random() * this.maxHeight;

          return { x: x, y: y };
        }
      }, {
        key: "getHorizontalStartPosition",
        value: function getHorizontalStartPosition() {
          var x = Math.random() * this.maxWidth;
          var y = 0;

          return { x: x, y: y };
        }
      }]);

      return EnemyFactory;
    }();

    module.exports = EnemyFactory;
  }, { "./enemy.js": 6 }], 5: [function (require, module, exports) {
    var EnemyManager = function () {
      function EnemyManager(drawTool, enemyFactory, maxWidth, maxHeight) {
        _classCallCheck(this, EnemyManager);

        this.drawTool = drawTool;
        this.enemyFactory = enemyFactory;
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.enemies = this.enemyFactory.getEnemies(30);
      }

      _createClass(EnemyManager, [{
        key: "onCollision",
        value: function onCollision() {}
      }, {
        key: "draw",
        value: function draw(player) {
          for (var i = 0, l = this.enemies.length; i < l; i += 1) {
            var enemy = this.enemies[i];
            enemy.draw();

            if (player.checkCollision(enemy)) {
              this.onCollision();
              break;
            }

            if (enemy.x >= this.maxWidth || enemy.x <= 0 || enemy.y >= this.maxHeight || enemy.y <= 0) {
              enemy.resetPosition({
                x: this.enemyFactory.getInitialVelocity(),
                y: this.enemyFactory.getInitialVelocity()
              });
            }
          }
        }
      }]);

      return EnemyManager;
    }();

    module.exports = EnemyManager;
  }, {}], 6: [function (require, module, exports) {
    var Enemy = function () {
      function Enemy(drawTool, velocity, speed, initCoords) {
        _classCallCheck(this, Enemy);

        this.initX = initCoords.x;
        this.initY = initCoords.y;
        this.drawTool = drawTool;
        this.velocity = velocity;
        this.speed = speed;
        this.x = initCoords.x;
        this.y = initCoords.y;
      }

      _createClass(Enemy, [{
        key: "draw",
        value: function draw() {
          this.drawTool.drawCircle(this.x, this.y, 3, "red");

          this.x += this.velocity.x * this.speed;
          this.y += this.velocity.y * this.speed;
        }
      }, {
        key: "resetPosition",
        value: function resetPosition(newVelocity) {
          this.x = this.initX;
          this.y = this.initY;
          this.velocity = newVelocity;
        }
      }]);

      return Enemy;
    }();

    module.exports = Enemy;
  }, {}], 7: [function (require, module, exports) {
    var Player = function () {
      function Player(drawTool) {
        _classCallCheck(this, Player);

        this.drawTool = drawTool;

        this.rotation = 0;
        this.color = "yellow";
        this.width = 4;
        this.baseLength = 30;
        this.now = Date.now();
      }

      _createClass(Player, [{
        key: "draw",
        value: function draw(x, y, rotationMultiplier) {
          //make spinner longer when slower

          var length = this.getLength(this.baseLength, rotationMultiplier);
          this.line = this.getLinePoints(x, y, length, this.rotation, true);
          var points = this.line;
          this.drawTool.drawLine([points.center, points.start, points.end], this.color, this.width);
          this.setNewRotation(rotationMultiplier);

          var newNow = Date.now();
          var delta = newNow - this.now;

          if (delta >= 2000) {
            this.now = newNow;
            this.increaseLength();
          }
        }
      }, {
        key: "getLength",
        value: function getLength(baseLength, rotationMultiplier) {
          return 0.5 * baseLength + baseLength / rotationMultiplier;
        }
      }, {
        key: "getLinePoints",
        value: function getLinePoints(centerX, centerY, length, angle, twoSided) {
          //remember that in HTML canvas Y-axis is inverted
          var radians = Math.PI / 180 * angle;
          var cos = Math.cos(radians);
          var sin = Math.sin(radians);
          var dX = Math.round(cos * length);
          var dY = Math.round(sin * length);
          var start = {};
          var end = {};
          var center = { x: centerX, y: centerY };

          if (!twoSided) {
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

          return { start: start, end: end, center: center };
        }
      }, {
        key: "setNewRotation",
        value: function setNewRotation(rotationMultiplier) {
          this.rotation = this.rotation + 1 > 359 ? 0 : this.rotation + rotationMultiplier;
        }
      }, {
        key: "lineIntersect",
        value: function lineIntersect(x1, y1, x2, y2, x3, y3, x4, y4) {
          var x = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
          var y = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
          if (isNaN(x) || isNaN(y)) {
            return false;
          } else {
            if (x1 >= x2) {
              if (!(x2 <= x && x <= x1)) {
                return false;
              }
            } else {
              if (!(x1 <= x && x <= x2)) {
                return false;
              }
            }
            if (y1 >= y2) {
              if (!(y2 <= y && y <= y1)) {
                return false;
              }
            } else {
              if (!(y1 <= y && y <= y2)) {
                return false;
              }
            }
            if (x3 >= x4) {
              if (!(x4 <= x && x <= x3)) {
                return false;
              }
            } else {
              if (!(x3 <= x && x <= x4)) {
                return false;
              }
            }
            if (y3 >= y4) {
              if (!(y4 <= y && y <= y3)) {
                return false;
              }
            } else {
              if (!(y3 <= y && y <= y4)) {
                return false;
              }
            }
          }
          return true;
        }
      }, {
        key: "checkCollision",
        value: function checkCollision(enemy) {
          return this.lineIntersect(this.line.start.x, this.line.start.y, this.line.end.x, this.line.end.y, enemy.x, enemy.y, enemy.x + enemy.velocity.x * enemy.speed, enemy.y + enemy.velocity.y * enemy.speed);
        }
      }, {
        key: "increaseLength",
        value: function increaseLength() {
          this.baseLength += 1;
        }
      }, {
        key: "resetLength",
        value: function resetLength() {
          this.baseLength = 30;
        }
      }]);

      return Player;
    }();

    module.exports = Player;
  }, {}], 8: [function (require, module, exports) {
    var DrawTool = function () {
      function DrawTool(ctx) {
        _classCallCheck(this, DrawTool);

        this.ctx = ctx;
        this.canvas = this.ctx.canvas;
      }

      _createClass(DrawTool, [{
        key: "drawCircle",
        value: function drawCircle(x, y, r) {
          var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "red";

          var ctx = this.ctx;
          var TAU = 2 * Math.PI;
          var arcStart = 0;
          var arcEnd = TAU;
          ctx.beginPath();
          ctx.fillStyle = color;
          ctx.arc(x, y, r, arcStart, arcEnd, false);
          ctx.fill();
        }
      }, {
        key: "drawLine",
        value: function drawLine(points) {
          var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "red";
          var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;

          var ctx = this.ctx;
          ctx.beginPath();
          points.forEach(function (p, i) {
            if (i === 0) {
              ctx.moveTo(p.x, p.y);
            } else {
              ctx.lineTo(p.x, p.y);
            }
          });
          ctx.lineWidth = width;
          ctx.strokeStyle = color;
          ctx.stroke();
        }
      }, {
        key: "fillCanvas",
        value: function fillCanvas() {
          var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "blue";

          var width = this.canvas.width;
          var height = this.canvas.height;

          this.ctx.beginPath();
          this.ctx.rect(0, 0, width, height);
          this.ctx.fillStyle = color;
          this.ctx.fill();
        }
      }, {
        key: "drawScore",
        value: function drawScore(score) {
          var ctx = this.ctx;

          ctx.font = "30px Verdana";
          ctx.fillStyle = "yellow";
          ctx.fillText("Score: " + score.toString(), 50, 50);
        }
      }]);

      return DrawTool;
    }();

    module.exports = DrawTool;
  }, {}], 9: [function (require, module, exports) {
    module.exports = {
      speedUp: 38,
      speedDown: 40
    };
  }, {}], 10: [function (require, module, exports) {
    module.exports = {
      slow: 1,
      normal: 2,
      fast: 3
    };
  }, {}] }, {}, [1]);