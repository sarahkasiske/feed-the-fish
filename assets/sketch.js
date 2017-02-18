//Characters
var pirannah;
var fish;

//ground
var sand;
var sandImg = [];

//food
var fishFood;
var fishFoodImg;
var feed;

//movement
var swim = -7;

//other
var gameOver = true;
var foodCounter = 0;
var foodTracker = 0;
var fallingDirection = 0;
var timer;
var count = 12;
var trackTime = window.setInterval(timer, 12000);
var timerId;


function setup() {
  $( "#gameover" ).hide();
  createCanvas(970,700);
  bgImg = loadImage("assets/bg.png");

  document.addEventListener("keydown", function (e) {
    if([37,38,39,40].indexOf(e.keyCode) > -1){
      e.preventDefault();
      // Do whatever else you want with the keydown event (i.e. your navigation).
    }
  }, false);

  fishFoodImg = loadImage("assets/fishfood.png");


  //adding sand
  sandImg[0] = loadImage("assets/sand.png");
  sandImg[1] = loadImage("assets/sand2.png");
  sandImg[2] = loadImage("assets/obsticle-01.png");
  sandImg[3] = loadImage("assets/obsticle-02.png");
  sandImg[4] = loadImage("assets/obsticle-03.png");

  sand = new Group();
  feed = new Group();

  //back is at 1600
  //front is -400
  // x = -width;
  for (var x = 0-200; x < width*2; x += 79) {
    //var sandPiece = createSprite(x,475,80,50);
    var r = parseInt(random(0,sandImg.length));
    if(r == 0) {
      var sandPiece = createSprite(x,474.5,80,50);
    }else if (r == 1) {
      var sandPiece = createSprite(x,474.5,80,50);
    } else if (r == 2) {
      var sandPiece = createSprite(x,340,80,50);
    } else if (r == 3) {
      var sandPiece = createSprite(x,382,80,50);
    }
    else {
      var sandPiece = createSprite(x,399,80,50);
    }
    sandPiece.addImage(sandImg[r]);
    sandPiece.setCollider("rectangle",0,0,sandImg[r].width,sandImg[r].height);
    sand.add(sandPiece);
  }
    //create fish
    fish = createSprite(241, 400, 75, 51);
    var fishSwim = loadAnimation("assets/GoodFish-00.png",  "assets/GoodFish-02.png");
    fish.addAnimation("swimming", fishSwim);
    fish.setCollider("rectangle", 0, 5, 60, 40);
}

$(document).ready(function(){
  $(".start").click(function() {
    newGame();
    $( "#gameover" ).hide();
  });

});

function draw() {

  if (!gameOver){
  $("#gamestart").hide();
   fish.overlap(feed, eat);
    for(var i = 0; i < sand.length; i++) {
      var block = sand[i];
      if ((camera.position.x + width) > block.position.x + (width*2)) {
        block.position.x += (width*2);
      }
    }
    camera.position.x = fish.position.x + width/4;

    if(keyDown(LEFT_ARROW)){
    fish.velocity.x = 3;
    }
    if(keyDown(RIGHT_ARROW)){
        fish.velocity.x = 9;
    }

    if(keyDown(DOWN_ARROW)){
        fish.velocity.y = 1.7;
    }

    if(keyDown(UP_ARROW)){
        fish.velocity.y = -1.7;
    }

    //bottom
    if (fish.position.y >=440 && fish.velocity.y == 1.7) {
      fish.velocity.y = 0;
    }

    // top
    if (fish.position.y <= 90 && fish.velocity.y == -1.7) {
      fish.velocity.y = 0;
    }

    var fishFeeding = floor(random(0,100))

    if (fishFeeding == 1){
    //  console.log("Food");

      //add fishFood
      var food = createSprite(random(camera.position.x - width/2, camera.position.x + width/2),0,3,3);
      food.addImage(fishFoodImg);
      food.velocity.y = 1;
      food.velocity.x = 3;
      food.life = 400;
      feed.add(food);
      food.setCollider("circle",0,1,8);
      food.update();
    }
  }

  camera.off();
  image(bgImg, 0, 0);
  textSize(20);
  textAlign(LEFT);
  fill("#478DAC");
  text('Food Eaten: '+ foodCounter, 50, 30);
  text('Time Left: ' + count, 800, 30);
  camera.on();
  drawSprites();
  drawSprites(feed);
}

//creates more sand pieces
function Newsand(){
  lastGroundTile = ground[ground.length-1];

  if(lastGroundTile.position.x < ((width / 2) + camera.position.x + 100)){
    var randomNumber = floor(random(0,0));
    // var randombubbles = floor(random(0,100));

    if(randomNumber < 10){
      var sandPiece = createSprite((lastsandTile.position.x+50),441,50,20);
      obsticalImg = loadImage("assets/obstical.png");
      sandPiece.addImage(gobsticalImg);
      sand.add(sandPiece);
    }
    sandPiece.setCollider("rectangle",0,0,50,20);
    sandPiece.update();
    obsticalTileLastUsed = true;
    }
}

function eat(fish, fishFood) {
  fishFood.remove();
  foodCounter++;
  foodTracker++;
}

function countdown() {
  clearInterval(timerId);
    timerId = setInterval(timeDown,1000);
}

function timeDown() {
    count--;
    console.log(count);

    if(foodTracker >= 3) {
        count = 12;
        foodTracker = 0;
    }

    if (count == 0 && foodTracker < 3){
      die();
    }

    if (count <= 0) {
      count = 0;
    }
}

function die() {
  updateSprites(false);
  gameOver = true;
  $( "#gameover" ).show();
  count = false;
}

function newGame() {
  gameOver = false;
  updateSprites(true);
  countdown();
  fish.velocity.x = 3;
  foodTracker = 0;
  foodCounter = 0;
  count = 12;
  }
