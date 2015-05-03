fragFrog.socket = io();
console.log("Defining socket: ");
console.log(fragFrog.socket);

fragFrog.app = angular.module("app", []);

fragFrog.app.controller("appCtrl", function ($scope) {
    var i = 0,
        unsyncedRow =  {
            columnA: " ",
            columnB: " ",
            columnC: " "
        };

    $scope.grid = [];

    for (i = 0; i < 3; i += 1) {
        $scope.grid.push(Object.create(unsyncedRow));
    }

    fragFrog.socket.emit("requestGrid");
    fragFrog.socket.on("broadcastGrid", function (grid) {
        $scope.grid = grid;
        $scope.$apply();
    });

    $scope.tapSquare = function (column, row) {
        fragFrog.socket.emit("requestChange", {x: column, y: row});
    };

    fragFrog.socket.on("broadcastChange", function(position) {
        var row = position.y,
            column = position.x,
            setGrid = function (symbol) {
                $scope.grid[row][column] = symbol;
                $scope.$apply();
            };

        switch ($scope.grid[row][column]) {
            case "_" :
                setGrid("x");
                break;
            case "x" :
                setGrid("o");
                break;
            case "o" :
                setGrid("_");
                break;
        }
    });
});
