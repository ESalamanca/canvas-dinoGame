const preload=new createjs.LoadQueue(false);
const $load=document.getElementById("loading"); 
const button=document.getElementById("start"); 
var trexSound;  
let dino;
var ground;
var tree; 

function loadImages() {
    preload.loadFile({id:"dino", src:"images/dino.png", type:createjs.Types.IMAGE});
    preload.loadFile({id:"spritesheet", src:"images/spritesheet.png", type:createjs.Types.IMAGE});
    preload.loadFile({id:"dinoLeft", src:"images/dinoLeft.png", type:createjs.Types.IMAGE});
    preload.loadFile({id:"spritesheetL", src:"images/spritesheetL.png", type:createjs.Types.IMAGE});
    preload.loadFile({id:"dinoegg", src:"images/dinoegg.png", type:createjs.Types.IMAGE});
    preload.loadFile({id:"dead", src:"images/dead.png",type:createjs.Types.IMAGE});
    preload.loadFile({id:"tree", src:"images/tree.png",type:createjs.Types.IMAGE});
    preload.loadFile({id:"mush", src:"images/mush.png",type:createjs.Types.IMAGE});
    preload.loadFile({id:"ground", src:"images/ground.png",type:createjs.Types.IMAGE});
    preload.loadFile({id:"idle", src:"images/Idle.png",type:createjs.Types.IMAGE});
  }



// function loadSound () {
//   createjs.Sound.registerSound("assets/trexd.wav", trexSound);
// }


  
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
  

  }

  