(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var socket = require('./socketHandler.js');

var spriteContainer = {
    position : {
        x : 0,
        y : 0,
        facing : "up"
    },
    setPosition : function (newPosition) {
        var setProperty = function (propertyName) {
                if (newPosition[propertyName]) {
                    this.position[propertyName] = newPosition[propertyName];
                }
            },
            propertyNames = [
                "x",
                "y",
                "facing"
            ],
            i = 0;

        for (i = 0; i < 3; i += 1) {
            setProperty.bind(this, propertyNames[i])();
        }

        if (this.sprite) {
            this.syncSprite();
        }
    },
    syncSprite : function () {
        this.sprite.position.x = this.position.x * 64;
        this.sprite.position.y = this.position.y * 64;
    },
    draw : function (texture, position) {

        if (position) {
            this.setPosition(position);
        }
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.anchor.x = 0;
        this.sprite.anchor.y = 0;
        this.syncSprite();
        stage.addChild(this.sprite);
    }
};

var stage = new PIXI.Stage(0x66FF99);
var renderer = new PIXI.WebGLRenderer(400, 300);
document.body.appendChild(renderer.view);

requestAnimFrame( animate );

var texture = PIXI.Texture.fromImage("images/floor.png");
var wallTexture = PIXI.Texture.fromImage("images/wall.png");

var floorGrid = [];

for (x = 0; x < 20; x += 1) {
    floorGrid.push([]);
//    console.log("X: " + x);

    for (y = 0; y < 20; y += 1) {
//        console.log("Y: " + y);
        floorGrid[x][y] = 
                new PIXI.Sprite(texture);
        floorGrid[x][y].anchor.x = 0;
        floorGrid[x][y].anchor.y = 0;
        floorGrid[x][y].position.x = x * 64;
        floorGrid[x][y].position.y = y * 64;
        stage.addChild(floorGrid[x][y]);
    }
}

// create a new Sprite using the texture
var spinningWall = new PIXI.Sprite(wallTexture);

// center the sprites anchor point
spinningWall.anchor.x = 0.5;
spinningWall.anchor.y = 0.5;

// move the sprite t the center of the screen
spinningWall.position.x = 200;
spinningWall.position.y = 150;

stage.addChild(spinningWall);


//animate = function () {
function animate() {

    requestAnimFrame( animate );

    // just for fun, lets rotate mr rabbit a little
    spinningWall.rotation += 0.1;

    // render the stage
    renderer.render(stage);
};

socket.on("newTurn", function (n) {
    console.log("New turn!");
    console.log(n);
});

var characters = [];

socket.on("newCharacter", function (character) {
    var index = characters.length;

    characters[index] = character;
    console.log(characters);
    characters[index].sprite = 
            new PIXI.Sprite(wallTexture);
    characters[index].sprite.anchor.x = 0;
    characters[index].sprite.anchor.y = 0;
    characters[index].sprite.position.x = character.x * 64;
    characters[index].sprite.position.y = character.y * 64;
    stage.addChild(characters[index].
            sprite);
 
});

},{"./socketHandler.js":5}],2:[function(require,module,exports){
var gameWorld = require('./gameWorld.js'),
    ngApp = require('./ngApp.js'),
    inputHandling = require('./inputHandling.js');


},{"./gameWorld.js":1,"./inputHandling.js":3,"./ngApp.js":4}],3:[function(require,module,exports){
var keypressListener = new window.keypress.Listener();

keypressListener.simple_combo("up", function(){
    console.log("UP!");
    fragFrog.socket.emit("makeMove", "up");
});

keypressListener.simple_combo("down", function(){

});

keypressListener.simple_combo("left", function(){

});

keypressListener.simple_combo("right", function(){

});

},{}],4:[function(require,module,exports){
var socket = require('./socketHandler.js');

var app = angular.module("app", []);

app.controller("appCtrl", function ($scope) {
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

    socket.emit("requestGrid");
    socket.on("broadcastGrid", function (grid) {
        $scope.grid = grid;
        $scope.$apply();
    });

    $scope.tapSquare = function (column, row) {
        socket.emit("requestChange", {x: column, y: row});
    };

    socket.on("broadcastChange", function(position) {
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

},{"./socketHandler.js":5}],5:[function(require,module,exports){
module.exports = io();


},{}]},{},[2]);
