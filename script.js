let playerIsDead = false;
let enemyIsDead = false;
let gameOver = false;
let winnerMessage = "";

const keysDown = {};

function loadImage(src, callback) {
  const img = new Image();
  img.onload = () => {
    console.log("Loaded:", src);
    callback();
  };
  img.onerror = () => {
    console.error("Failed to load:", src);
    callback();
  };
  img.src = src;
  return img;
}

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const player = { x: 50, y: 0, width: 50, height: 80, health: 100 };
const enemy = { x: 50, y: 0, width: 50, height: 80, health: 100 };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  player.y = canvas.height;
  enemy.y = canvas.height;
  if (!gameOver) {
    enemy.x = 0; 
    if (playerStandImages.length > 0) {
      player.x = canvas.width - playerStandImages[0].width * scaleFactor;
    } else {
      player.x = canvas.width - 50;
    }
  }
}
window.addEventListener("resize", resizeCanvas);

const playerStandImages = [];
const scaleFactor = 3.5;
let currentFrameIndex = 0;
let animationTimer = 0;

resizeCanvas();

function gameLoop(time) {
  const deltaTime = time - lastTime;
  lastTime = time;
  update(deltaTime);
  render();
  requestAnimationFrame(gameLoop);
}

let lastTime = 0;

function loadImage(src, callback) {
  const img = new Image();
  img.onload = () => { 
    console.log("Loaded:", src);
    callback(); 
  };
  img.onerror = () => { 
    console.error("Failed to load:", src);
    callback();
  };
  img.src = src;
  return img;
}


function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  player.y = canvas.height;
  enemy.y = canvas.height;
  if (!gameOver) {
    enemy.x = 0;
    if (playerStandImages.length > 0) {
      player.x = canvas.width - playerStandImages[0].width * scaleFactor;
    } else {
      player.x = canvas.width - 50;
    }
  }
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let totalAssets = 100;
let loadedAssets = 0;
function assetLoaded() {
  loadedAssets++;
  console.log(`Asset loaded: ${loadedAssets}/${totalAssets}`);
  if (loadedAssets === totalAssets) {
    console.log("All assets loaded, starting game loop.");
    requestAnimationFrame(gameLoop);
  }
}


// === Load Player2 Assets (for our player, i.e. Player 2) ===
for (let i = 1; i <= 6; i++) {
  const img = loadImage(`./assets/player2/stand${i}.png`, assetLoaded);
  playerStandImages.push(img);
}
const playerSprintImages = [];
for (let i = 1; i <= 7; i++) {
  const img = loadImage(`./assets/player2/sprint${i}.png`, assetLoaded);
  playerSprintImages.push(img);
}
const playerRollImages = [];
for (let i = 1; i <= 6; i++) {
  const img = loadImage(`./assets/player2/roll${i}.png`, assetLoaded);
  playerRollImages.push(img);
}
const playerJumpImages = [];
for (let i = 1; i <= 7; i++) {
  const img = loadImage(`./assets/player2/jump${i}.png`, assetLoaded);
  playerJumpImages.push(img);
}
const playerSpecialImages = [];
for (let i = 1; i <= 6; i++) {
  const img = loadImage(`./assets/player2/special${i}.png`, assetLoaded);
  playerSpecialImages.push(img);
}
const playerSpecialHeavyImages = [];
for (let i = 1; i <= 8; i++) {
  const img = loadImage(`./assets/player2/specialh${i}.png`, assetLoaded);
  playerSpecialHeavyImages.push(img);
}
const playerWinImages = [];
for (let i = 1; i <= 5; i++) {
  const img = loadImage(`./assets/player2/win${i}.png`, assetLoaded);
  playerWinImages.push(img);
}
const playerLoseImages = [];
for (let i = 1; i <= 5; i++) {
  const img = loadImage(`./assets/player2/lose${i}.png`, assetLoaded);
  playerLoseImages.push(img);
}

// === Load Enemy Assets (from ./assets/player1, i.e. Player 1) ===
const enemyStandImages = [];
for (let i = 1; i <= 5; i++) {
  const img = loadImage(`./assets/player1/stand${i}.png`, assetLoaded);
  enemyStandImages.push(img);
}
const enemySprintImages = [];
for (let i = 1; i <= 7; i++) {
  const img = loadImage(`./assets/player1/sprint${i}.png`, assetLoaded);
  enemySprintImages.push(img);
}
const enemyRollImages = [];
for (let i = 1; i <= 8; i++) {
  const img = loadImage(`./assets/player1/roll${i}.png`, assetLoaded);
  enemyRollImages.push(img);
}
const enemyJumpImages = [];
for (let i = 1; i <= 6; i++) {
  const img = loadImage(`./assets/player1/jump${i}.png`, assetLoaded);
  enemyJumpImages.push(img);
  console.log("Enemy jump loop iteration", i);
}
const enemySpecialImages = [];
for (let i = 1; i <= 5; i++) {
  const img = loadImage(`./assets/player1/special${i}.png`, assetLoaded);
  enemySpecialImages.push(img);
  console.log("Enemy special loop iteration", i);
}
const enemySpecialHeavyImages = [];
for (let i = 1; i <= 5; i++) {
  const img = loadImage(`./assets/player1/specialh${i}.png`, assetLoaded);
  enemySpecialHeavyImages.push(img);
  console.log("Enemy specialh loop iteration", i);
}
const enemyWinImages = [];
for (let i = 1; i <= 5; i++) {
  const img = loadImage(`./assets/player1/win${i}.png`, assetLoaded);
  enemyWinImages.push(img);
}
const enemyLoseImages = [];
for (let i = 1; i <= 5; i++) {
  const img = loadImage(`./assets/player1/lose${i}.png`, assetLoaded);
  enemyLoseImages.push(img);
}
const standFrameDuration = 100;   
const sprintFrameDuration = 80;   
const rollFrameDuration = 100;    
const jumpFrameDuration = 100;    
const specialFrameDuration = 100;     
const specialHeavyFrameDuration = 100;  
let isMoving = false;
let isRolling = false;
let isJumping = false;
let isSpecial = false;
let isSpecialHeavy = false;

function getJumpOffset() {
  const numJumpFrames = playerJumpImages.length; 
  const totalJumpDuration = jumpFrameDuration * numJumpFrames; 
  const jumpTime = currentFrameIndex * jumpFrameDuration + animationTimer;
  const t = Math.min(jumpTime / totalJumpDuration, 1);
  const jumpHeight = 200; 
  return 4 * jumpHeight * t * (1 - t);
}

function updateAnimation(deltaTime) {
  let frames, frameDuration;

  if (playerIsDead) {
    frames = playerLoseImages;
    frameDuration = standFrameDuration;
    animationTimer += deltaTime;
    if (animationTimer >= frameDuration) {
      animationTimer = 0;
      if (currentFrameIndex < frames.length - 1) {
        currentFrameIndex++;
      } else {
        currentFrameIndex = frames.length - 1;
      }
    }
  }
  else if (enemyIsDead) {
    frames = playerWinImages;
    frameDuration = standFrameDuration;
    animationTimer += deltaTime;
    if (animationTimer >= frameDuration) {
      animationTimer = 0;
      currentFrameIndex = (currentFrameIndex + 1) % frames.length;
    }
  }
  else if (isSpecial) {
    frames = playerSpecialImages;
    frameDuration = specialFrameDuration;
    animationTimer += deltaTime;
    if (animationTimer >= frameDuration) {
      animationTimer = 0;
      if (currentFrameIndex < frames.length - 1) {
        currentFrameIndex++;
      } else {
        isSpecial = false;
        currentFrameIndex = 0;
      }
    }
  } else if (isSpecialHeavy) {
    frames = playerSpecialHeavyImages;
    frameDuration = specialHeavyFrameDuration;
    animationTimer += deltaTime;
    if (animationTimer >= frameDuration) {
      animationTimer = 0;
      if (currentFrameIndex < frames.length - 1) {
        currentFrameIndex++;
      } else {
        isSpecialHeavy = false;
        currentFrameIndex = 0;
      }
    }
  } else if (isRolling) {
    frames = playerRollImages;
    frameDuration = rollFrameDuration;
    animationTimer += deltaTime;
    if (animationTimer >= frameDuration) {
      animationTimer = 0;
      if (currentFrameIndex < frames.length - 1) {
        currentFrameIndex++;
      } else {
        isRolling = false;
        currentFrameIndex = 0;
      }
    }
  } else if (isJumping) {
    frames = playerJumpImages;
    frameDuration = jumpFrameDuration;
    animationTimer += deltaTime;
    if (animationTimer >= frameDuration) {
      animationTimer = 0;
      if (currentFrameIndex < frames.length - 1) {
        currentFrameIndex++;
      } else {
        isJumping = false;
        currentFrameIndex = 0;
      }
    }
  } else if (isMoving) {
    frames = playerSprintImages;
    frameDuration = sprintFrameDuration;
    animationTimer += deltaTime;
    if (animationTimer >= frameDuration) {
      animationTimer = 0;
      currentFrameIndex = (currentFrameIndex + 1) % frames.length;
    }
  } else {
    frames = playerStandImages;
    frameDuration = standFrameDuration;
    animationTimer += deltaTime;
    if (animationTimer >= frameDuration) {
      animationTimer = 0;
      currentFrameIndex = (currentFrameIndex + 1) % frames.length;
    }
  }
}

function drawPlayer() {
  let frames;
  if (gameOver) {
    frames = playerIsDead ? playerLoseImages : playerWinImages;
  } else {
    if (isSpecial) {
      frames = playerSpecialImages;
    } else if (isSpecialHeavy) {
      frames = playerSpecialHeavyImages;
    } else if (isRolling) {
      frames = playerRollImages;
    } else if (isJumping) {
      frames = playerJumpImages;
    } else if (isMoving) {
      frames = playerSprintImages;
    } else {
      frames = playerStandImages;
    }
  }
  
  if (!frames || frames.length === 0) return;
  if (currentFrameIndex >= frames.length) currentFrameIndex = 0;
  
  const img = frames[currentFrameIndex];
  const destWidth = img.width * scaleFactor;
  const destHeight = img.height * scaleFactor;
  const destX = player.x;
  let destY = canvas.height - destHeight;
  if (isJumping && !gameOver) {
    destY -= getJumpOffset();
  }
  ctx.drawImage(img, destX, destY, destWidth, destHeight);
}

const enemyScaleFactor = 2.8;
let enemyCurrentFrameIndex = 0;
let enemyAnimationTimer = 0;
const enemyStandFrameDuration = 100;  
const enemySprintFrameDuration = 80; 
const enemyRollFrameDuration = 80;   
const enemyJumpFrameDuration = 100;
const enemySpecialFrameDuration = 100;
const enemySpecialHeavyFrameDuration = 100;
let enemyIsMoving = false;
let enemyIsRolling = false;
let enemyIsJumping = false;
let enemyIsSpecial = false;
let enemyIsSpecialHeavy = false;

function getEnemyJumpOffset() {
  const numJumpFrames = enemyJumpImages.length;
  const totalJumpDuration = enemyJumpFrameDuration * numJumpFrames;
  const jumpTime = enemyCurrentFrameIndex * enemyJumpFrameDuration + enemyAnimationTimer;
  const t = Math.min(jumpTime / totalJumpDuration, 1);
  const jumpHeight = 200; 
  return 4 * jumpHeight * t * (1 - t);
}

function updateEnemyAnimation(deltaTime) {
  let frames, frameDuration;
  
  if (enemyIsDead) {
    frames = enemyLoseImages;  
    frameDuration = enemyStandFrameDuration;
    enemyAnimationTimer += deltaTime;
    if (enemyAnimationTimer >= frameDuration) {
      enemyAnimationTimer = 0;
      if (enemyCurrentFrameIndex < frames.length - 1) {
        enemyCurrentFrameIndex++;
      } else {
        enemyCurrentFrameIndex = frames.length - 1;
      }
    }
  } else if (playerIsDead) {
    frames = enemyWinImages;  
    frameDuration = enemyStandFrameDuration;
    enemyAnimationTimer += deltaTime;
    if (enemyAnimationTimer >= frameDuration) {
      enemyAnimationTimer = 0;
      enemyCurrentFrameIndex = (enemyCurrentFrameIndex + 1) % frames.length;
    }
  } else if (enemyIsSpecial) {
    frames = enemySpecialImages;
    frameDuration = enemySpecialFrameDuration;
    enemyAnimationTimer += deltaTime;
    if (enemyAnimationTimer >= frameDuration) {
      enemyAnimationTimer = 0;
      if (enemyCurrentFrameIndex < frames.length - 1) {
        enemyCurrentFrameIndex++;
      } else {
        enemyIsSpecial = false;
        enemyCurrentFrameIndex = 0;
      }
    }
  } else if (enemyIsSpecialHeavy) {
    frames = enemySpecialHeavyImages;
    frameDuration = enemySpecialHeavyFrameDuration;
    enemyAnimationTimer += deltaTime;
    if (enemyAnimationTimer >= frameDuration) {
      enemyAnimationTimer = 0;
      if (enemyCurrentFrameIndex < frames.length - 1) {
        enemyCurrentFrameIndex++;
      } else {
        enemyIsSpecialHeavy = false;
        enemyCurrentFrameIndex = 0;
      }
    }
  } else if (enemyIsRolling) {
    frames = enemyRollImages;
    frameDuration = enemyRollFrameDuration;
    enemyAnimationTimer += deltaTime;
    if (enemyAnimationTimer >= frameDuration) {
      enemyAnimationTimer = 0;
      if (enemyCurrentFrameIndex < frames.length - 1) {
        enemyCurrentFrameIndex++;
      } else {
        enemyIsRolling = false;
        enemyCurrentFrameIndex = 0;
      }
    }
  } else if (enemyIsJumping) {
    frames = enemyJumpImages;
    frameDuration = enemyJumpFrameDuration;
    enemyAnimationTimer += deltaTime;
    if (enemyAnimationTimer >= frameDuration) {
      enemyAnimationTimer = 0;
      if (enemyCurrentFrameIndex < frames.length - 1) {
        enemyCurrentFrameIndex++;
      } else {
        enemyIsJumping = false;
        enemyCurrentFrameIndex = 0;
      }
    }
  } else if (enemyIsMoving) {
    frames = enemySprintImages;
    frameDuration = enemySprintFrameDuration;
    enemyAnimationTimer += deltaTime;
    if (enemyAnimationTimer >= frameDuration) {
      enemyAnimationTimer = 0;
      enemyCurrentFrameIndex = (enemyCurrentFrameIndex + 1) % frames.length;
    }
  } else {
    frames = enemyStandImages;
    frameDuration = enemyStandFrameDuration;
    enemyAnimationTimer += deltaTime;
    if (enemyAnimationTimer >= frameDuration) {
      enemyAnimationTimer = 0;
      enemyCurrentFrameIndex = (enemyCurrentFrameIndex + 1) % frames.length;
    }
  }
}

function drawEnemy() {
  let frames;
  if (gameOver) {
    frames = enemyIsDead ? enemyLoseImages : enemyWinImages;
  } else {
    if (enemyIsSpecial) {
      frames = enemySpecialImages;
    } else if (enemyIsSpecialHeavy) {
      frames = enemySpecialHeavyImages;
    } else if (enemyIsRolling) {
      frames = enemyRollImages;
    } else if (enemyIsJumping) {
      frames = enemyJumpImages;
    } else if (enemyIsMoving) {
      frames = enemySprintImages;
    } else {
      frames = enemyStandImages;
    }
  }
  
  if (!frames || frames.length === 0) return;
  if (enemyCurrentFrameIndex >= frames.length) enemyCurrentFrameIndex = 0;
  
  const img = frames[enemyCurrentFrameIndex];
  const destWidth = img.width * enemyScaleFactor;
  const destHeight = img.height * enemyScaleFactor;
  const destX = enemy.x;
  let destY = canvas.height - destHeight;
  
  if (enemyIsJumping && !gameOver) {
    destY -= getEnemyJumpOffset();
  }
  
  ctx.drawImage(img, destX, destY, destWidth, destHeight);
}

function checkCollision(a, b) {
  const margin = 70;
  return (
    (a.x - margin) < (b.x + b.width + margin) &&
    (a.x + a.width + margin) > (b.x - margin) &&
    (a.y - margin) < (b.y + b.height + margin) &&
    (a.y + a.height + margin) > (b.y - margin)
  );
}


let playerAttackDealt = false;
let enemyAttackDealt = false;
const moveSpeed = 1; 
const enemyMoveSpeed = 1; 

function update(deltaTime) {
  if (gameOver) {
    updateAnimation(deltaTime);
    updateEnemyAnimation(deltaTime);
    return;
  }

  isMoving = keysDown["ArrowRight"] || keysDown["ArrowLeft"];
  if (keysDown["ArrowRight"]) {
    player.x += moveSpeed * deltaTime;
  }
  if (keysDown["ArrowLeft"]) {
    player.x -= moveSpeed * deltaTime;
  }
  if (playerStandImages.length > 0) {
    const playerWidth = playerStandImages[0].width * scaleFactor;
    if (player.x < 0) player.x = 0;
    if (player.x > canvas.width - playerWidth) player.x = canvas.width - playerWidth;
  }
  updateAnimation(deltaTime);
  
  enemyIsMoving = keysDown["a"] || keysDown["A"] || keysDown["d"] || keysDown["D"];
  if (keysDown["a"] || keysDown["A"]) {
    enemy.x -= enemyMoveSpeed * deltaTime;
  }
  if (keysDown["d"] || keysDown["D"]) {
    enemy.x += enemyMoveSpeed * deltaTime;
  }
  if (enemyStandImages.length > 0) {
    const enemyWidth = enemyStandImages[0].width * enemyScaleFactor;
    if (enemy.x < 0) enemy.x = 0;
    if (enemy.x > canvas.width - enemyWidth) enemy.x = canvas.width - enemyWidth;
  }
  updateEnemyAnimation(deltaTime);
  
  if (player.health <= 0) {
    player.health = 0;
    playerIsDead = true;
    gameOver = true;
    winnerMessage = "Player 1 WINS"; 
    isSpecial = isSpecialHeavy = isRolling = isJumping = false;
  }
  if (enemy.health <= 0) {
    enemy.health = 0;
    enemyIsDead = true;
    gameOver = true;
    winnerMessage = "Player 2 WINS"; 
    enemyIsSpecial = enemyIsSpecialHeavy = enemyIsRolling = enemyIsJumping = false;
  }

  if (checkCollision(player, enemy)) {
    if (!playerAttackDealt) {
      if (isJumping) {
        enemy.health -= 10;
        playerAttackDealt = true;
      } else if (isSpecial) {
        enemy.health -= 20;
        playerAttackDealt = true;
      } else if (isSpecialHeavy) {
        enemy.health -= 25;
        playerAttackDealt = true;
      }
    }
    if (!enemyAttackDealt) {
      if (enemyIsJumping) {
        player.health -= 10;
        enemyAttackDealt = true;
      } else if (enemyIsSpecial) {
        player.health -= 20;
        enemyAttackDealt = true;
      } else if (enemyIsSpecialHeavy) {
        player.health -= 25;
        enemyAttackDealt = true;
      }
    }
  }
  
  if (!isJumping && !isSpecial && !isSpecialHeavy && !isRolling) {
    playerAttackDealt = false;
  }
  if (!enemyIsJumping && !enemyIsSpecial && !enemyIsSpecialHeavy && !enemyIsRolling) {
    enemyAttackDealt = false;
  }
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawEnemy();
  drawHealthBars();
  
  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = '60px "Honk", serif';
    ctx.textAlign = "center";
    ctx.fillText(winnerMessage, canvas.width / 2, canvas.height / 2);
    restartButton.style.display = "block";
  } else {
    restartButton.style.display = "none";
  }
}

window.addEventListener("keydown", function(e) {
  if (gameOver) return;
  keysDown[e.key] = true;
  
  if (e.key === "ArrowDown" && !isRolling && !isJumping && !isSpecial && !isSpecialHeavy) {
    isRolling = true;
    currentFrameIndex = 0;
    animationTimer = 0;
  }
  if (e.key === "ArrowUp" && !isJumping && !isRolling && !isSpecial && !isSpecialHeavy) {
    isJumping = true;
    currentFrameIndex = 0;
    animationTimer = 0;
  }
  if (e.code === "ControlRight" && !isSpecial && !isSpecialHeavy && !isRolling && !isJumping) {
    isSpecial = true;
    currentFrameIndex = 0;
    animationTimer = 0;
  }
  if (e.code === "ShiftRight" && !isSpecial && !isSpecialHeavy && !isRolling && !isJumping) {
    isSpecialHeavy = true;
    currentFrameIndex = 0;
    animationTimer = 0;
  }
  
  if ((e.key === "s" || e.key === "S") && !enemyIsRolling && !enemyIsJumping && !enemyIsSpecial && !enemyIsSpecialHeavy) {
    enemyIsRolling = true;
    enemyCurrentFrameIndex = 0;
    enemyAnimationTimer = 0;
  }
  if ((e.key === "w" || e.key === "W") && !enemyIsJumping && !enemyIsRolling && !enemyIsSpecial && !enemyIsSpecialHeavy) {
    enemyIsJumping = true;
    enemyCurrentFrameIndex = 0;
    enemyAnimationTimer = 0;
  }
  if ((e.key === "q" || e.key === "Q") && !enemyIsSpecial && !enemyIsSpecialHeavy && !enemyIsRolling && !enemyIsJumping) {
    enemyIsSpecial = true;
    enemyCurrentFrameIndex = 0;
    enemyAnimationTimer = 0;
  }
  if ((e.key === "e" || e.key === "E") && !enemyIsSpecial && !enemyIsSpecialHeavy && !enemyIsRolling && !enemyIsJumping) {
    enemyIsSpecialHeavy = true;
    enemyCurrentFrameIndex = 0;
    enemyAnimationTimer = 0;
  }
  
  if (e.key.startsWith("Arrow")) {
    e.preventDefault();
  }
});

window.addEventListener("keyup", function(e) {
  keysDown[e.key] = false;
});

const player1HPBorder = loadImage("./assets/hpbar/player1HPBorder.png", assetLoaded);
const player1HPBar    = loadImage("./assets/hpbar/player1HPBar.png", assetLoaded);
const player2HPBorder = loadImage("./assets/hpbar/player2HPBorder.png", assetLoaded);
const player2HPBar    = loadImage("./assets/hpbar/player2HPBar.png", assetLoaded);

function drawHealthBars() {
  const padding = 5;       
  const verticalOffset = 50; 
  const scale = 0.5;       

  const p1BorderWidth = player1HPBorder.width * scale;
  const p1BorderHeight = player1HPBorder.height * scale;
  
  ctx.drawImage(player1HPBorder, padding, padding - verticalOffset, p1BorderWidth, p1BorderHeight);
  
  const p1HealthRatio = enemy.health / 100;
  const fullP1BarWidth = player1HPBar.width * scale;
  const clippedP1BarWidth = fullP1BarWidth * p1HealthRatio;
  
  ctx.drawImage(
    player1HPBar,
    0, 0, player1HPBar.width * p1HealthRatio, player1HPBar.height,  
    padding, padding - verticalOffset, clippedP1BarWidth, player1HPBar.height * scale 
  );
  
  const p2BorderWidth = player2HPBorder.width * scale;
  const p2BorderHeight = player2HPBorder.height * scale;
  const p2X = canvas.width - p2BorderWidth - padding;
  
  ctx.drawImage(player2HPBorder, p2X, padding - verticalOffset, p2BorderWidth, p2BorderHeight);
  
  const p2HealthRatio = player.health / 100;
  const fullP2BarWidth = player2HPBar.width * scale;
  const clippedP2BarWidth = fullP2BarWidth * p2HealthRatio;
  const fillX = p2X + (fullP2BarWidth - clippedP2BarWidth);

ctx.drawImage(
  player2HPBar,
  player2HPBar.width * (1 - p2HealthRatio), 0,        
  player2HPBar.width * p2HealthRatio, player2HPBar.height,      
  fillX, padding - verticalOffset,                             
  clippedP2BarWidth, player2HPBar.height * scale                 
);
}

window.addEventListener("keyup", function(e) {
  keysDown[e.key] = false;
});

let restartButton = document.createElement("button");
restartButton.innerText = "Restart Game";
restartButton.className = "restart-button";  
restartButton.style.display = "none";  
document.body.appendChild(restartButton);
restartButton.addEventListener("click", resetGame);

function resetGame() {
  gameOver = false;
  playerIsDead = false;
  enemyIsDead = false;
  player.health = 100;
  enemy.health = 100;
  winnerMessage = "";
  currentFrameIndex = 0;
  enemyCurrentFrameIndex = 0;
  enemy.x = 0; 
  if (playerStandImages.length > 0) {
    player.x = canvas.width - playerStandImages[0].width * scaleFactor;
  } else {
    player.x = canvas.width - 50;
  }
  restartButton.style.display = "none";
}
