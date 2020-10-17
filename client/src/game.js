const { sendMessage } = require('./client-lib');
const client = require('./client-lib');
const {Phaser, Colyseus, endpoint} = client.getImports();
const colyseus = new Colyseus.Client(endpoint);

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