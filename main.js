
const canv=document.getElementById("canvas"); 
const $score=document.getElementById("score");
const ctx=canv.getContext('2d');
const W=ctx.canvas.width; 
const H=ctx.canvas.height; 
const gravity = 0.13;  // gravity 

let mush=new Mushroom(); 
let dino= new Dino(); 
let gameOver= false; 
let score= 0; 

// Draws Ground
var ground = new Image();
ground.onload = function() {
    renderGround();
};
ground.src = "images/ground.png";

//Draws Tree 
var tree=new Image();
tree.onload=function(){
  renderTrees(); 
};
tree.src="images/tree.png";

function renderGround() {
  for (let i=0; i<7;i++) {
    ctx.drawImage(ground,0,0,128,128,0+i*100,H-70,100,70); 
  }
}

function renderTrees(){
  ctx.drawImage(tree,0,0,282,301,100,H-270,200*282/301,200);
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
 

//HANDLE GAME LOOP 
const render = () => {
  
  ctx.clearRect(0,0,W,H); 
  renderTrees();
  renderGround();
  console.log("background drawn")
  dino.update();
  dino.draw();
  console.log("Dino Drawn")
  dino.moveLeft();
  dino.moveRight();
  mush.draw();
  console.log("mush drawn")
  mush.update();
  gameOver=mush.collision(dino);
  $score.innerHTML = "Score " + score;
  if(!gameOver) { 
  requestAnimationFrame(render);
  }
};

// const button=document.getElementById("start"); 
// button.onclick=()=> {
// canv.style.display="block";

// }

render()

//the Game loop 
// var lastTime;
// function main() {
//     var now = Date.now();
//     var dt = (now - lastTime) / 1000.0;

//     update(dt);

//     lastTime = now;
//     requestAnimationFrame(main);
// };