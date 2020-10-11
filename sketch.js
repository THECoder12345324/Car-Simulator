/* This is the code for the car simulator. Made by Madhuram Sharma*/


//The settings for the simulator
var car, wall;
var speed, weight;

var START = 0;
var END = 1;
var gamestate = START;


function setup() {
  createCanvas(1600,400);

  //Assigning random values to speed and weight
  speed=random(55, 90);
  weight=random(400, 1500);

  //Making car and wall
  car = createSprite(50, 200, 50, 50);
  wall = createSprite(1500, 200, 60, height / 2)
  car.velocityX = speed;
  car.shapeColor = "black";
}

function draw() {
  background(250, 255,255);  
  //Draws the sprites
  drawSprites();

  //Drawing the title
  textSize(60);
  text("Car Simulator", 500, 60);

  //Showing the speed and weight
  textSize(30);
  fill("black");
  text("Speed: " + Math.floor(speed), 1200, 120);
  text("Weight: " + Math.floor(weight), 1000, 120);

  //Only collides if the gamestate is start
  if (gamestate === START) {
    //Checks if car is touching wall
    if(wall.x-car.x < (car.width+wall.width)/2) {
      //Sets velocity to zero if it is so it doesn't keep going
      car.velocityX = 0;

      //Calculates the deformation
      var deformation = 0.5 * weight * speed * speed/22500;

      //Decides how lethal it was based on amount of deformation
      if(deformation>180)
      {
        car.shapeColor = color(255, 0, 0);
        gamestate = END;
      }
      if(deformation<180 && deformation>100)
      {
        car.shapeColor = color(230, 230, 0);
        gamestate = END;
      }
      if(deformation<100)
      {
        car.shapeColor = color(0, 255, 0);
        gamestate = END;
      }
    }
  }
  if (gamestate === END) {
    //Tells user how to reset
    text("Press r to reset", 700, 200);
    
  }
  if (gamestate === END && keyDown("r")) {
    //Executes the reset command
    gamestate = START;
    reset()
  }
}

//Defining the reset function so that it can be used by the main code
function reset() {
  speed=random(55, 90);
  weight=random(400, 1500);
  car.x = 50;
  car.y = 200;
  car.velocityX = speed;
  car.shapeColor = "black";
}