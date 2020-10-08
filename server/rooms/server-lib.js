let game;
let boardWidth;
let boardHeight;
let counts = {};
module.exports = {
    createGame(newGame) {
        game = newGame;
        game.onJoin = (client, options) => {
            if (!game.state.isThisFirstPlayer) {
                game.state.isThisFirstPlayer = {};
                game.state.isThisFirstPlayer[client.sessionId] = {id: client.sessionId}
                if (game.startGame) {
                    game.startGame(client.sessionId);
                }
            }
            if (game.join) {
                game.join(client.sessionId);
            }
        }
    },

    createBoard(width, height, color) {
        game.state.board = {};
        game.state.board['board'] = {width, height, color};
        boardWidth = width;
        boardHeight = height;
    },

    createResources(type, amount) {
        for (var i = 0; i < amount; i++) {
            let newX = Math.random() * (boardWidth);
            let newY = Math.random() * (boardHeight);
            if (!counts[type]) counts[type] = 0;
            game.state[type][counts[type]] = {id: counts[type], x:newX, y:newY, type:'resource', height:103, width:61};
            counts[type] += 1;
        }
    },

    createResource(type, x, y) {
        if (!counts[type]) counts[type] = 0;
        game.state[type][counts[type]] = {id:counts[type], x, y, type:'resource', height:103, width:61};
        counts[type] += 1;
    },

    createCharacter(type, id, x, y) {
        game.state[type][id] = {id, x, y, angel:0};
        return game.state[type][id];
    },
    createEnemies(type, amount) {
        for (var i = 0; i < amount; i++) {
            let newX = Math.random() * (boardWidth);
            let newY = Math.random() * (boardHeight);
            if (!counts[type]) counts[type] = 0;
            game.state[type][counts[type]] = {id: counts[type], x:newX, y:newY, type:'enemy', health:100, height:103, width:61};
            counts[type] += 1;
        }
    },
    createEnemy(type, x, y) {
        if (!counts[type]) counts[type] = 0;
        game.state[type][counts[type]] = {id:counts[type], x, y, type:'enemy', health:100, height:103, width:61};
        counts[type] += 1;
    },
    getCharacter(
        type, // string: The type of characters.
        client // object: The colyseus client connection.
      ) {
        return game.state[type][client.sessionId];
      },
      handleActions(
        actions, // object: Your action functions.
        data // object: The data from the message.
      ) {
        for (let a in actions) {
          if (data[a]) {
            actions[a]();
          }
        }
      }
   
}
