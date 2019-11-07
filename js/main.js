
const canv=document.getElementById("canvas"); 
const $score=document.getElementById("score");
const $overlay=document.getElementById("game-overlay"); 
const $h1=document.querySelector("h1");
const ctx=canv.getContext('2d');
const W=ctx.canvas.width; 
const H=ctx.canvas.height; 
const gravity = 0.13;  // gravity 
const eggTypes=["normal", "silver","gold"]

let eggs=[]; 
let mushs=[];
let mushSpeed=100; 
let gameOver; 
let score=0;
var platforms=[]; 
var superJumpActivated=true; 



function renderGround() {
  for (let i=0; i<7;i++) {
    ctx.drawImage(ground,0,0,128,128,0+i*100,H-50,100,50); 
  }
}

function renderTrees(){
  ctx.drawImage(tree,0,0,282,301,100,H-250,200*282/301,200);
}

// HANDLE INPUT 


document.onkeydown = function (e) {

  console.log('keydown');
  if (!dino) return;
  
  if(e.keyCode===39){ dino.rightKeyPressed=true;}
  if(e.keyCode===37){ dino.leftKeyPressed=true;}
  if(e.keyCode==32){dino.jumpKey=true;}
  if(e.keyCode==38 && superJumpActivated){dino.superJump=true;}
}

document.onkeyup = function (e) {

  if (!dino) return;
  
  if(e.keyCode===39){ dino.rightKeyPressed=false;} 
  if(e.keyCode===37){ dino.leftKeyPressed=false;}
  if(e.keyCode==32){dino.jumpKey=false; }
  
}

function draw() {
  ctx.drawImage(preload.getResult("background"),0,0,700,550)
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
}


//HANDLE GAME LOOP 

let raf;
let lastTime;
let startTime; 
let gameTime; 
let frames=0; 

// let deltaAttack= [5,4,3,2,1]; 

function animLoop(){
  
  ctx.clearRect(0,0,W,H); 
  frames++; 
  var now = Date.now();
  var dt = (now - lastTime) / 1000.0;
  gameTime=(now-startTime)/1000.0; 

  if(frames%200===0) {
    mushs.push(new Mushroom(mushSpeed)); 
  }
  dino.checkOverPlatform(platforms);
  if(dino.overPlatform) {
    dino.adjustGround(dino.overPlatform);
  }
  // platforms.forEach(platform=>dino.adjustGround(platform));
  dino.update();
  dino.moveLeft(dt);
  dino.moveRight(dt);
  draw();
  

  mushs.forEach(function(el){
    el.update(dt);
    el.jump(); 
    if(el.collision(dino)){gameOver=true;}
  })
  
  eggs.slice().forEach(function(egg,i){
    if(egg.eatenByDino(dino)){
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
    endGame();
  }
  
};

let intervalId; 
// let attackersId;

function startGame() {
  button.blur();
  
  if (raf) {
    cancelAnimationFrame(raf);
  }
  lastTime = Date.now();
  startTime=Date.now(); 


  
   intervalId=setInterval(function(){
    eggs.push(new Egg("normal")); 
    },4000);

  platforms.push(new Platform(10,330,0, "normal",1));
  platforms.push(new Platform(200,250,0, "normal",1));
  platforms.push(new Platform(380,300,1, "silver",1));
  platforms.push(new Platform(500,140,0, "gold",1));
  // attackersId=setInterval(function(){mushs.push(new Mushroom(mushSpeed))},4000);
  raf = requestAnimationFrame(animLoop);
}

const $instructions=document.querySelector(".instructions");

button.onclick=()=> {
  console.log('action declared')
  $overlay.style.display="none";
  $instructions.style.display="none"; 
  canv.style.display="block";
  reset();
  startGame();
}


function reset() {
  dino=new Dino();
  gameOver = false;
  mushs=[];
  eggs=[]; 
  score=0; 
}

function endGame(){
  clearInterval(intervalId); 
  // clearInterval(attackersId)
  cancelAnimationFrame(raf);
  $overlay.style.backgroundImage="url('images/dead.png')";
  $overlay.style.display="block";
  $instructions.style.display="block";
  $h1.innerHTML="Game Over...";
  button.innerHTML="Start Again";
  canv.style.display="none";

}
