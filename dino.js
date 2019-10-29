class Dino {

  constructor(){
    const dinoImg = document.createElement('img');
    
    dinoImg.onload = () => {
   
    this.img = dinoImg;
      const dinoRatio = dinoImg.naturalWidth/dinoImg.naturalHeight;
      this.w=100;
      this.h=this.w/dinoRatio;
      this.x=W/2;
      this.ground=H-70-this.h; 
      this.y= this.ground;
      this.dx=2;
      this.dy=0;
      
    }
    this.rightKeyPressed=false; 
    this.leftKeyPressed=false; 
  
    dinoImg.src = "images/dino.png";
    

  }

  draw() { 
    if (!this.img) return; // if `this.img` is not loaded yet => don't draw
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }

  moveLeft(){
    if(this.leftKeyPressed){
    if((this.x-this.dx)>0) { this.x -= this.dx; }
    }
//utiliser une condition de this.leftKeyPressed; 
  }

  moveRight(){
    if(this.rightKeyPressed){
      if((this.x+this.dx)>0) { this.x += this.dx; }
    }
    

  }

  jump(){
    if(this.jumpKey){ // utiliser une variable ascending 
      this.speedY=
      } else {
      this.ascend=false;};  
    }
    if(this.jumpKey&&!this.ascend){
      if(this.y>this.ground){
        this.y++;
      } else {this.jumpKey=false;}
    } 
  }


}