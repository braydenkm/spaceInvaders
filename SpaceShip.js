// SpaceShip class for the player object.
class SpaceShip {
  // build new spaceship.
  constructor() {
    this.x = width / 2;
    this.sx= this.x;
    this.y = height - 15;
    this.sy= this.y;
    this.w = 34;
    this.h = 20;
    this.shot = false;
    this.timeShot = 0;
  }

  // move the player in direction of arrow keys.
  move() {
    if (keyIsDown(RIGHT_ARROW) && player.x <= width - 25)
      player.x += playerStep;
    if (keyIsDown(LEFT_ARROW) && player.x >= 25)
      player.x -= playerStep;
  }

  // display the player.
  show() {
    image(spaceShipImg, this.x - this.w/2, this.y - this.h/2, this.w, this.h);
  }

  // check collosions with bombs.
  collide() {
    // only check if a bomb exists.
    if (bombs.length != 0) {
      let w = bombs[0].w;
      let h = bombs[0].h;
      for (let i = 0; i < bombs.length; i++) {
        
        // check if bombs overlap with player.
        if (bombs[i].x + w / 2 >= this.x - this.w / 2 &&
          bombs[i].x - w / 2 <= this.x + this.w / 2 &&
          bombs[i].y + h / 2 >= this.y - this.h / 2 &&
          bombs[i].y - h / 2 <= this.y + this.h / 2
        ) {
          // remove a life and start new round.
          if (lives != 0) {
            lives--;
            continueRound();
          } else {
            gameOver();
          }
        }
      }
    }
  }

  // check if player can shoot again.
  updateShot() {
    if (frameCount >= player.timeShot + bulletWait) {
      player.shot = false;
    }
  }
}