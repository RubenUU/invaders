var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
      default: 'arcade'
  },
  scene: {
    preload: preload, create: create, update: update
  }
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image('bullet', 'assets/bullet.png');
    this.load.spritesheet('invader', 'assets/invader32x32x4.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('ship', 'assets/player_invader.png');
}

var player;
var cursors;
var fireButton;
var bullets;
var bulletTime = 0;

function create() {
    bullets = this.physics.add.group();
    invader = this.add.image(400, 50, 'invader');
    player = this.physics.add.image(400, 500, 'ship');
    player.setCollideWorldBounds(true);
    cursors = this.input.keyboard.createCursorKeys();
    fireButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
}

function update(time){
    if (fireButton.isDown){
        fireBullet(time);
    }
    if (cursors.right.isDown){
        player.x = player.x + 5;
    }
    if (cursors.left.isDown){
        player.x = player.x - 5;
    }
}

function fireBullet(time) {
    if (time > bulletTime){
        var body = bullets.create(player.x, player.y - 32, 'bullet');
        body.setVelocity(0, -200);
        bulletTime = time + 500;
    }
}