var rowIds = [],
    mongoClient = require('mongodb').MongoClient,
    connect = function (callback) {
        mongoClient.connect('mongodb://localhost:8000/TicTapToe',
                function(err, db) {

            if (err) {throw err}
            callback(db.collection("grid"));
        });
    };

connect(function (grid) {
    grid.count(function (err, count) {
        var i = 0,
            tempRow = {},
            defaultRow = {
                "columnA": "_",
                "columnB": "_",
                "columnC": "_"
            };

        if (err) {throw err}

        if (count === 0) {

            for (i = 0; i < 3; i += 1) {
                tempRow = Object.create(defaultRow);
                tempRow.row = i;
                grid.insert(tempRow, function () {});
            }
        }
    });
});

module.exports = {

    getGrid : function (callback) {
        connect(function (grid) {
            grid.find(function (err, cursor) {

                if (err) {throw err}
                cursor.toArray(function (err, rows) {

                    if (err) {throw err}
                    callback(rows);
                });
            });
        });
    },

    changeGrid : function (position) {
        var rowId = rowIds[position.y],
            columnUpdate = {},
            newSymbol;

        connect(function (grid) {
            grid.find({row: position.y}, function (err, cursor) {

                if (err) {throw err}
                cursor.toArray(function (err, rows) {

                    if (err) {throw err}

                    switch (rows[0][position.x]) {
                        case "_" :
                            newSymbol = "x";
                            break;
                        case "x" :
                            newSymbol = "o";
                            break;
                        case "o" :
                            newSymbol = "_";
                            break;
                    }
                    columnUpdate[position.x] = newSymbol;
                    grid.update({row: position.y}, {$set : columnUpdate}, function () {});
                });
            });
        });
    }
};

