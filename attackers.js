class Mushroom {

  constructor(){

  const mushImg = document.createElement('img');
    
  mushImg.onload = () => {
   
    this.img = mushImg;
    this.h=30; 
    this.w=this.h*mushImg.naturalWidth/mushImg.naturalHeight;
    this.left=Math.floor(Math.random()*2);  
    this.left? this.x=0: this.x=W-this.h;   
    this.y=H-50-this.h; 
    this.dx=2; 
  }

  mushImg.src = "images/mush.png";

}

  update() {
    if(this.left){this.x+=this.dx; 
    } else {
      this.x -=this.dx; 
    }
  }

  draw() {
    if (!this.img) return; 
    ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
    // ctx.strokeRect(this.x,this.y,this.w,this.h);
  }

  //test if collision with Dino 
  collision(dino){
    if (!this.img||!dino.img) return false; 
    if(!((this.y>(dino.y+dino.h))||(!this.left&&((this.x>=dino.x+dino.w-25)||(this.x<=dino.x+25)))||(this.left&&((this.x<=dino.x+25)||(this.x>=dino.x+dino.w-25))))){

      return true;
    }
  }

}

