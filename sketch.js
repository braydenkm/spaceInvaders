/*
    SPACE INVADERS
    Brayen M
*/

// game settings.
let playerStep = 3;
let alienStep = 10;
let bulletSpeed = 4;
let bombSpeed = 2;
let bulletWait = 20;
let alienSpeed = 45; // 45 rec
let bombFreq = 175; // 175 rec, higher = slower.


// objects.
var player;
var bullets;
var bombs;
var aliens;
var coverBlocks = [];

// other.
let score;
let highScore = 0;
let lives;
let aliensLeft;
let aliensStart;
let over = false;
let paused = false;
let bombFreqStart = bombFreq;
let heartSize = 20;
let left = 0;
let right = 1;
let direction = right;
let down = false;
let alienImg = [];
let alienIndex = 0;
let heartImg;
let spaceShipImg;



// load images.
function preload() {
  alienImg[0] = loadImage("Images/alienImage/alienUp.png");
  alienImg[1] = loadImage("Images/alienImage/alienDown.png");
  heartImg = loadImage("Images/heart.png");
  spaceShipImg = loadImage("Images/spaceShip.png");
}



// setup.
function setup() {
  newGame();
}



// create a new game.
function newGame() {
  // set highscore if lower that score
  if (score > highScore) highScore = score;
  score = 0;
  lives = 3;

  // start game.
  startRound();
}



// continue round if shot.
function continueRound() {
  // reset player.
  player.x = player.sx;
  player.y = player.sy;

  // reset aliens.
  direction = right;
  for (let i = 0; i < aliens.length; i++) {
    aliens[i].y = aliens[i].sy;
    aliens[i].x = aliens[i].sx;
  }

  // reset projectiles.
  bombs = [];
  bullets = [];
}



// startRound functions for new rounds.
function startRound() {
  createCanvas(400, 400);
  noStroke();

  // clear game.
  bullets = [];
  bombs = [];
  aliens = [];
  coverBlocks = [];
  bombFreqStart = bombFreq;

  // create player.
  player = new SpaceShip();

  // create aliens.
  let cols = 12;
  let rows = 4;
  aliensLeft = cols * rows;
  aliensStart = aliensLeft;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      aliens.push(new Alien(i * 30 + 20, 30 * (j + 1)));
    }
  }

  // create cover blocks.
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      coverBlocks.push(new Cover(32 + i * 12 + j * 100, height - 72));
      coverBlocks.push(new Cover(32 + i * 12 + j * 100, height - 60));
    }
  }
}



// main draw loop.
function draw() {
  background(40);

  // draw remaining and score.
  fill(255, 150);
  textSize(20);
  text("aliens " + aliensLeft, width - 90, height - 15);
  text("score " + score, 15, height - 40);
  text("high score " + highScore, 15, height - 15);
  text("lives", 15, 25);
  for (let i = 0; i < lives; i++) {
    image(heartImg, 65 + heartSize * i * 1.2, 10, heartSize);
  }

  // update game objects.
  updateProjectiles();
  updateAliens();

  // next round if aliens are defeated.
  if (aliensLeft == 0) {
    lives++;
    score += 5000;
    alienSpeed--;
    bombFreq = bombFreqStart;
    startRound();
  }

  // display and update blocks.
  for (let i = coverBlocks.length - 1; i >= 0; i--) {
    coverBlocks[i].collide();
    coverBlocks[i].show();
  }

  // move and show player.
  player.move();
  player.show();
  player.updateShot();
  player.collide();
}



// called when last life is lost.
function gameOver() {
  over = true;
  background(40);
  textSize(50);
  text("GAME\nOVER", width / 2 - 75, height / 2 - 40);
  textSize(20);
  text("X for new game", width / 2 - 65, height / 2 + 50);
  noLoop();
}



// move, show, and delete bullets.
function updateProjectiles() {
  // move, show, and delete bullets.
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].move();
    bullets[i].show();
    if (bullets[i].y < 0) {
      bullets.splice(i, 1);
    }
  }

  // move, show, and bombs bullets.
  for (let i = bombs.length - 1; i >= 0; i--) {
    bombs[i].move();
    bombs[i].show();
    if (bombs[i].y > height) {
      bombs.splice(i, 1);
    }
  }
}



// check collision, move, and show aliens.
function updateAliens() {
  // check if aliens touched wall or bullet.
  for (let i = 0; i < aliens.length; i++) {
    aliens[i].collide();
  }

  // move and show aliens.
  for (let i = aliens.length - 1; i >= 0; i--) {
    aliens[i].move(down);
    aliens[i].show();
    aliens[i].shoot();
  }
  down = false;

  // update alien image.
  if (frameCount % alienSpeed == 0) {
    if (alienIndex) alienIndex = 0;
    else alienIndex = 1;
  }
}



// shoot on spacebar, pause on p.
function keyPressed() {
  // shoot bullet.
  if (key == " " && !player.shot && !over) {
    bullets.push(new Bullet(player.x, player.y));
    player.shot = true;
    player.timeShot = frameCount;
  }

  // pause the game.
  if (key == "p" && !over) {
    if (paused) {
      paused = false;
      loop();
    } else {
      paused = true;
      noLoop();
    }
  }

  // restart on game over.
  if (key == "x" && over) {
    over = false;
    newGame();
    loop();
  }

  return false;
}