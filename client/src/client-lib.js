const Phaser = require('phaser');
const Colyseus = require('colyseus.js');
const clone = require('clone');

const gameConfig = require('../../config.json');
let game;
let allKeys;

document.addEventListener('click', function(e) {
    if (game.click) {
        var moveX = e.clientX - window.innerWidth/2;
        var moveY = e.clientY - window.innerHeight/2;
        game.click(game.cameras.main.scrollX + window.innerWidth/2 + moveX, game.cameras.main.scrollY + window.innerHeight/2 + moveY);
    }
})
module.exports = {
    createGame(newGame) {
        game = newGame;
    },

    loadImage(name, path) {
        game.load.image(name, path);
    },

    getImports() {

        const endpoint = (window.location.hostname === "localhost")
            ? `ws://localhost:${gameConfig.serverDevPort}` // development (local)
            : `${window.location.protocol.replace("http", "ws")}//${window.location.hostname}` // production (remote)
        return { Phaser, Colyseus, clone, endpoint };
    },
    setupKeys(keys) {
        allKeys = keys;
        game.cursors = game.input.keyboard.addKeys(keys);
    },
    getKeysDown() {
        const keysDown = {};
        for (let key in allKeys) {
          keysDown[key] = game.cursors[key].isDown;
        }
        return keysDown;
      },

    createSquare(width, height, x, y, color) {
        var rect = new Phaser.Geom.Rectangle(width, height, x, y);
        var graphics = game.add.graphics({ fillStyle: { color: `0x${color}` } });
        graphics.fillRectShape(rect);
    },
    createSprite(type, x, y, scale = 1) {
        let sprite = game.add.sprite(x, y, type);
        sprite.setScale(scale);
        return sprite;
    },
    randomSprite(type, minX, maxX, minY, maxY) {
        let newX = Math.random() * (maxX - minX) + minX;
        let newY = Math.random() * (maxY - minY) + minY;
        let sprite = game.add.sprite(newX, newY, type);
        return sprite;
    },
    listenFor(type, cb) {
        game.room.listen(`${type}/:id`, function(change) {
            if (change.operation == 'add') {
                if (change.value.id === game.room.sessionId) {
                    change.value.me = true;
                }
                cb({...change.value})
            } else {
                game[type][change.path.id].destroy();
                delete game[type][change.path.id]
            }
        });
        game.room.listen(`${type}/:id/:attribute`, function(change) {
            console.log(type);
            if (type !== 'board') game[type][change.path.id][change.path.attribute] = change.value;
        })
    },
    cameraFollow(sprite) {
        game.cameras.main.startFollow(sprite);
    },
    sendMessage(type, data) {
        if (data) {
            game.room.send({[type]: true, ...data});
        } else {
            game.room.send({[type]: true});
        }
    },
    drawBoard(width, height, color) {
        this.createSquare(0, 0, width, height, color)
    }
}
