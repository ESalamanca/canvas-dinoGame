// FILE With some functions TO HANDLE DIFFICULTY 

function generatePlatforms(){
  let tab= [1,-1];
  let newPlatformSet=[]; 
  let numberPlatforms=3+ Math.floor(Math.random()*4); // between 2 and 5 platforms; 
 
  let firstX=random(40,500); 
  let firstY=random(H-50-110,H-50-70);
  newPlatformSet.push(new Platform(firstX,firstY,Math.floor(Math.random()*3),eggTypes[Math.floor(Math.random()*3)],1));

  let secondX; 
  firstX>W/2? secondX=firstX - random(100,200): secondX=firstX + random(100,200); 
  let secondY= firstY - random(90,110); 
  newPlatformSet.push(new Platform(secondX,secondY,Math.floor(Math.random()*3),eggTypes[Math.floor(Math.random()*3)],1));

  let lastX=firstX; 
  let lastY=firstY; 
  
  for(let i=2; i<numberPlatforms; i++ ){
    let x= lastX + tab[Math.floor(Math.random()*2)]*random(100,150); 
    let y= lastY - random(90,110); 
    lastX=x; 
    lastY=y; 
    newPlatformSet.push(new Platform(x,y,Math.floor(Math.random()*3),eggTypes[Math.floor(Math.random()*3)],1))
  }

  return newPlatformSet; 
}

function adjustLevel(frames,mushs,eggs,birds){
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
  
   
}
