var PLAY = 1;
var END = 0;
var gameState = PLAY;

var skybg, waterbg, shipimg, helicopterimg, bombimg, shipwreck;
var water, ship, helicopter, bomb;

var gameoverImg, restartImg;
var gameover, restart;



var helicopterGroup, bombGroup;

var score = 0;

function preload(){
  skybg = loadImage("skybg.jpg");
  waterbg = loadImage("waterbg.png");
  shipimg = loadImage("ship.png");
  helicopterimg = loadImage("helicopter.png");
  bombimg = loadImage("bomb.png");
  gameoverImg = loadImage("gameOver.png")
  restartImg = loadImage("restart.png")
  shipwreck = loadImage("ship2.png")
}

function setup() {
  createCanvas(800, 450);
  
  //creating water ground
  water = createSprite(400,400,10,10)
  water.addImage("water",waterbg);
  
  
  //creating ship
  ship = createSprite(50,380,10,10)
  ship.addImage("ship",shipimg);
  ship.scale = 0.2;
  
  //creating helicopter group
  helicopterGroup= createGroup();


  //creating bomb group
  bombGroup= createGroup();
    

  //ship.debug = "true";

  restart = createSprite(400,170,10,10);
    restart.addImage("restart",restartImg);
    restart.scale = 0.1;

    gameover = createSprite(400,125,10,10);
    gameover.addImage("gameover",gameoverImg);

    restart.visible=false;
    gameover.visible = false;

}

function draw() {
  background(skybg);
  drawSprites();

  fill("yellow");
  textSize(15);
  text("SURVIVAL TIME: "+ score, 600,30);
  
    
  //gameState play
  if(gameState === PLAY){
    //increase score
    score = score + Math.round(frameCount/300);

    //for infinite background 
    water.velocityX = -4;
 if(water.position.x < 300){
  water.position.x = 400;
  }
    
    //Call user defined function
    spawnBomb();
    spawnHelicopter();
    
    if(bombGroup.isTouching(ship)){
        gameState = END;
    }
    
  }
  
  //gameState end
  else if(gameState === END){

    ship.addImage("wreckedShip", shipwreck)
   //water velocity becomes zero
    water.velocityX = 0;

   //destroy Helicopter group
    helicopterGroup.destroyEach();

   //destroy bomb group
    bombGroup.destroyEach();

    restart.visible=true;
    gameover.visible = true;

    
    if(mousePressedOver(restart)){
      reset();
    }
   
  }
}

function reset(){
  gameState = PLAY;
  ship.addImage("ship",shipimg);
  score = 0;
  restart.visible=false;
  gameover.visible = false;
 
}

function spawnHelicopter(){
  if(frameCount%200 === 0){
    helicopter = createSprite(800,80,200,50);
    helicopter.addImage("helicopter",helicopterimg);
    helicopter.velocityX = -5;    
    helicopter.scale = 0.5;
    
    helicopterGroup.add(helicopter);

    
  }
}

function spawnBomb(){
 // create bombs at random position
 //use Math.random

 if(frameCount%200 === 0){


 bomb = createSprite(800,80,200,50);
 bomb.addImage("bomb",bombimg);
 bomb.scale = 0.5;
 bomb.velocityX = Math.round(random(-1,-6));

 bomb.velocityY = 1;
 bomb.scale = 0.2;
    
 bombGroup.add(bomb);

}
}

/*
I am not sure about assigning random positions to the bombs. The position of helicopters and bombs will not be synchronised.
I am not sure of any other way to do it.

So I have assigned a random velocity instead to make it hit or miss the ship randomly.
*/




