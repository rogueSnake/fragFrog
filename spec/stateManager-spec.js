var stateManager = require('../stateManager.js');

describe('stateManager', function () {
    it('should store a new State object', function () {
        var testState = {};
        stateManager.set(testState);
        expect(stateManager.get()).toBe(testState);
    });
});

