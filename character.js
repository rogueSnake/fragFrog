var prototypeCharacter = {
    image : "images/wall.png",
    owner : "Paul McFartney",
    x : 0,
    y : 0,
    orderQueue : [],

    addOrder : function (command) {
        this.orderQueue.push(command);
    }
};

var makeNew = function (x, y, ownerName) {
    var tempCharacter = Object.create(prototypeCharacter);

    tempCharacter.x = x || 0;
    tempCharacter.y = y || 0;
    tempCharacter.owner = ownerName || "Paul McFartney";

    return tempCharacter;
};



module.exports = {
    makeNew : makeNew
};
