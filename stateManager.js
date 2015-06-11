var currentState = {};

var set = function (newState) {
    currentState = newState;
};

var get = function () {
    return currentState;
};

module.exports = {
    set : set,
    get : get
};

