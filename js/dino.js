class Dino {

  constructor(){
       
    this.imgR = preload.getResult("dino");
    this.spriteRight=preload.getResult("spritesheet");
    this.spriteLeft=preload.getResult("spritesheetL");
    this.imgL=preload.getResult("dinoLeft");
    this.img=this.imgR; 
    const dinoRatio = (this.spriteRight.naturalWidth/3)/this.img.naturalHeight;
    this.w=100;
    this.h=this.w/dinoRatio;
    this.x=W/2;
    this.ground=H-50-this.h; 
    this.y= this.ground;
    this.dx=200; //speed = pixels/seconds 
    this.dy=0;

    //Immunity to mushroom
    this.shield=false; 
    
    //Handles the movements and jumps 
    this.overPlatform; 
    this.onGround=true; 
    this.jumpPower=-4;
    this.jumpKey=false; 
    this.superJump=false; 
    this.rightKeyPressed=false; 
    this.leftKeyPressed=false; 

    //Handle of Sprite
    this.frames=[0,1,2]; 
    this.spriteSpeed=16; // frames/s 
    this.indexR=0; 
    this.indexL=0;
    this.frame=0; 
    this.sprite=this.spriteRight; 
  

    

  }

  draw() { 
    if (!this.img) return; // if `this.img` is not loaded yet => don't draw
      //ctx.drawImage(this.img,0,0,198,211, this.x, this.y, this.w, this.h);
      ctx.drawImage(this.sprite,this.frame*193,0,193,207,this.x,this.y,this.w,this.h);
    
  }

  moveLeft(dt){
    if(this.leftKeyPressed){
      this.img=this.imgL; 
      this.sprite=this.spriteLeft;
      this.indexL+=this.spriteSpeed*dt;
      this.indexR=0;
      this.frame=this.frames[Math.floor(this.indexL)%3];

      if((this.x-this.dx*dt)>0) { this.x -= this.dx*dt; }

      }
    
//utiliser une condition de this.leftKeyPressed; 
  }

  moveRight(dt){
    if(this.rightKeyPressed){
      this.img=this.imgR; 
      this.sprite=this.spriteRight;
      this.indexR+=this.spriteSpeed*dt;
      this.frame=this.frames[Math.floor(this.indexR)%3];
      this.indexL=0; 

      if((this.x+this.dx*dt)<W-this.w) { 
        this.x += this.dx*dt;
      }
      
    }
    

  }

  // take the jump 
  update(){ 

    if (this.jumpKey && this.onGround) { this.dy = this.jumpPower};
    if (this.jumpKey && this.onGround && this.superJump){
      this.dy = this.dy -2.8; 
      this.superJump=false;
    }
    this.dy += gravity;
    this.y += this.dy;

    if(this.y<0){
      this.dy=0;
      this.y=0; 
    }
    //test if on ground : 
    if (this.y >= this.ground) {
      this.y = this.ground;
      this.dy = 0;
      this.onGround = true;
    } else {
      this.onGround = false;
    }


    
  }

  adjustGround(platform){
    if(platform.active){
      if(((this.x+this.w/2)>platform.x) && (this.x+this.w/2<platform.x+platform.totalWidth)&& (this.y+this.h<=platform.y+5)){
        this.ground=platform.y-this.h;
      } else if ((this.x+this.w/2<platform.x)||(this.x+this.w/2>platform.x + platform.totalWidth)) {
        
        this.ground= H-50-this.h;
  
      }
    } else {
      this.ground= H-50-this.h;
    }  
    

  }

  checkOverPlatform(platforms){
    platforms.forEach(platform=>{
      if(((this.x+this.w/2)>platform.x) && (this.x+this.w/2<platform.x+platform.totalWidth)&& (this.y+this.h<=platform.y+5)){
        this.overPlatform=platform; 
      }

  });

}

}