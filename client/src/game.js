const client = require('./client-lib');
const {Phaser, Colyseus, endpoint} = client.getImports();
const colyseus = new Colyseus.Client(endpoint);

module.exports = class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  init() {
    client.createGame(this);
    this.room = null;
    // this.cursors = null;
    this.players = {};
  }

  preload() {
    this.load.image("logo", "asset/logo.png");
    this.load.image("ninja", "asset/ninja.png");
    this.load.image("tree", "asset/tree.png");
    this.load.image("ninjaStar", "asset/ninjaStar.png")
    this.load.image("bull", "asset/bull.png")
    this.load.image("goblin", "asset/goblin.png")
    this.load.image("spear", "asset/spear.png")
    this.load.image("healthBackground", "asset/healthBackground.png")
    this.load.image("health", "asset/health.png")
    this.load.image("safeZone", "asset/safeZone.png");
    this.load.image("pickaxe", "asset/pickaxe.png");
  }

  create() {
    client.addKeys();
    this.cameras.main.setBackgroundColor('#395C09');
    this.connect();
  }

  update() {
    if (this.cursors.d.isDown) {
      client.sendMessage('movePlayerRight');
    }
    // if (this.cursors.w.isDown) {
    //   client.sendMessage('movePlayerUp');
    // }
    // if (this.cursors.a.isDown) {
    //   client.sendMessage('movePlayerLeft');
    // }
    // if (this.cursors.s.isDown) {
    //   client.sendMessage('movePlayerDown');
    // }
  }

  connect() {
    var game = this;
    client.createSquare(0, 0, 200, 200, '99cc00');
    client.createSprite('tree', 80, 80)
    client.randomSprite('tree', 100, 1000, 100, 1000);

    this.room = colyseus.join('main', {});

    client.listenFor('players', function(change, player, id) {
      if (change == 'add') {
        let ninja = client.createSprite('ninja', player.x, player.y)
        ninja.setScale(0.5);
        if (player.id === id) {
          game.cameras.main.startFollow(ninja);
        }
        game.players[player.id] = ninja;
      }
    })
  }

}