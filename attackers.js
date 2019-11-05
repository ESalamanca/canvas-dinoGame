class Mushroom {

  constructor(dx){

    this.img = preload.getResult("mush");
    this.h=30; 
    this.w=this.h*this.img.naturalWidth/this.img.naturalHeight;
    this.left=Math.floor(Math.random()*2);  
    this.left? this.x=0: this.x=W-this.h;   
    this.y=H-50-this.h; 
    this.dx=dx;
    this.dy=0; 
    this.jumpPower=-2;
    this.jumpAction=false;
    this.onGround=true; 
    this.ground=H-50-this.h;
    this.isActive=true;    


}

  update(dt) {
    if(this.left){this.x+=this.dx*dt; 
    } else {
      this.x -=this.dx*dt; 
    }

    if(this.x>W||this.x<0) { this.isActive=false; }
    
  }

  draw() {
    if (!this.img||!this.isActive) return; 
    ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
    // ctx.strokeRect(this.x,this.y,this.w,this.h);
  }

  //test if collision with Dino 
  collision(dino){
    if (!this.img||!dino.img) return false; 
    if(!((this.y>(dino.y+dino.h))||(!this.left&&((this.x>=dino.x+dino.w-25)||(this.x<=dino.x+25)))||(this.left&&((this.x<=dino.x+25)||(this.x>=dino.x+dino.w-25))))){
      if(dino.shield) {
        setTimeout(()=>{dino.shield=false},1000); 
        return false; 
      }
      return true;
    }
  }

  jump(){
    if (this.jumpAction && this.onGround && this.isActive) { 
      this.dy = this.jumpPower;
      this.jumpAction=false; 
    }
    
    this.dy += gravity;
    this.y += this.dy;

    //test if on ground : 
    if (this.y >= this.ground) {
      this.y = this.ground;
      this.dy = 0;
      this.onGround = true;
    } else {
      this.onGround = false;
    }
    
  }

}

