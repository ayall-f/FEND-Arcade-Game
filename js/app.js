"use strict";
// Enemies our player must avoid
class Characters {
  constructor(x, y, speed, sprite) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y + 60;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = sprite;

    this.step = 101;
    this.resetPos = -this.step;
    this.boundary = this.step * 5;

    this.jump = 83;
    this.startX = this.step * 2;
    this.startY = (this.jump * 4) + 55;
    this.victory = false;
  }

  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
class Enemy extends Characters {
  constructor(x, y, speed, sprite = 'images/enemy-bug.png') {
    super(x, y, speed, sprite);
  }

  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < this.boundary) {
      this.x += this.speed * dt;
    } else {
      this.x = this.resetPos;
    }
    // Check collisions here
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
        player.x = 200;
        player.y = 400;
    };
  };
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Characters {
  constructor(x, y, speed, sprite = 'images/char-horn-girl.png') {
    super(x, y, speed, sprite);
  }

  // The player wins the game when they reach the water
  update(dt) {
    // Reset once the user reaches the water
      if (this.y < 0) {
          setTimeout(() => {
              this.x = 200;
              this.y = 400;
          },);
          gameOver();
      };
  }

  handleInput(keyCode) {
    switch (keyCode) {
      case 'left':
           if (this.x > 0) {
               this.x -= this.step;
           }
           break;
      case 'up':
           if (this.y > 0) {
               this.y -= this.jump;
           }
           break;
      case 'right':
           if (this.x < this.step * 4) {
               this.x += this.step;
           }
           break;
      case 'down':
           if (this.y < this.jump * 4) {
               this.y += this.jump;
           }
           break;
    }
  }
}

// Game Over
function gameOver() {
    const message = `You Win, Good Job!
        Wanna play again?`;
    alert(message);
}

// Now instantiate your objects
// Place all enemy objects in an array called allEnemies

const allEnemies = [
    new Enemy(-101, 0, 250),
    new Enemy(-101, 83, 350),
    new Enemy(-101, 160, 400)
];

for(var i = 0; i < 3; i++){
    var enemy = new Enemy (-300,40 + i * 90);
}

console.log(allEnemies);

// Place the player object in a variable called player
const player = new Player(200, 350);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
