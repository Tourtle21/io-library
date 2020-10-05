
const Room = require('colyseus').Room;
const server = require('./server-lib');

module.exports = class MyRoom extends Room {

    onInit () {
        server.createGame(this);
        this.setState({
            players: {},
            trees: {}
        });
    };

    startGame () {
      server.createBoard(2000, 2000, '242480');
      server.createResources('tree', 100);
    }


    onMessage (client, data) {
      
    };
    
    onLeave (client) {
        delete this.state.players[ client.sessionId ];
    };

};
