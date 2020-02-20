// Alien class for building and updating aliens.
class Alien {
  // build an alien object.
  constructor(x, y) {
    this.x = x;
    this.sx = this.x;
    this.y = y;
    this.sy = this.y;
    this.w = 20;
    this.h = 15;
  }

  // check collosions with game objects.
  collide() {
    // check if hit by a bullet.
    if (bullets.length != 0) {
      let w = bullets[0].w;
      let h = bullets[0].h;
      for (let i = bullets.length - 1; i >= 0; i--) {
        
        // check if bullet overlaps alien.
        if (bullets[i].x + w / 2 >= this.x - this.w / 2 &&
          bullets[i].x - w / 2 <= this.x + this.w / 2 &&
          bullets[i].y + h / 2 >= this.y - this.h / 2 &&
          bullets[i].y - h / 2 <= this.y + this.h / 2
        ) {
          // remove bullet and alien.
          bullets.splice(i, 1);
          aliens.splice(aliens.indexOf(this), 1);
          
          // update score, speed, and alien count.
          bombFreq -= int(bombFreqStart / aliensStart);
          score += (aliensStart - aliensLeft + 1) * 10;
          aliensLeft--;
        }
      }
    }

    // check if touching player.
    let w = player.w;
    let h = player.h;
    if (player.x + w / 2 >= this.x - this.w / 2 &&
      player.x - w / 2 <= this.x + this.w / 2 &&
      player.y + h / 2 >= this.y - this.h / 2 &&
      player.y - h / 2 <= this.y + this.h / 2
    ) {
      // remove life, end game if no lives left.
      if (lives != 0) {
        lives--;
        continueRound();
      } else {
        gameOver();
      }
    }
    
    
    // detect wall collision.
    if (this.x >= width - this.w / 2) {
      direction = left;
      down = true;
    } else if (this.x <= this.w / 2) {
      direction = right;
      down = true;
    }
  }

  // move left and right, then down if hit wall.
  move(moveDown) {
    if (frameCount % alienSpeed == 0) {      
      // move down if hit wall.
      if (moveDown) {
        this.y += this.h;
      }
      
      // move right or left.
      if (direction == right) {
        this.x += alienStep;
      } else if (direction == left) {
        this.x -= alienStep;
      }
    }
  }

  // randomly decide to shoot a bomb towards the player.
  shoot() {
    if (frameCount % 15 == 0) {
      let shootBomb = int(random(bombFreq));
      if (shootBomb == 1) {
        bombs.push(new Bomb(this.x, this.y));
      }
    }
  }

  // display the alien.
  show() {
    image(alienImg[alienIndex], this.x - this.w/2, this.y - this.h/2, this.w);
  }
}