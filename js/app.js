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
  this.width = 100;
  this.height = 75;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  dt = 20;

  if (player1.x + player1.width > this.x &&
    player1.x < this.x + this.width &&
    player1.y + player1.height > this.y &&
    player1.y < this.y + this.height) { //Collision detector
    document.location.reload();
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
  this.width = 75;
  this.height = 90
}
// This class requires an update(), render() and
Player.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  dt = 20;
  if (player.y == -5) { // detects if player makes it the water
    setTimeout(function() {
      onFinish();
    }, 20);
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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

// Now instantiate your objects.
let player1 = new Player(205, 445);
let enemy1 = new Enemy(5, 60, 2);
let enemy2 = new Enemy(5, 143, 3);
let enemy3 = new Enemy(5, 226, 5);
// Place all enemy objects in an array called allEnemies
let allEnemies = [enemy1, enemy2, enemy3]
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