function onFinish() { //restarts the game
  alert("You made it!!");
  document.location.reload();
}

// Enemies our player must avoid
const Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.width = 70;
  this.height = 50;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  dt = 20;

  if (player1.x + 20 + player1.width > this.x + 15 &&
    player1.x + 20 < this.x + this.width + 15 &&
    player1.y + 80 + player1.height > this.y + 85 &&
    player1.y + 80 < this.y + 85 + this.height) { //Collision detector fine tuned to hit boxes of player and bugs
    player1.lives -= 1;
    player1.x = 205;
    player1.y = 445;
  }

  if (this.x >= 500) {
    this.x = -100; // places enemies all the way to the left to restart their journey
  }
  this.x += this.speed; //moves enemies accross canvas
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
const Player = function(x, y) {
  this.sprite = 'images/char-horn-girl.png';
  this.x = x;
  this.y = y;
  this.width = 60;
  this.height = 55;
  this.lives = 4;
};
// This class requires an update(), render() and
Player.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  dt = 20;
  if (player1.lives == 0) { //checks to see if player lost all lives
    setTimeout(function() {
      alert("Game Over");
      document.location.reload();
    }, 20);
  }
  if (player.y == -5) { // detects if player makes it the water
    setTimeout(function() {
      onFinish();
    }, 20);
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText(`Lives: ${this.lives}`, 5, 40);
};
// a handleInput() method.
Player.prototype.handleInput = function(param) {
  switch (param) { // Makes sure Player can not move off screen
    case "left":
      (player1.x > 49) ? player1.x -= 50: null;
      break;
    case "right":
      (player1.x < 404) ? player1.x += 50: null;
      break;
    case "down":
      (player1.y < 445) ? player1.y += 50: null;
      break;
    case "up":
      (player1.y == -5) ? null: player1.y -= 50;
      break;
  }
};

const Collectable = function(x, y, speed, sprite) {
  this.arr = [`images/Gem-Blue.png`, `images/Gem-Orange.png`, `images/Gem-Green.png`];
  this.sprite = this.arr[sprite];
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.width = 70;
  this.height = 70;
  this.state = 1;
};

Collectable.prototype.update = function(dt) {
  dt = 20;

  if (player1.x + 20 + player1.width > this.x + 15 &&
    player1.x + 20 < this.x + this.width + 15 &&
    player1.y + 80 + player1.height > this.y + 75 &&
    player1.y + 80 < this.y + this.height + 75) { //Collision detector fine tuned to hit boxes of player and Gems
    this.state = 0;
  }

  if (this.x >= 500) {
    this.x = -100; // places Gem all the way to the left to restart their journey
  }
  this.x += this.speed; // moves Gem accross canvas
};

Collectable.prototype.render = function() {
  if (this.state == 1) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};

// Now instantiate your objects.
let player1 = new Player(205, 445);
let blue = new Collectable(10, 50, 3, 0);
let orange = new Collectable(10, 150, 1.5, 1);
let green = new Collectable(10, 250, 1, 2);
let enemy1 = new Enemy(5, 60, 2);
let enemy2 = new Enemy(5, 143, 3);
let enemy3 = new Enemy(5, 226, 5);
// Place all enemy objects in an array called allEnemies
let allEnemies = [enemy1, enemy2, enemy3]

let collectables = [blue, orange, green];
// Place the player object in a variable called player
let player = player1;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  let allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});