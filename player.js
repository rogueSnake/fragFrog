var character = require('./character.js');

var protoPlayer = {
    name : "PaulMcFartney",
    passwordInfo : {},
    character : {}
};

var makeNew = function (name, passwordSalt, passwordHash) {
    var player = Object.create(protoPlayer);

    player.character = character.makeNew(0, 0, name);
    player.name = name;
    player.passwordInfo = {
        salt : passwordSalt,
        hash : passwordHash
    };
    return player;
};

module.exports = {
    makeNew : makeNew
};

