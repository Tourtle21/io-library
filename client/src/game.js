const Phaser = require('phaser');
const ClientLib = require('./client-lib');
const g = new ClientLib();

const keyCodes = Phaser.Input.Keyboard.KeyCodes;
const keys = {
  w: keyCodes.W,
};


module.exports = class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  init() {

  }

  preload() {

  }

  create() {

  }

  click(x, y) {

  }

  update() {

  }

  connect() {
   
  }

}