const Game = require("./game.js");

const canvas = document.getElementById("spinerCanvas");
const ctx = canvas.getContext("2d");

const game = new Game(ctx);

game.start();
