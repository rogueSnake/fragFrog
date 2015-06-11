var turns = [];

// We should consider using a position object here.
var addOrder = function (name, x, y, facing, order, turnNumber) {

    if (!(turns[turnNumber] && turns[turnNumber][0])) {
        turns[turnNumber] = [];
    }

    turns[turnNumber].push({
        name : name,
        x : x,
        y : y,
        facing : facing,
        order : order
    });
};

var getOrders = function (turnNumber) {
    return turns[turnNumber];
};

module.exports = {
    addOrder : addOrder,
    getOrders : getOrders
};

