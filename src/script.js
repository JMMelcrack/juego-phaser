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

var score = 0;
var scoreText;

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
    player.setBounce(0); // Make the object bounce when hit another object or screen limit

    this.anims.create({
        key: 'left', // Name of the animation
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }), // What sprites should the animation use
        frameRate: 10, // Frames per second
        repeat: -1 // -1 means that when animation comes to sprite 3, it starts again in sprite 0
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    //player.body.setGravityY(300); // Change the gravity for an especific object

    this.physics.add.collider(player, platforms); // Add collisions between two objects

    cursors = this.input.keyboard.createCursorKeys(); // Check buttom pressed by the player, WASD

    stars = this.physics.add.group({ // Create a dinamic group
        key: 'star', // What sprite use
        repeat: 11, // How many stars add
        setXY: {x: 12, y:0, stepX:70} // Where to add each star
    })

    stars.children.iterate(function(child){ // Iterate all the group members and make them bounce when hit the ground
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(stars, platforms);

    this.physics.add.overlap(player, stars, collectStar, null, true); // When player and stars collide, function collectStar is called

    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff'}); // Add text to the screen
}

function update(){
    if(cursors.left.isDown){ // What to do when left buttom is clicked
        player.setVelocityX(-160);
        player.anims.play('left', true);
    } else if(cursors.right.isDown){ // Right
        player.setVelocityX(160);
        player.anims.play('right', true);
    } else{ // Nothing pressed
        player.setVelocityX(0);
        player.anims.play('turn', true);
    }

    if(cursors.up.isDown && player.body.touching.down){ // Check if player is jumping and in the ground
        player.setVelocityY(-330);
    }
}

// Function to collect the stars
function collectStar(player, star){
    star.disableBody(true, true); // Remove the object

    score += 1;
    scoreText.setText('Score: ' + score);
}