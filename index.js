var database = require("./database.js"),
    server = require("./server.js"),
    character = require("./character.js"),
    //map = require("./map.js"),
    turnCount = 0;

server.io.on("connection", function (socket) {
    var broadcastTurn = function () {
        server.io.emit("newTurn", turnCount);
        turnCount += 1;
    };

    var currentPlayer = character.makeNew();
    
    server.io.emit("newCharacter", currentPlayer);

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

    setInterval(broadcastTurn, 5000);
});

