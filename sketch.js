
let startLine = 30;
let finishLine = 400;

let numSnails = 3;
let snailPositions = [];
let snailSpeeds = [];
let shellColors = [];
let isRacing = false;

function setup() {
  createCanvas(500, 500);
  frameRate(10); 

  // Initialize snail starting positions, speeds, and assign random shell colors
  for (let i = 0; i < numSnails; i++) {
    snailPositions.push(startLine);
    snailSpeeds.push(random(1, 2)); 
    shellColors.push(color(random(100, 255), random(100, 255), random(100, 255)));
  }
}

function draw() {
  drawWoodBackground();

  // Draw start and finish lines
  fill(0);
  rect(startLine, 0, 5, height);
  fill(255, 0, 0);
  rect(finishLine, 0, 20, height);

  // If the race is ongoing, move snails
  if (isRacing) {
    moveSnails();
  } else {
    displayStartText();
  }

  drawSnails();
  checkWinner();
}

// wood-like background
function drawWoodBackground() {
  background(153, 101, 21);  

  for (let i = 0; i < height; i += 20) {
    fill(139, 69, 19, 100); 
    rect(0, i, width, 10);   

      stroke(101, 67, 33);  
     strokeWeight(1);
      line(width, i, width, i + 20);

  }
}


function displayStartText() {
  textSize(24);
  textAlign(CENTER);
  fill(255);
  noStroke();
  text("🐌 Click to start the race!", width / 2, height / 2);
}


function drawSnail(x, y, shellColor) {
  // Draw shell
  fill(shellColor);
  stroke(0);
  strokeWeight(1);
  ellipse(x - 20, y, 40, 40);  

  // Draw upright body
  fill(173, 216, 230);
  noStroke();
  rect(x, y - 40, 20, 50);  

  // Draw eyes
  fill(0);
  ellipse(x + 8, y - 45, 6, 6); 
  ellipse(x - 8, y - 45, 6, 6); 
}


function drawSnails() {
  let padding = height / numSnails;
  for (let i = 0; i < numSnails; i++) {
    let y = (i + 0.5) * padding;
    drawSnail(snailPositions[i], y, shellColors[i]);
  }
}

// Start the race when the mouse is clicked
function mousePressed() {
  isRacing = true;
}

// to move each snails forward 
function moveSnails() {
  for (let i = 0; i < numSnails; i++) {
    snailPositions[i] += snailSpeeds[i];  
  }
}

// to check if any snail has won
function checkWinner() {
  for (let i = 0; i < snailPositions.length; i++) {
    if (snailPositions[i] >= finishLine) {
      textSize(24);
      textAlign(CENTER);
      fill(255);
      noStroke();
      text(`Snail ${i + 1} wins! 🐌`, width / 2, height / 2);
      noLoop();  
    }
  }
}
