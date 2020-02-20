// Bomb class for building and moving bomb objects.
class Bomb {
  // builds the bomb.
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 10;
    this.h = 16;
  }
  
  // move the bomb downwards.
  move() {
    this.y += bombSpeed; 
  }
  
  // display the bomb.
  show() {
    fill(75, 75, 255);
    rect(this.x - this.w/2, this.y - this.h/2, this.w, this.h); 
  }
}