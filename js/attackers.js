class Bird {

  constructor(x,y,dx,dy,side){

    this.img=preload.getResult("birdR");
    this.side=side;
    this.h=50; 
    this.w=this.h*(this.img.naturalWidth/2)/this.img.naturalHeight; 
    if(this.side){
      this.x=x-this.w;
    } else {
      this.img=preload.getResult("birdL");
      this.x=x;
    }
    
    this.x=x-this.w;
    this.y=y; 
    this.dx=dx; 
    this.dy=dy;
    this.frame=0;
    this.frames=[0,1]; 
    this.index=0;
    this.spriteSpeed=10; 
    this.ground=H-50-this.h;

    
  }

  update(dt){
  


    this.dy += gravity; //birdGravity is higher
    this.y += this.dy*dt;

    if (this.y >= this.ground) {
      this.y = this.ground;
      this.dy = 0;
    }

    if(this.side){
      this.x -= this.dx*dt;
    }else {
      this.x +=this.dx*dt; 
    }

    this.index +=this.spriteSpeed*dt; 
    this.frame=this.frames[Math.floor(this.index)%2];

  }

  draw() { 
    if (!this.img) return; // if `this.img` is not loaded yet => don't draw
    ctx.drawImage(this.img,this.frame*303,0,303,255,this.x,this.y,this.w,this.h);
  }

  collision(dino){
    if (!this.img||!dino.img) return false; 
    if((this.y+this.h/2>=dino.y)&&(this.y<=dino.y+dino.h)&&(this.x>=dino.x)&&(this.x<=dino.x+dino.w/2)){
      console.log("collision bird")
      if(dino.shield) {
        setTimeout(()=>{dino.shield=false},500); 
        return false; 
      }
      return true;
    }
  }


}







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
        setTimeout(()=>{dino.shield=false},500); 
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

