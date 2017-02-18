//keyboard events
//capturing key presses and mouse buttons once
//press x and z or mouse left and right

// var asterisk;
var ghost;
// var platform;

var GRAVITY = 1;
var JUMP = 15;

function setup() {
  createCanvas(800,400);

  ghost = createSprite(200, 200);
  ghost.addAnimation("normal", "assets/fish-swim-00.png",  "assets/fish-swim-03.png");


}

function draw() {
  background(255,255,255);

  fill(200);
  textAlign(CENTER);
  text("Press x and z", width/2, 20);

    

  //keyDown returns true for a cycle if the key was just pressed
  //during this cycle. Useful to capture instant events in the draw cycle
  //without moving game logic to the mousePressed() function
  //mouseWentDown works the same way with mouse input

  //same as keyWentDown
  //RIGHT = right mouse button
  if(keyWentUp("z") || mouseWentUp(RIGHT))
    ghost.rotation = 0;

  //keyDown is similar to keyIsDown() except it accepts both key codes and characters
  if(keyDown("z") || mouseDown(RIGHT))
    ghost.rotation -= 10;

  drawSprites();
}
