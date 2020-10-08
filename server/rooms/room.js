
const Room = require('colyseus').Room;
const server = require('./server-lib');

module.exports = class MyRoom extends Room {

    onInit () {
        server.createGame(this);
        this.setState({
            players: {},
            trees: {},
            bulls: {}
        });
    };

    startGame () {
      server.createBoard(500, 500, '909090');
    }

    join (id) {
      let player = server.createCharacter('players', id, 500, 500);
      // player.speed = 2;
    }

    onMessage (client, data) {

      // const player = server.getCharacter('players', client);
      // const actions = {
      //   moveUp: () => {
      //     player.y -= player.speed;
      //     player.angle = 0;
      //   },
      //   moveDown: () => {
      //     player.y += player.speed;
      //     player.angle = 180;
      //   },
      //   moveLeft: () => {
      //     player.x -= player.speed;
      //     player.angle = -90;
      //   },
      //   moveRight: () => {
      //     player.x += player.speed;
      //     player.angle = 90;
      //   },
      //   click: () => {
      //     server.createResource('trees', data.x, data.y)
      //   }
      // }
      // server.handleActions(actions, data);
    };
    
    onLeave (client) {
        delete this.state.players[ client.sessionId ];
    };

};
