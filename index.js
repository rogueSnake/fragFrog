var database = require("./database.js"),
    server = require("./server.js"),
    player = require("./player.js"),
    //map = require("./map.js"),
    turnCount = 0,
    broadcastTurn = function () {
        server.io.emit("newTurn", turnCount);
        turnCount += 1;
    };

setInterval(broadcastTurn, 5000);

server.io.on("connection", function (socket) {

    socket.on('makePlayer', function (name, salt, hash) {
        database.addPlayer(player.makeNew(name, salt, hash));
    });

    socket.on("makeMove", function (direction) {
        currentPlayer.addOrder(direction);
        console.log(direction);
    });

    socket.on("requestGrid", function () {
        database.getGrid(function (grid) {
            server.io.emit("broadcastGrid", grid);
        });
    });

    socket.on("requestChange", function (position) {
        database.changeGrid(position);
        server.io.emit("broadcastChange", position);
    });
});



