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

  if (player.x + 20 + player.width > this.x + 15 &&
    player.x + 20 < this.x + this.width + 15 &&
    player.y + 80 + player.height > this.y + 85 &&
    player.y + 80 < this.y + 85 + this.height) { //Collision detector fine tuned to hit boxes of player and bugs
    player.lives -= 1;
    player.x = 205;
    player.y = 445;
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
  this.gems = 0;
};
// This class requires an update(), render() and
Player.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  dt = 20;
  if (this.lives == 0) { //checks to see if player lost all lives
    setTimeout(function() {
      alert("Game Over");
      document.location.reload();
    }, 20);
  }
  if (this.y == -5) { // detects if player makes it the water
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
  ctx.fillText(`Gems Collected: ${this.gems}`, 105, 40);
};
// a handleInput() method.
Player.prototype.handleInput = function(param) {
  switch (param) { // Makes sure Player can not move off screen
    case "left":
      (this.x > 49) ? this.x -= 50: null;
      break;
    case "right":
      (this.x < 404) ? this.x += 50: null;
      break;
    case "down":
      (this.y < 445) ? this.y += 50: null;
      break;
    case "up":
      (this.y == -5) ? null: this.y -= 50;
      break;
  }
};

const Collectable = function(x, y, speedX, speedY, sprite) {
  this.arr = [`images/Gem-Blue.png`, `images/Gem-Orange.png`, `images/Gem-Green.png`];
  this.sprite = this.arr[sprite];
  this.x = x;
  this.y = y;
  this.speedX = speedX;
  this.speedY = speedY;
  this.width = 70;
  this.height = 70;
  this.state = 1;
};

Collectable.prototype.update = function(dt) {
  dt = 20;

  if (this.state == 1) {
    if (player.x + 20 + player.width > this.x + 15 &&
      player.x + 20 < this.x + this.width + 15 &&
      player.y + 80 + player.height > this.y + 75 &&
      player.y + 80 < this.y + this.height + 75) { //Collision detector fine tuned to hit boxes of player and Gems
      this.state = 0;
      player.gems += 1;
    }
  }

  if (this.x + this.speedX + 100 > ctx.canvas.width) {
    this.speedX = -this.speedX; //reverses the Gem's trajectory when part of the Gem touches SIDE borders
  } else if (this.x < 0) {
    this.speedX = -this.speedX; //reverses the Gem's trajectory when part of the Gem touches SIDE borders
  } else if (this.y < 0) {
    this.speedY = -this.speedY; //reverses the Gem's trajectory when part of the Gem touches TOP borders
  } else if (this.y + this.speedY + 180 > ctx.canvas.height) {
    this.speedY = -this.speedY; //reverses the Gem's trajectory when part of the Gem touches BOTTOM borders
  }

  this.x += this.speedX;
  this.y += this.speedY; // moves Gem accross canvas
};

Collectable.prototype.render = function() {
  if (this.state == 1) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};

// Now instantiate your objects.
let player = new Player(205, 445);
let blue = new Collectable(10, 50, 3, -3, 0);
let orange = new Collectable(10, 150, 1.5, -1.5, 1);
let green = new Collectable(10, 250, 1, -1, 2);
let enemy1 = new Enemy(5, 60, 2);
let enemy2 = new Enemy(5, 143, 3);
let enemy3 = new Enemy(5, 226, 5);
// Place all enemy objects in an array called allEnemies
let allEnemies = [enemy1, enemy2, enemy3]

let collectables = [blue, orange, green];
// Place the player object in a variable called player

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