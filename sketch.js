var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
 
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  

  
  
  
 createCanvas = (500,500)
  monkey = createSprite(80,285,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1
  
  ground = createSprite(130,305,500,20)
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
  console.log(ground.x)
  
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0
}

function draw() {
  background("white");
  
  
  
  if(gameState === PLAY){
    
        if(keyDown("space") && monkey.y >= 189) {
          monkey.velocityY = -12;
        }
    
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach()
      score = score+1
      
    }

      monkey.velocityY = monkey.velocityY + 0.8

      monkey.collide(ground);

       if (ground.x < 0){
          ground.x = ground.width/2;
        }

      spawnbanana();
      obstacles();
    
}
  
  if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
}
  
  if(gameState===END){
    
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        bananaGroup.setVelocityXEach(0);

        obstaclesGroup.setLifetimeEach(-1);
        bananaGroup.setLifetimeEach(-1);
    
  }
  drawSprites();
   text("score :"+score,200,50);
}

function spawnbanana() {
  
  if (frameCount % 80 === 0) {
    banana = createSprite(500,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    banana.lifetime = 200;
    bananaGroup.add(banana);
  } 
}

function obstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(500,275,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1
    obstacle.velocityX = -3
    
    obstacle.lifetime = 200
   obstaclesGroup.add(obstacle)
  }
}



