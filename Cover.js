// Cover class for building cover blocks to defend the player.
class Cover {
  // builds the cover.
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 12;
    this.health = 3;
    this.colour = 255;
  }

  // checks collosion with game projectiles.
  collide() {
    // check if cover is hit by a bullet.
    if (bullets.length > 0) {
      let w = bullets[0].w;
      let h = bullets[0].h;
      
      // check if bullet overlaps the cover. 
      for (let i = bullets.length - 1; i >= 0; i--) {
        if (bullets[i].x + w / 2 >= this.x - this.size / 2 &&
          bullets[i].x - w / 2 <= this.x + this.size / 2 &&
          bullets[i].y + h / 2 >= this.y - this.size / 2 &&
          bullets[i].y - h / 2 <= this.y + this.size / 2
        ) {
          // if hit remove bullet, lower health of cover or delete.
          bullets.splice(i, 1);
          this.health--;
          this.colour -= 50;
          if (this.health == 0) {
            coverBlocks.splice(coverBlocks.indexOf(this), 1);
          }
        }
      }
    }
    
    // check if cover is hit by a bomb.
    if (bombs.length > 0) {
      let w = bombs[0].w;
      let h = bombs[0].h;
      
      // check if bomb overlaps cover.
      for (let i = bombs.length - 1; i >= 0; i--) {
        if (bombs[i].x + w / 2 >= this.x - this.size / 2 &&
          bombs[i].x - w / 2 <= this.x + this.size / 2 &&
          bombs[i].y + h / 2 >= this.y - this.size / 2 &&
          bombs[i].y - h / 2 <= this.y + this.size / 2
        ) {
          // if hit remove bomb, lower health of cover or delete.
          bombs.splice(i, 1);
          this.health--;
          this.colour -= 50;
          if (this.health == 0) {
            coverBlocks.splice(coverBlocks.indexOf(this), 1);
          }
        }
      }
    }
  }

  // display the cover.
  show() {
    noStroke();
    fill(this.colour);
    rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
  }
}