// Name: Pranav Marthi
// Date: May 24, 2022
// Course: ICS201
// Description: making a fun, interactive carnival game involving "capturing the bear" through user's timing skills 

// NOTE: there is supposed to be carnival music playing in the background -- imagine the music in this directory playing while you are playing this game!

// NOTE: instructions are mentioned in the console

document.addEventListener('contextmenu', event => event.preventDefault()); // removes the right click menus

// A collection of global variable definitions that are used throughout the program to ensure variables are carried across various functions

// Determines the value of the bear X and Y positions
let bear1XValue;
let bear2XValue;
let bear1YValue;
let bear2YValue;

// Defines the target speeds that the bears travel. 
let target1Speed;
let target2Speed;

// These two variables relate to global definitions that are used for the strobing effect and margin for the bear movement
let boxMargin = 100; // this variable defines the margin that the bear will bounce off the "walls" of the carnvial target range.
let randomColor;

// These variables all relate to the calculations that need to be made to get the slope of the target aim, and the velocity
let distance;
let slope;
let calc;
let xIntercept;
let bIntercept;
let yPosition;
let ratio;
let proportion;

// Player 1, 2 scores
let player1Score;
let player2Score;

// Determines if the target is hit and establishes a basis for the aiming mechanism to function
let target1Hit;
let xAimingMech;
let xAimingMechBoolean;
let xAimingMechSpeed;
let aimClicked;

// Establishes the movement of the circle movement for the aiming mechanism (Y-axis aiming)
let circleY;
let circleYSpeed;
let yAxisSelected;
let targetY;

let player1Turn; // a boolean for determining whether it is player1's turn - if false, defaults to player2's turn

// increments the turn counter to ensure unlimited turns is avoided
let turnCounter;

// variables to define whether player1, player2 won or if it's a tie
let player1Won;
let player2Won;
let tied;

// Used to initialize the program. All the global variables defined above are used in this function to initialize them before operations 
function setup() {
  createCanvas(600, 600); // Creates the canvas upon which the program is built

  // Assigning values to all the previously defined variables (boolean, starting numbers, etc...)
  bear1XValue = 100;
  bear2XValue = 100;
  target1Speed = int(random(7,11));
  target2Speed = int(random(3,7));
  frameRate(60); // Frame rate of the program
  player1Score = 0;
  player2Score = 0;
  target1Hit = false;
  xAimingMech = 260;
  xAimingMechBoolean = false;
  xAimingMechSpeed = 2.5;
  aimClicked = false;
  circleY = 500;
  circleYSpeed = 2.5;
  yAxisSelected = false;
  bear1YValue = 200;
  bear2YValue = 400;
  player1Turn = true;
  turnCounter = 0;
  player1Won = false;
  player2Won = false;
  tied = false;

  print("HOW TO PLAY: \n1. Select the point on the 'fulcrum' on the aiming mechanism. Note: your click must be precise as the selection area is only 15x15 pixels. \n2. Once aim is selected, the mechanism will stop moving. \n3. Select the point on the proportional moving vertical axis to determine your shot position\n4. If the target hit the point (be precise), then the score will increment depending on the target that is hit\n5. After 2 turns for each player, the program will terminate and determine the winner/loser/tie. Note that for termination to occur, you need to press the aiming mechanism one more time.\n6. RULE: vertical aiming is not allowed - this would be too easy for you") // This is the instructions that print out to the console
}

// This function defines the movement area where the bears are actively in motion
function playArea() {
  
  // A black constant definition used as a colour in the function scope
  const BLACK = color(0, 0, 0);
  randomColor = color(random(200), random(120),random(150)); // random colour for strobing effect
  rectMode(CENTER);
  fill(BLACK);
  strokeWeight(6);
  stroke(randomColor);
  
  // draws general rectangle layout for play area
  rect(300, 275, 450, 400, 15);
}

// Draws cylinder strobing effect on the sides of the carnival game screen (takes in x and y position)
function cylinders(x_position, y_position) {
  
  // A black and white constant definition used as a colour in the function scope
  const BLACK = color(0, 0, 0);
  const WHITE = color(255, 255,255);
  stroke(randomColor); //Colour definition implementation

  // All the lines and circles used to create the cylinder look. All based upon the X and Y position passed into the function to make it dynamic
  ellipse(x_position, y_position, 47.5, 40);
  ellipse(x_position, y_position+350, 47.5, 40);
  line(x_position-22.5, y_position, x_position-22.5, y_position+350);
  line(x_position+22.5, y_position, x_position+22.5, y_position+350);
  stroke(random(256));
  strokeWeight(10);
  line(x_position-15, y_position+60, x_position+15, y_position+35);
  line(x_position-15, y_position+110, x_position+15, y_position+85);
  line(x_position-15, y_position+160, x_position+15, y_position+135);
  line(x_position-15, y_position+210, x_position+15, y_position+185);
  line(x_position-15, y_position+260, x_position+15, y_position+235);
  line(x_position-15, y_position+310, x_position+15, y_position+285);
  strokeWeight(6);
}

// The heading of the game
function captureTheBearTextHeading() {
  text("CAPTURE THE BEAR", 300, 50); // Text within the heading
}

// Draws the bear, given a xPosition and yPosition
function bearDrawing(x_position, y_position) {
  
  // Defines the constant colours of RGB form yellow, black, white, and dark_orange
  const YELLOW = color(255, 204, 0);
  const BLACK = color(0, 0, 0);
  const WHITE = color(255, 255, 255);
  const DARK_ORANGE = color('#e28743');
  strokeWeight(1);
  fill(DARK_ORANGE);

  /*All of these are drawn relative to the positions passed through the function*/

  //arms of the bear
  noStroke();
  triangle(x_position-15, y_position-12.5, x_position-35, y_position+7.5, x_position-15, y_position-2.5);
  triangle(x_position+15, y_position-12.5, x_position+35, y_position+7.5, x_position+15, y_position-2.5);

  //legs of the bear
  triangle(x_position, y_position+10, x_position-20, y_position+25, x_position, y_position+22.5);
  triangle(x_position, y_position+10, x_position+20, y_position+25, x_position, y_position+22.5);
  stroke(BLACK);
  
  //body of the bear
  fill(234,182,118);
  ellipse(x_position, y_position, 35, 45);
  fill(DARK_ORANGE)
  ellipse(x_position, y_position, 20, 20);
  fill(234,182,118)
  
  //ears of the bear
  ellipse(x_position-20,y_position-45,15,15);
  ellipse(x_position+20,y_position-45,15,15);
  
  //face of the bear
  ellipse(x_position,y_position-35,45,45);
  fill(DARK_ORANGE)
  ellipse(x_position,y_position-27.5,25.5,21);
  
  //eyes of the bear
  fill(0);
  ellipse(x_position-10,y_position-45,3,4.5);
  ellipse(x_position+10,y_position-45,3,4.5);
  
  //nose of the bear
  ellipse(x_position,y_position-30,7.5,4.5);
}

// Displays the higher bear movement and creates the bouncing motions
function targets() {
  
  // Defines the constant colours of BLACK and RED
  const BLACK = color(0,0,0);
  const RED = color(255,0,0);

  // General establishments for drawing
  strokeWeight(1);
  fill(BLACK);

  // All of this code represents the bear's movement from side-to-side
  bear1XValue = bear1XValue + target1Speed;
  bearDrawing(bear1XValue, bear1YValue);

  //This if statement defines that if the bear value is 100 less than the width OR the bearValue is less that the original margin, the target speed will reverse through multiplying it by -1
  if(bear1XValue > width - boxMargin || bear1XValue < boxMargin){
    target1Speed = -1 * target1Speed;
  } 
}

// Same function as before, just different speed and position. Putting these in the same function will result in the bears travelling at the same speed.
function targets1() {
  
  // color defintions for function scope
  const BLACK = color(0,0,0);
  const RED = color(255,0,0);

  // formatting
  strokeWeight(1);
  fill(BLACK);

  // *refer to previous function notes*
  bear2XValue = bear2XValue + target2Speed;
  bearDrawing(bear2XValue,bear2YValue);

  if(bear2XValue > width - boxMargin || bear2XValue < boxMargin) {
    target2Speed = -1 * target2Speed;
  }
}

// This function draws the input area for the user to interact with the game
function inputArea() {
  
  // Defines the constant colours of BLACK and WHITE
  const BLACK = color(0, 0, 0);
  const WHITE = color(255, 255, 255);

  // Initialization for the input drawing box
  stroke(randomColor);
  fill(BLACK);
  strokeWeight(5);

  // Creates the rectangle for the user X position input
  rect(300, 537.5, 100, 100, 15);
  strokeWeight(10);
  stroke(WHITE);
  point(300, 500);

  // An if statement that determines whether the aiming mechanism should be moving; if it shouldn't, the aiming mechanism freezes
  if (!aimClicked && !yAxisSelected) {
    xAimingMech = xAimingMech + xAimingMechSpeed;

    // Determines whether the X value is at the "boundary" and reverses direct by multiplying by -1
    if(xAimingMech > width - 260 || xAimingMech < 260){
      xAimingMechSpeed = -xAimingMechSpeed;
    }
    
    line(300, 500, xAimingMech, 565);
  } else if (aimClicked) {
    line(300, 500, newAimPoint,565);
    calculation(); // see code below
  }
  rectMode(CENTER); // defaulting back to rectMode center
}

// Creates and finalizes the position at which the player wants to aim the shot.
function targetXY() {

  // Defining color constant of WHITE
  const WHITE = color(255,255,255);
  
  // Initialization and colour determination
  stroke(randomColor);
  strokeWeight(4)

  // Draws the Y axis target range
  rect(400, 537.5, 30, 100, 15);
  fill(WHITE);
  circleY = circleY + circleYSpeed;
  circle(400, circleY, 20)
  // Creates the bouncing motion through margins and height definitions -- basically if the circleY is outside a certain boundary, continue to reverse direction
  if(circleY > height -25 || circleY < 500){
    circleYSpeed = -1 * circleYSpeed; // makes it go back and forth
  }
}

// This function runs on mouse click
function mouseClicked() {
  
  // If the mouse is clicked at the constant point on the X aiming mechanism, the aiming X mechanism pauses
  if (mouseX >= 290 && mouseX <= 310 && mouseY >= 490 && mouseY <= 510) {
    turnCounter +=1
    aimClicked = true;
    newAimPoint = xAimingMech;
    line(300, 500, newAimPoint,565)

    // if the turn counter is 4 (meaning it has been 4 turns) then execute the following conditionals
    if(turnCounter == 5) {
      
      // determines if the player score is bigger and sets variables to appropriate values (false --> true depending on scenario)
      if (player1Score > player2Score) {
        // set the player 1 to status "won"
        print("Player 1 Won");
        player1Won = true;
      } else if (player2Score > player1Score) {
        
         // set the player 2 to status "won"
        print("Player 2 Won");
        player2Won = true;
      } else {
        
         // set the tied to status "tie"
        print("Tied");
        tied = true;
      }
    }
  }
  
  // If the mouseY ball is selected, the player's turn will change and the function will execute a target hit
  if (mouseX > 390 && mouseX < 410 && mouseY < circleY+15 && mouseY > circleY-15) {
    
    // Defines the proportion for the velocity of the target aim
    newCircleY = circleY;
    proportion = (circleY-500)/95
    aimClicked = false;

    // If the target lands in the zone of the top bear, the code will execute
    if ((targetY-bIntercept)/slope > bear1XValue-15 && (targetY-bIntercept)/slope < bear1XValue+15 && targetY > 1/3*height-55 && targetY < 1/3*height+15) {
      // Depending the boolean of the player's turn, the code will add two to player 1 or 2
      if (player1Turn == true) {
        player1Score+=2;
      } else {
        player2Score+=2;
      }
    }

     // If the target lands in the zone of the bottom bear, the code will execute
    if ((targetY-bIntercept)/slope > bear2XValue-15 && (targetY-bIntercept)/slope < bear2XValue+15 && targetY > 2/3*height-55 && targetY < 2/3*height+15) {
      // Depending the boolean of the player's turn, the code will add two to player 1 or 2
      if (player1Turn == true) {
        player1Score+=1;
      } else {
        player2Score+=1;
      }
    }
    player1Turn = !player1Turn  // The player for this iteration will reverse the next time
  }
}

// Draws the scoreboard for the game
function scoreboard() {
  const WHITE = color(255,255,255);
  const BLACK = color(0,0,0);
  rectMode(CENTER);
  // Draws the scoreboard
  rect(130, 540, 200, 100, 15);
  
  // Defines the format for the rest of the program
  textSize(15);
  noFill();
  stroke(BLACK);
  strokeWeight(1);

  // Displays the player score on the screen
  text('Player 1 Score: ' + player1Score, 40, 520);
  text('Player 2 Score: ' + player2Score, 40, 560);
  stroke(WHITE);
  rectMode(CENTER);
}

// Within this function, all the calculations for the game would be completed (slope, bIntercept, xIntercept) -- these are to obtain the angle at which the shot is aimed
function calculation() { 

  //calculate distance between line fulcrum and point determination
  distance = dist(300, 500, newAimPoint, 565);

  // calculates slope of the aiming line
  slope = ((565 - 500) / (newAimPoint - 300))

  // calculation for x-intercept
  calc = (newAimPoint*slope)

  // determines bIntercept for y=mx+b form
  bIntercept = 565-calc;

  // base of game area x-intercept
  xIntercept = (475-bIntercept)/slope;
}

// Some secondary information regarding name and course
function secondaryInformation() {
  // Constant definitions for the colours in this function scope (BLACK + WHITE)
  const BLACK = color(0,0,0);

  // Formatting
  const WHITE = color(255,255,255);
  textSize(13.5)
  fill(WHITE)
  stroke(BLACK)
  rect(500, 537.5, 120, 75, 15);
  fill(BLACK)

  // Text
  text("Made by \nPranav Marthi", 450, 520);
  text("ICS201", 450, 560);
  line(440, 542.5, 560, 542.5)
}

// This function combines all the previously defined functions and creates the game itself
function draw() {
  // Constant definitions for the colours in this function scope (BLACK + WHITE + RED)
  const WHITE = color(255,255,255);
  const BLACK = color(0,0,0);
  const RED = ("#FF0000");

  // Creates the background
  background(RED);

  // Initializes the formatting
  textSize(40);
  textFont('Roboto Mono');
  stroke(WHITE);
  fill(random(200), random(120),random(150));
  strokeWeight(3.5);
  text('Capture the Bear', 110, 50);

  // All the previously defined functions...
  playArea();
  cylinders(37.5, 100);
  cylinders(562.5, 100);
  targets();
  inputArea();
  targets1();
  stroke(WHITE);
  strokeWeight(10);
  targetXY();
  stroke(RED);
  strokeWeight(5);

  // This if statement determines whether the variable aimClicked in true or false and draws the target if the selection is false
  if (aimClicked==false){
    targetY = 475+(-1*(400*proportion))
    line((targetY-bIntercept)/slope-5, targetY-5,(targetY-bIntercept)/slope+5, targetY+5)
    line((targetY-bIntercept)/slope+5, targetY-5,(targetY-bIntercept)/slope-5, targetY+5)
    point((targetY-bIntercept)/slope, targetY)
  }
  scoreboard();
  secondaryInformation();
  
  // This if statement determines whether it is player 1's turn and it will indicate it as a dot next to the scoreboard
  if (player1Turn) {
    strokeWeight(10);
    fill(BLACK);
    point(210, 515)
  } else if (!player1Turn) {
    strokeWeight(10);
    fill(RED);
    point(210, 555)
  }

  // Depending on the situation, display a victory message. Player 1 wins --> freeze and display player 1 won, Player 2 wins --> freeze and display player 2 won, Tied --> freeze and display Tied
  if (player1Won == true) {
    textSize(20);
    fill(RED);
    text("Player 1 Won", 230, 300);
    noLoop()
  } else if (player2Won == true) {
    textSize(20);
    fill(RED);
    text("Player 2 Won", 230, 300);
    noLoop()
  } else if (tied == true) {
    textSize(20);
    fill(RED);
    text("Tie", 280, 300);
    noLoop()
  }
}

