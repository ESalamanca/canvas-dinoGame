class Dino {

  constructor(){
       
    this.imgR = preload.getResult("dino");
    this.imgL=preload.getResult("dinoLeft");
    this.img=this.imgR; 
    const dinoRatio = this.imgR.naturalWidth/this.img.naturalHeight;
    this.w=100;
    this.h=this.w/dinoRatio;
    this.x=W/2;
    this.ground=H-50-this.h; 
    this.y= this.ground;
    this.dx=200; //speed = pixels/seconds 
    this.dy=0;  
    this.sprite=0; 
    this.onGround=true; 
    this.jumpPower=-4;
    this.jumpKey=false; 
    this.rightKeyPressed=false; 
    this.leftKeyPressed=false; 
  

    

  }

  draw() { 
    if (!this.img) return; // if `this.img` is not loaded yet => don't draw
      ctx.drawImage(this.img,0,0,198,211, this.x, this.y, this.w, this.h);
    
    // ctx.strokeRect(this.x,this.y,this.w,this.h)
  }

  moveLeft(dt){
    if(this.leftKeyPressed){
      this.img=this.imgL; 
      if((this.x-this.dx*dt)>0) { this.x -= this.dx*dt; }
      }
//utiliser une condition de this.leftKeyPressed; 
  }

  moveRight(dt){
    if(this.rightKeyPressed){
      this.img=this.imgR; 
      if((this.x+this.dx*dt)<W-this.w) { 
        this.x += this.dx*dt;
      }
    }
    

  }

  // take the jump 
  update(){
    if (this.jumpKey && this.onGround) { this.dy = this.jumpPower};
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