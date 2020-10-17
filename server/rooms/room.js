
const Room = require('colyseus').Room;
const ServerLib = require('./server-lib');
const g = new ServerLib();

module.exports = class MyRoom extends Room {

    onInit () {

    };

    startGame () {

    }

    join (id) {
    
    }

    onMessage (client, data) {

    };
    
    onLeave (client) {

    };

};
