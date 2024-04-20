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

    platforms.create(400, 568, 'ground').setScale(2); // Put an object in the game
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
}

function update(){

}