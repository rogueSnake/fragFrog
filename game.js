/*
var config = require('./config.js'),
    monsters = require('./monsters.js'),
    characters = require('./characters.js'),
    items = require('./items.js'),
    map = require('./map.js'),
    environment = require('./environment.js'),
    stateManager = require('./turnManager.js'),
    orderManager = require('./orderManager.js');
*/

var stateManager = require('./stateManager.js'),
    orderManager = require('./orderManager.js');

var turn = 0;

initialize = function (latestTurn) {
    stateManager.set(latestTurn);
};

addOrder = function (name, x, y, facing, order, turnNumber) {

};

cancelOrder = function (character, turnNumber) {

};

buildTurn = function () {
    var lastState = stateManager.get();

    turn += 1;
};

module.exports = {
    initialize : initialize,
    buildTurn : buildTurn,
    addOrder : addOrder,
    cancelOrder : cancelOrder
};

