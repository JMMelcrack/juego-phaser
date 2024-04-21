var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

// Preload all the resources needed for the game
function preload(){
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', {frameWidth: 288/9, frameHeight: 48}); // Load the sprite
}

// Show the resources previously preloaded in the game
function create(){
    this.add.image(400, 300, 'sky');
    // this.add.image(400, 300, 'star'); // Adding the star next to the sky makes it appears above the sky in the game

    platforms = this.physics.add.staticGroup(); // I am telling that the platforms objects are going to be static (don't move)

    platforms.create(400, 568, 'ground').setScale(2).refreshBody(); // Put an object in the game, then scalate it to be the floor of the game and refresh its physics
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(100, 450, 'dude');

    player.setCollideWorldBounds(true); // Make the object can't go out of the screen
    player.setBounce(0.2); // Make the object bounce when hit another object or screen limit

    this.anims.create({
        key: 'left', // Name of the animation
        frame: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }), // What sprites should the animation use
        frameRete: 10, // Frames per second
        repeat: -1 // -1 means that when animation comes to sprite 3, it starts again in sprite 0
    });

    this.anims.create({
        key: 'turn',
        frame: [ { key: 'dude', frame: 4 } ],
        frameRete: 20
    });

    this.anims.create({
        key: 'right',
        frame: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRete: 10,
        repeat: -1
    });
}

function update(){

}