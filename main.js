
const canv=document.getElementById("canvas"); 
const $score=document.getElementById("score");
const $overlay=document.getElementById("game-overlay"); 
const $h1=document.querySelector("h1");
const ctx=canv.getContext('2d');
const W=ctx.canvas.width; 
const H=ctx.canvas.height; 
const gravity = 0.13;  // gravity 


let eggs=[]; 
let mushs=[];
let mushSpeed=100; 
let gameOver; 
let score=0; 



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
  
  if(e.keyCode===39){ dino.rightKeyPressed=true}; 
  if(e.keyCode===37){ dino.leftKeyPressed=true};
  if(e.keyCode==32){dino.jumpKey=true;}
}

document.onkeyup = function (e) {

  if (!dino) return;
  
  if(e.keyCode===39){ dino.rightKeyPressed=false}; 
  if(e.keyCode===37){ dino.leftKeyPressed=false};
  if(e.keyCode==32){dino.jumpKey=false; }
  
}

function draw() {
  renderTrees();
  renderGround();
  dino.draw();
  mushs.forEach(function(el){el.draw()});
  eggs.forEach(function(el){el.draw()}); 
}


//HANDLE GAME LOOP 

let raf;
let lastTime;
let startTime; 
let gameTime; 
// let deltaAttack= [5,4,3,2,1]; 

function animLoop(){
  
  ctx.clearRect(0,0,W,H); 

  var now = Date.now();
  var dt = (now - lastTime) / 1000.0;
  gameTime=(now-startTime)/1000.0; 

   
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
      score ++;
      eggs.splice(i,1);
    }
  });

  $score.innerHTML = "Score " + score;
  lastTime = Date.now();
  
  //UPDATE DIFFICULTY 
  if(score>5){mushSpeed=150;}
  if (score>10){ 
    let activeMushs=mushs.filter(el=>el.isActive); 
    activeMushs[Math.floor(Math.random()*activeMushs.length)].jumpAction=true; 
  }

  if(!gameOver) { 
    raf= requestAnimationFrame(animLoop);
  }

  if(gameOver){
    endGame();
  }
  
};

let intervalId; 
let attackersId;

function startGame() {
  button.blur();
  console.log(raf); 
  console.log('im in startGame loop')
  if (raf) {
    cancelAnimationFrame(raf);
  }
  lastTime = Date.now();
  startTime=Date.now(); 
  intervalId=setInterval(function(){
    eggs.push(new Egg()); 
    console.log("Egg created");
    },3000);
  
  attackersId=setInterval(function(){mushs.push(new Mushroom(mushSpeed))},4000);
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
  clearInterval(attackersId)
  cancelAnimationFrame(raf);
  $overlay.style.backgroundImage="url('images/dead.png')";
  $overlay.style.display="block";
  $instructions.style.display="block";
  $h1.innerHTML="Game Over...";
  button.innerHTML="Start Again";
  canv.style.display="none";

}
