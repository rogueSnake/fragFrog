fragFrog.gameWorld = {};

fragFrog.gameWorld.spriteContainer = {
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
        fragFrog.gameWorld.stage.addChild(this.sprite);
    }
};

fragFrog.gameWorld.stage = new PIXI.Stage(0x66FF99);
fragFrog.gameWorld.renderer = new PIXI.WebGLRenderer(400, 300);
document.body.appendChild(fragFrog.gameWorld.renderer.view);
fragFrog.gameWorld.animate;

requestAnimFrame( animate );

fragFrog.gameWorld.texture = PIXI.Texture.fromImage("images/floor.png");
fragFrog.gameWorld.wallTexture = PIXI.Texture.fromImage("images/wall.png");

fragFrog.gameWorld.floorGrid = [];

for (x = 0; x < 20; x += 1) {
    fragFrog.gameWorld.floorGrid.push([]);
//    console.log("X: " + x);

    for (y = 0; y < 20; y += 1) {
//        console.log("Y: " + y);
        fragFrog.gameWorld.floorGrid[x][y] = 
                new PIXI.Sprite(fragFrog.gameWorld.texture);
        fragFrog.gameWorld.floorGrid[x][y].anchor.x = 0;
        fragFrog.gameWorld.floorGrid[x][y].anchor.y = 0;
        fragFrog.gameWorld.floorGrid[x][y].position.x = x * 64;
        fragFrog.gameWorld.floorGrid[x][y].position.y = y * 64;
        fragFrog.gameWorld.stage.addChild(fragFrog.gameWorld.floorGrid[x][y]);
    }
}

// create a new Sprite using the texture
fragFrog.gameWorld.bunny = new PIXI.Sprite(fragFrog.gameWorld.wallTexture);

// center the sprites anchor point
fragFrog.gameWorld.bunny.anchor.x = 0.5;
fragFrog.gameWorld.bunny.anchor.y = 0.5;

// move the sprite t the center of the screen
fragFrog.gameWorld.bunny.position.x = 200;
fragFrog.gameWorld.bunny.position.y = 150;

fragFrog.gameWorld.stage.addChild(fragFrog.gameWorld.bunny);


//animate = function () {
function animate() {

    requestAnimFrame( animate );

    // just for fun, lets rotate mr rabbit a little
    fragFrog.gameWorld.bunny.rotation += 0.1;

    // render the stage
    fragFrog.gameWorld.renderer.render(fragFrog.gameWorld.stage);
};

fragFrog.socket.on("newTurn", function (n) {
    console.log("New turn!");
    console.log(n);
});

fragFrog.gameWorld.characters = [];

fragFrog.socket.on("newCharacter", function (character) {
    var index = fragFrog.gameWorld.characters.length;

    fragFrog.gameWorld.characters[index] = character;
    console.log(fragFrog.gameWorld.characters);
    fragFrog.gameWorld.characters[index].sprite = 
            new PIXI.Sprite(fragFrog.gameWorld.wallTexture);
    fragFrog.gameWorld.characters[index].sprite.anchor.x = 0;
    fragFrog.gameWorld.characters[index].sprite.anchor.y = 0;
    fragFrog.gameWorld.characters[index].sprite.position.x = character.x * 64;
    fragFrog.gameWorld.characters[index].sprite.position.y = character.y * 64;
    fragFrog.gameWorld.stage.addChild(fragFrog.gameWorld.characters[index].
            sprite);
 
});
