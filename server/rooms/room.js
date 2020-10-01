
const Room = require('colyseus').Room;
const treeAmount = 100;
const enemyAmount = 20;
const gameWidth = 2000;
const gameHeight = 2000;
const chaseDistance = 1000;
let ninjaIndex = 0;
let enemySpeed = 3;
let enemyIndex = 0;
let windowWidth = 0;
let windowHeight = 0;
let speed = 5;
const ninjaStarSpeed = 7;
module.exports = class MyRoom extends Room {

    onInit () {
        this.setState({
            players: {},
        });
    };

    onJoin (client, options) {
      this.state.players[client.sessionId] = {
        x: 50,
        y: 50,
        angle:0,
        id: client.sessionId
      }
      // createPlayer(x, y);
      // createResource();
      // createEnemy();
      // createItems();
      // createLocation();
      
    };

    onMessage (client, data) {
      let player = this.state.players[client.sessionId];
      if (data.movePlayerRight) {
        player.x += 1;
        player.angle = 90;
      }
      if (data.movePlayerLeft) {
        player.x -= 1;
        player.angle = -90;
      }
      if (data.movePlayerUp) {
        player.y -= 1;
        player.angle = 0;
      }
      if (data.movePlayerDown) {
        player.y += 1;
        player.angle = 180;
      }
    };
    
    onLeave (client) {
        delete this.state.players[ client.sessionId ];
    };

};
