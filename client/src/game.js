const { sendMessage } = require('./client-lib');
const client = require('./client-lib');
const {Phaser, Colyseus, endpoint} = client.getImports();
const colyseus = new Colyseus.Client(endpoint);

const keyCodes = Phaser.Input.Keyboard.KeyCodes;
const keys = {
  w: keyCodes.W,
  s: keyCodes.S,
  a: keyCodes.A,
  d: keyCodes.D,
  up: keyCodes.UP,
  down: keyCodes.DOWN,
  left: keyCodes.LEFT,
  right: keyCodes.RIGHT,
  shoot: keyCodes.SPACE
};


module.exports = class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  init() {
    client.createGame(this);
    this.room = null;
    // this.cursors = null;
    this.players = {};
    this.trees = {};
    this.bulls = {};
  }

  preload() {
    // this.load.image("logo", "asset/logo.png");
    this.load.image("ninja", "asset/ninja.png");
    this.load.image("tree", "asset/tree.png");
    // this.load.image("ninjaStar", "asset/ninjaStar.png")
    this.load.image("bull", "asset/bull.png")
    // this.load.image("goblin", "asset/goblin.png")
    // this.load.image("spear", "asset/spear.png")
    // this.load.image("healthBackground", "asset/healthBackground.png")
    // this.load.image("health", "asset/health.png")
    // this.load.image("safeZone", "asset/safeZone.png");
    // this.load.image("pickaxe", "asset/pickaxe.png");
  }

  create() {
    // client.addKeys();
    // this.cameras.main.setBackgroundColor('#395C09');
    this.connect();
    client.setupKeys(keys);
  }

  click(x, y) {
    client.sendMessage('click', {x, y})
  }

  update() {
    // if (this.cursors.d.isDown) {
    //   client.sendMessage('movePlayerRight');
    // }
    // if (this.cursors.w.isDown) {
    //   client.sendMessage('movePlayerUp');
    // }
    // if (this.cursors.a.isDown) {
    //   client.sendMessage('movePlayerLeft');
    // }
    // if (this.cursors.s.isDown) {
    //   client.sendMessage('movePlayerDown');
    // }
    const { up, down, left, right, w, a, s, d, shoot } = client.getKeysDown();
      if (up || w) client.sendMessage('moveUp');
      if (down || s) client.sendMessage('moveDown');
      if (left || a) client.sendMessage('moveLeft');
      if (right || d) client.sendMessage('moveRight');
      if (shoot) client.sendMessage('shoot');
  }

  connect() {
    var game = this;
    // client.createSquare(0, 0, 200, 200, '99cc00');
    // client.createSprite('tree', 80, 80)
    // client.randomSprite('tree', 100, 1000, 100, 1000);

    this.room = colyseus.join('main', {});
    // client.listenFor('players', function(change, player, id) {
    //   if (change == 'add') {
    //     console.log("ADDED")
    //     let ninja = client.createSprite('ninja', player.x, player.y)
    //     ninja.setScale(0.5);
    //     if (player.id === id) {
    //       game.cameras.main.startFollow(ninja);
    //     }
    //     game.players[player.id] = ninja;
    //   }
    // })
    client.listenFor('board', function({width, height, color, id}) {
      client.drawBoard(width, height, color);
    })
    client.listenFor('trees', function({x, y, id}) {
      let tree = client.createSprite('tree', x, y);
      game.trees[id] = tree;
    })
    client.listenFor('players', function({x, y, me, id}) {
      let ninja = client.createSprite('ninja', x, y, 0.5);
      game.players[id] = ninja;
      if (me) {
        client.cameraFollow(ninja);
      }
    })
    client.listenFor('bulls', function({x, y, id}) {
      let bull = client.createSprite('bull', x, y);
      game.bulls[id] = bull;
    })
  }

}