class Dino {

  constructor(){
       
    this.img = preload.getResult("spritesheet");
    const dinoRatio = (this.img.naturalWidth/2)/this.img.naturalHeight;
    this.w=100;
    this.h=this.w/dinoRatio;
    this.x=W/2;
    this.ground=H-50-this.h; 
    this.y= this.ground;
    this.dx=2;
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
    if(!this.sprite){
      ctx.drawImage(this.img,0,0,198,211, this.x, this.y, this.w, this.h);
    } else {
      ctx.drawImage(this.img,198,0,198,211, this.x, this.y, this.w, this.h);
    } 
    
    // ctx.strokeRect(this.x,this.y,this.w,this.h)
  }

  moveLeft(){
    if(this.leftKeyPressed){
    if((this.x-this.dx)>0) { this.x -= this.dx; }
    }
//utiliser une condition de this.leftKeyPressed; 
  }

  moveRight(){
    if(this.rightKeyPressed){
      if((this.x+this.dx)<W-this.w) { 
        this.x += this.dx;
        this.sprite=(this.sprite+1)%2 }
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