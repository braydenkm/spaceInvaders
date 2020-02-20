// Bullet class for building and moving bullets.
class Bullet {
  // builds a new bullet.
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 4;
    this.h = 18;
  }
  
  // move bullet upwards.
  move() {
    this.y -= bulletSpeed; 
  }
  
  // display the bullet.
  show() {
    fill(255, 0, 0);
    rect(this.x - this.w/2, this.y - this.h/2, this.w, this.h); 
  }
}