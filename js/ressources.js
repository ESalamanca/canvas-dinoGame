// FILE TO HANDLE THE LOADING OF THE IMAGES - PRELOADJS LIBRARY AND COMMON FUNCTIONS 

const preload=new createjs.LoadQueue(false);
const $load=document.getElementById("loading"); 
const button=document.getElementById("start"); 
 
let dino;
var ground;
var tree; 
var platformC;
var platformL;
var platformR;
var dinoShield;


function loadImages() {
    preload.loadFile({id:"dino", src:"./images/dino.png", type:createjs.Types.IMAGE});
    preload.loadFile({id:"background", src:"./images/background.png", type:createjs.Types.IMAGE});
    preload.loadFile({id:"dinoShield", src:"./images/dinoShield.png", type:createjs.Types.IMAGE});
    preload.loadFile({id:"spritesheet", src:"./images/spritesheet.png", type:createjs.Types.IMAGE});
    preload.loadFile({id:"dinoLeft", src:"./images/dinoLeft.png", type:createjs.Types.IMAGE});
    preload.loadFile({id:"spritesheetL", src:"./images/spritesheetL.png", type:createjs.Types.IMAGE});
    preload.loadFile({id:"dinoegg", src:"./images/dinoegg.png", type:createjs.Types.IMAGE});
    preload.loadFile({id:"dinoeggGold", src:"./images/dinoeggGold.png", type:createjs.Types.IMAGE});
    preload.loadFile({id:"dinoeggSilver", src:"./images/dinoeggSilver.png", type:createjs.Types.IMAGE});
    preload.loadFile({id:"dead", src:"./images/dead.png",type:createjs.Types.IMAGE});
    preload.loadFile({id:"tree", src:"./images/tree.png",type:createjs.Types.IMAGE});
    preload.loadFile({id:"mush", src:"./images/mush.png",type:createjs.Types.IMAGE});
    preload.loadFile({id:"birdR", src:"./images/spritesheetBird.png", type:createjs.Types.IMAGE});
    preload.loadFile({id:"birdL", src:"./images/spritesheetBirdL.png", type:createjs.Types.IMAGE});
    preload.loadFile({id:"ground", src:"./images/ground.png",type:createjs.Types.IMAGE});
    preload.loadFile({id:"idle", src:"./images/Idle.png",type:createjs.Types.IMAGE});
    preload.loadFile({id:"platformC", src:"./images/platformC.png",type:createjs.Types.IMAGE});
    preload.loadFile({id:"platformR", src:"./images/platformR.png",type:createjs.Types.IMAGE});
    preload.loadFile({id:"platformL", src:"./images/platformL.png",type:createjs.Types.IMAGE});
    preload.loadFile({id:"volumeOn", src:"./images/volumeOn.png",type:createjs.Types.IMAGE});
    preload.loadFile({id:"volumeOn", src:"./images/volumeOff.png",type:createjs.Types.IMAGE});
  }

  
  window.onload= () =>{
    loadImages();
  } 

  preload.on("complete", handleComplete, this);
  

 function handleComplete(){
    $load.style.display="none";
    button.style.display="block";
    dino= new Dino();
    ground = preload.getResult("ground"); 
    tree= preload.getResult("tree");
    platformC=preload.getResult("platformC");
    platformL=preload.getResult("platformL");
    platformR=preload.getResult("platformR");
    dinoShield= preload.getResult("dinoShield");
  }

//HELPER FUNCTIONS 

function random(from, to) {
  return Math.floor(from + Math.random()*(to - from));
}

  