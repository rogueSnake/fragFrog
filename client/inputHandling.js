var socket = require('./socketHandler.js'),
    keypressListener = new window.keypress.Listener();

keypressListener.simple_combo("up", function () {
    console.log("UP!");
    socket.emit("makeMove", "up");
});

keypressListener.simple_combo("down", function () {

});

keypressListener.simple_combo("left", function () {

});

keypressListener.simple_combo("right", function () {

});
