class Dino {

  constructor(){
      
    this.dead=preload.getResult("dead");
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
    this.dx=240; //speed = pixels/seconds 
    this.dy=0;
    this.alive=true;

    //Immunity to mushroom
    this.shield=false; 
    
    //Handles the movements and jumps 
    this.overPlatform; 
    this.onGround=true; 
    this.jumpPower=-6.5;
    this.jumpKey=false; 
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
    if(this.alive){ctx.drawImage(this.sprite,this.frame*193,0,193,207,this.x,this.y,this.w,this.h);}
    
    if(!this.alive) {
      this.h=80; 
      this.w=this.h*this.dead.naturalWidth/this.dead.naturalHeight;
      this.ground=H-50-this.h+5;
      ctx.drawImage(this.dead,this.x,this.ground,this.w,this.h);
    }
    
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
    this.dy += gravity;
    if(this.dy>7) {
      this.dy=7;
    }

    this.y += this.dy;

    if(this.y<-10){
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


  adjustGround(platforms){
    let closestPlatforms=platforms; 
    closestPlatforms = closestPlatforms.filter(platform => this.x + this.w/2 > platform.x && this.x+this.w/2 < platform.x + platform.totalWidth); // dino chevauche la plate-forme en horizontal
      // On ne garde que les plateformes au dessous (ie: tant que pas entierement traversé)
    closestPlatforms = closestPlatforms.filter(platform => this.y+this.h <= platform.y + 5);
      // On trie par de la plateforme la plus proche a la plus éloignée (de mario)
    closestPlatforms.sort((a, b) => Math.abs(this.y+this.h - a.y) - Math.abs(this.y+this.h - b.y));

    if (closestPlatforms[0] && this.dy > 0 && this.y+this.dy+this.h >= closestPlatforms[0].y) {
        this.ground = closestPlatforms[0].y - this.h;
      } else {
        this.ground=this.ground= H-50-this.h;
      }
  }

}