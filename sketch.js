let frog;
let lifeFrogs = [];
let cars = [];

let lives = 3;
let score = 0;

let BLACK;

let FROG_LEFT = 175, FROG_TOP = 505;

function setup(){
  BLACK = color(0, 0, 0);
  lifeFrogs[0] = new Frog(10, 550, 25, 40, color(0), color(20, 220, 20));
  lifeFrogs[1] = new Frog(40, 550, 25, 40, color(0), color(20, 220, 20));
  lifeFrogs[2] = new Frog(70, 550, 25, 40, color(0), color(20, 220, 20));
  
  createCanvas(400, 600);
  frameRate(60);
  
  frog = new Frog(FROG_LEFT, FROG_TOP, 25, 40, color(0), color(20, 220, 20));
  
  for (let i = 0; i < 4; i++){
    cars[i] = new Car(300 - i * 100, 415, 35, 20, BLACK, color(random(0, 255), random(0, 255), random(0, 255)), 1, 1);
  }
  for (let i = 4; i < 8; i++){
    cars[i] = new Car(300 - (i - 4) * 100, 360, 35, 20, BLACK, color(random(0, 255), random(0, 255), random(0, 255)), 1, -1);
  }
  for (let i = 8; i < 12; i++){
    cars[i] = new Car(300-(i-8)*100, 265, 35, 20, BLACK, color(random(0, 255), random(0, 255), random(0, 255)), 2, 1);
  }
  for (let i = 12; i < 16; i++){
    cars[i] = new Car(300-(i-12)*100, 215, 35, 20, BLACK, color(random(0, 255), random(0, 255), random(0, 255)), 2, -1);
  }
}

function draw() {
  drawBackground();
  
  for (let i = 0; i < lives; i++){
    lifeFrogs[i].draw();
  }
  
  frog.draw();
  
  for (let i = 0; i < 16; i++){
    cars[i].move();
    cars[i].draw();
    if (frog.isTouching(cars[i]))
      die();
  }
  
  fill(BLACK);
  text("Lives: ", 15, 545);
  text("Score: ", 350, 550);
  text(score, 360, 570);
  
  if (lives < 0) {
    gameOver();
  }
  
  if(frog.top < 50){
    win();
  }
}

function drawBackground(){
    background(color(0, 255, 0));
  //pond
  ellipseMode(CORNERS);
  noStroke();
  fill(color(0, 0, 255));
  ellipse(0, -50, 400, 50);

  //roads
  rectMode(CORNERS);
  fill(color(150, 150, 150));  
  rect(0, 350, 400, 450);
  rect(0, 200, 400, 300);

  fill(color(200, 200, 0));
  for (var x = 0; x < 400; x+=40) {
    rect(x, 399, x+20, 401);
    rect(x, 249, x+20, 251);
  }
}

function keyPressed()
{
  if (keyCode == 37 && frog.left > 0) { //left
    frog.moveLeft();
  }  
  else if (keyCode == 39 && frog.left + frog.width < 400) { //right
    frog.moveRight();
  }  
  else if (keyCode == 38) { //up
    frog.moveUp();
  }  
  else if (keyCode == 40 && frog.top + frog.height < 590) { //down
    frog.moveDown();
  }
}

function die() {
  lives--;
  frog.move(FROG_LEFT, FROG_TOP);
  frog.draw();
}

function win() {
  score += 100; 
  frog.move(FROG_LEFT, FROG_TOP);
  frog.draw();
}

function gameOver() {
  
  fill(0,255,0);
  rect(0,0,400,800);
  
  fill(BLACK);
  textSize(30);
  text("Game Over", 130, 270);
  text("Score: " + score, 130, 300);
  
}


class Shape{
  constructor(left, top, width, height, outline, fillColor){
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.outline = outline;
    this.fillColor = fillColor;
  }
  
  isTouching(other){
    return (this.left < other.left + other.width) && (this.left + this.width > other.left) && (this.top < other.top + other.height) && (this.top + this.height > other.top);
  }
}

class Frog extends Shape{
  constructor(left, top, width, height, outline, fillColor){
    super(left, top, width, height, outline, fillColor);
  }
  
   moveLeft() {
    this.left-= this.width;
  }
  moveRight() {
    this.left+= this.width;
  }
  moveUp() {
    this.top  -= this.height;
  }
  moveDown() {
    this.top += this.height;
  }

  move( left,  top) {
    this.left = left;
    this.top = top;
  }

  draw() {
    stroke(this.outline);
    fill(this.fillColor);
    ellipseMode(CORNER);
    ellipse(this.left, this.top, this.width, this.height);
  }
}

class Car extends Shape{
  constructor(left, top, width, height, outline, fillColor, speed, direction){
    super(left, top, width, height, outline, fillColor);
    this.speed = speed;
    this.direction = direction;
  }
  
     move() {
    this.left += this.speed * this.direction;

    if (this.left + this.width < 0) {
      this.left = 400;
    }
    if (this.left > 400) {
      this.left=-this.width;
    }
  }

   draw() {
    rectMode(CORNER);
    stroke(this.outline);
    fill(this.fillColor);
    rect(this.left, this.top, this.width, this.height);
  }
}