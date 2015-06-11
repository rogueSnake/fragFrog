var database = require('../database.js');

describe('database', function () {

    it('should check loading status', function () {
        expect(database.checkLoading()).toBe(false);
    });
/*
    it('should make a new database object', function () {
        var testDatabase = function () {

            if (database.checkLoading()) {
                database.addPlayer({name : "Batman"}, function () {
                    database.getPlayers(function (err, players) {
                        expect(players[0].name).toBe("Batman");
                    });
                });
            }

            else {
                setTimeout(testDatabase, 1000);
            }
        };

        testDatabase();
    });
*/
});


