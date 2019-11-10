//Declaring variables for the game 
const canv=document.getElementById("canvas"); 
const $score=document.getElementById("score");
const $overlay=document.getElementById("game-overlay"); 
const $eggSound=document.getElementById("eggSound");
const $gameSound=document.getElementById("gameSound");
const $gameOverSound=document.getElementById("gameOverSound");
const $mute=document.getElementById("mute");
const $h1=document.querySelector("h1");
const ctx=canv.getContext('2d');

const W=ctx.canvas.width; 
const H=ctx.canvas.height; 
const gravity = 0.2;  // gravity 
const eggTypes=["normal", "silver","gold"];

let startPlatforms;

let eggs=[]; 
let mushs=[];
let mushSpeed=100; 
let gameOver; 
let score=0;
var platforms=[]; 
var birds=[];

var sound=true; 

// A cross-browser requestAnimationFrame
requestAnimationFrame= window.requestAnimationFrame       ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame    ||
window.oRequestAnimationFrame      ||
window.msRequestAnimationFrame     ||
function(callback){
    window.setTimeout(callback, 1000 / 60);
};


// HANDLE INPUT 


document.onkeydown = function (e) {

  if (!dino) return;
  
  if(e.keyCode===39){ dino.rightKeyPressed=true;}
  if(e.keyCode===37){ dino.leftKeyPressed=true;}
  if(e.keyCode==32){dino.jumpKey=true;}
}

document.onkeyup = function (e) {

  if (!dino) return;
  
  if(e.keyCode===39){ dino.rightKeyPressed=false;} 
  if(e.keyCode===37){ dino.leftKeyPressed=false;}
  if(e.keyCode==32){dino.jumpKey=false; }
  
}

//Handle Canvas rendering 

function draw() {
  ctx.drawImage(preload.getResult("background"),0,0,700,550);
  renderGround();
  platforms.forEach(el=>el.draw()); 
  dino.draw();
  if(dino.shield){
    ctx.drawImage(dinoShield,0,0,50,50);
    ctx.font = '20px times';
    ctx.color="rgb(183, 212, 79)";
    ctx.fillText('Shield Activated', 55,30);
  }
  mushs.forEach(function(el){el.draw()});
  eggs.forEach(function(el){el.draw()});
  birds.forEach(el=>el.draw());
}


function renderGround() {
  for (let i=0; i<7;i++) {
    ctx.drawImage(ground,0,0,128,128,0+i*100,H-50,100,50); 
  }
}

function renderTrees(){
  ctx.drawImage(tree,0,0,282,301,100,H-250,200*282/301,200);
}

//HANDLE GAME LOOP 

let raf;
let lastTime;
let startTime; 
let gameTime;
let platformTimer;  
let platformTime; 
let frames=0; 


function animLoop(){
  
  ctx.clearRect(0,0,W,H); 
  frames++; 
  var now = Date.now();
  var dt = (now - lastTime) / 1000.0;
  gameTime=(now-startTime)/1000.0;
  platformTime= (now-platformTimer)/1000.0; 

  adjustLevel(frames,mushs,eggs,birds); 
  // if(frames%200===0) {
  //   mushs.push(new Mushroom(mushSpeed)); 
  // }

  // if(frames%300===0){
  //   if(eggs.length<5){
  //     let eggT="normal";
    
  //       if (score%5===0) {
  //         eggs.filter(el=> el.eggType==="silver").length>0?  eggT="normal": eggT= "silver"; 
  //       }
  //       if (score%6===0 && Math.floor(Math.random()*4)===3){
  //         eggs.filter(el=>el.eggType==="gold").length>0?     eggT="silver":eggT= "gold"; 
  //       }
  //       eggs.push(new Egg(eggT));
  //   }
  // }

  // if (frames%500===0){
  //   let randomSide=Math.floor(Math.random()*2); 
  //   randomSide? birds.push(new Bird(random(W/2, W),0,random(60,90),0.15,randomSide)):birds.push(new Bird(random(0, W/2),0,random(60,90),0.15,randomSide)); 
    
  // }

  if (platformTime>30 && score>10){
    platformTimer=Date.now();
    platforms=generatePlatforms();
  }

  dino.adjustGround(platforms); 
  dino.update();
  dino.moveLeft(dt);
  dino.moveRight(dt);
  draw();
  
  birds.forEach(el=>{
    el.update(dt);
    if(el.collision(dino)){
      gameOver=true;
      dino.alive=false; 
      };
  });


  mushs.forEach(function(el){
    el.update(dt);
    el.jump(); 
    if(el.collision(dino)){
      gameOver=true;
      dino.alive=false; 
    }
  })

//Delete eggs that are eaten or that are present for more than 10s 
  eggs.slice().forEach(function(egg,i){
    if(egg.eatenByDino(dino)){
      if(sound){$eggSound.play()};
      switch(egg.eggType){
        case "normal":
          score ++;
          break; 

        case "silver":
          score += 2;
          dino.shield=true; 
          break; 
        
        case "gold" :
          score +=5; 
          break; 
      }
      
      eggs.splice(i,1);
    } else if((Date.now()-egg.time)/1000>12){
      eggs.splice(i,1);

    }

  });


  $score.innerHTML = "Score " + score;
  lastTime = Date.now();
  
  //UPDATE DIFFICULTY 
  if(score>5){
    mushSpeed=150;
  }

  if (score>10){ 
    let activeMushs=mushs.filter(el=>el.isActive); 
    if(activeMushs){
      activeMushs[Math.floor(Math.random()*activeMushs.length)].jumpAction=true;
    } 
  }

  if(!gameOver) { 
    raf= requestAnimationFrame(animLoop);
  }

  if(gameOver){ 
    $gameSound.pause();
    if(sound){$gameOverSound.play()};
    raf=requestAnimationFrame(function(){draw()});
    setTimeout(endGame,1000);

  }
  
};


function startGame() {
  button.blur(); // to avoid startButton being pressed  
  startPlatforms=[new Platform(530,160,0, "gold",1),new Platform(330,260,1, "silver",1),new Platform(200,320,0, "normal",1),new Platform(30,400,0, "normal",1)];
  $eggSound.volume=0.3;
  $gameSound.loop=true;

  if (raf) {
    cancelAnimationFrame(raf);
  }
  lastTime = Date.now();
  startTime=Date.now(); 
  platformTimer=Date.now(); 
  platforms=startPlatforms; 
  birds.push(new Bird(W,0,70,0.15,1));
  if(sound) {$gameSound.play();}
 
  raf = requestAnimationFrame(animLoop);
}

const $instructions=document.querySelector(".instructions");

button.onclick=()=> {
  console.log('action declared')
  $overlay.style.display="none";
  $instructions.style.display="none"; 
  $mute.style.display="block";
  canv.style.display="block";
  reset();
  startGame();
}

//HANDLE of Sounds to mute and un mute 
$mute.onclick=()=>{
  if(sound){
    document.getElementById("mute-image").src="images/volumeOff.png";
    $gameSound.pause(); 
    sound=false;
  }else { 
    sound=true;
    $gameSound.play (); 
    document.getElementById("mute-image").src="images/volumeOn.png";
  }

  $mute.blur();

}

//Start new game - reset of all game parts
function reset() {
  dino=new Dino();
  gameOver = false;
  mushs=[];
  birds=[];
  eggs=[]; 
  platforms=startPlatforms;
  score=0; 
  gameTime=0; 
  frames=0; 
}

function endGame(){

  cancelAnimationFrame(raf);
  $overlay.style.backgroundImage="url('images/dead.png')";
  $overlay.style.display="block";
  $instructions.style.display="block";
  $mute.style.display="none";
  $h1.innerHTML="Game Over...";
  button.innerHTML="Start Again";
  canv.style.display="none";

}
