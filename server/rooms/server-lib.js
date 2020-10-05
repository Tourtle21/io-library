let game;
let boardWidth;
let boardHeight;
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
            // let newX = Math.random() * () - 
            // game.state[type] = {x:};
        }
    }
   
}
