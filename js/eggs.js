class Egg {


  constructor(eggType){
     
    this.h=30; 
    this.x=random(0,W-this.h); 
    this.y=H-50-this.h - random(0,400); 
    this.eggType=eggType;
    this.time=Date.now(); 
    
    switch(this.eggType){
      case "normal": 
        this.img=preload.getResult("dinoegg");
        break; 
      
      case "silver": 
        this.img=preload.getResult("dinoeggSilver");
        break; 
      
      case "gold":
        this.img=preload.getResult("dinoeggGold");
        break; 

    }

  
  }

  draw() { 
    if (this.y<0){
      this.y=0;
    }
    if (!this.img) return; 
    ctx.drawImage(this.img,this.x,this.y,this.h,this.h);
    ctx.strokeRect(this.x,this.y,this.w,this.h);
  }
  
  eatenByDino(dino){
    if (!this.img||!dino.img) return false; 
    if((this.y+this.h/2>=dino.y)&&(this.y<=dino.y+dino.h)&&(this.x>=dino.x)&&(this.x<=dino.x+dino.w-25)){
      return true;
    }

  } 
  
}