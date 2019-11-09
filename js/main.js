
const canv=document.getElementById("canvas"); 
const $score=document.getElementById("score");
const $overlay=document.getElementById("game-overlay"); 
const $eggSound=document.getElementById("eggSound");
const $h1=document.querySelector("h1");
const ctx=canv.getContext('2d');
const W=ctx.canvas.width; 
const H=ctx.canvas.height; 
const gravity = 0.2;  // gravity 
const eggTypes=["normal", "silver","gold"];
let startPlatforms;

let translate=1; 
let eggs=[]; 
let mushs=[];
let mushSpeed=100; 
let gameOver; 
let score=0;
var platforms=[]; 
var birds=[];




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
}

document.onkeyup = function (e) {

  if (!dino) return;
  
  if(e.keyCode===39){ dino.rightKeyPressed=false;} 
  if(e.keyCode===37){ dino.leftKeyPressed=false;}
  if(e.keyCode==32){dino.jumpKey=false; }
  
}

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

  if(frames%300===0){
    if(eggs.length<5){
      let eggT="normal";
    
        if (score%5===0) {
          eggs.filter(el=> el.eggType==="silver").length>0?  eggT="normal": eggT= "silver"; 
        }
        if (score%6===0 && Math.floor(Math.random()*4)===3){
          eggs.filter(el=>el.eggType==="gold").length>0?     eggT="silver":eggT= "gold"; 
        }
        eggs.push(new Egg(eggT));
    }
  }

  if (frames%500===0){
    let randomSide=Math.floor(Math.random()*2); 
    randomSide? birds.push(new Bird(random(W/2, W),0,random(60,90),0.15,randomSide)):birds.push(new Bird(random(0, W/2),0,random(60,90),0.15,randomSide)); 
    
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
  
  birds.forEach(el=>{
    el.update(dt);
    if(el.collision(dino)){
      gameOver=true;
      };
  });


  mushs.forEach(function(el){
    el.update(dt);
    el.jump(); 
    if(el.collision(dino)){
      gameOver=true;
    }
  })

//Delete eggs that are eaten or that are present for more than 10s 
  eggs.slice().forEach(function(egg,i){
    if(egg.eatenByDino(dino)){
      $eggSound.play();
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
    setTimeout(endGame,500);
    //to delete for game over 
    //raf= requestAnimationFrame(animLoop)
  }
  
};

// let attackersId;

function startGame() {
  button.blur();
  startPlatforms=[new Platform(530,160,0, "gold",1),new Platform(350,260,1, "silver",1),new Platform(200,300,0, "normal",1),new Platform(30,400,0, "normal",1)];
  
  if (raf) {
    cancelAnimationFrame(raf);
  }
  lastTime = Date.now();
  startTime=Date.now(); 
  platforms=startPlatforms; 
  birds.push(new Bird(W,0,70,0.15,1));

 
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
  birds=[];
  eggs=[]; 
  platforms=startPlatforms;
  score=0; 
  gameTime=0; 
  frames=0; 
}

function endGame(){
  //clearInterval(intervalId); 
  // clearInterval(attackersId)
  cancelAnimationFrame(raf);
  $overlay.style.backgroundImage="url('images/dead.png')";
  $overlay.style.display="block";
  $instructions.style.display="block";
  $h1.innerHTML="Game Over...";
  button.innerHTML="Start Again";
  canv.style.display="none";

}





function updatePlatform(){

  eggs.forEach(egg=>{
    egg.x -=200; 
  }); 

  platforms.forEach(platform=>{
    platform.x -=200; 
  })

  addPlatform(platforms);

}

function addPlatform(platforms){
  let tab= [1,-1];
  let length=platforms.length; 
  let lastPlatform=platforms[length-1]; 
  let randomHeight; 

  if (150<lastPlatform.y<400) {
    randomHeight= lastPlatform.y + tab[Math.floor(Math.random()*2)]*random(80,110); 
  } else if (lastPlatform.y <150) {
    randomHeight= lastPlatform.y + random(80,110);
  } else if (lastPlatform.y>400) {
    randomHeight= lastPlatform.y - random(80,110);
  }

  platforms.push(new Platform(lastPlatform.x + random(0,150),randomHeight,Math.floor(Math.random()*3),eggTypes[Math.floor(Math.random()*3)],1))
}