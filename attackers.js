class Attacker {

  constructor(){
    this.radius=15; 
    this.left=Math.floor(Math.random()*2);  
    this.left? this.x=0: this.x=W-this.radius/2;   
    this.y=H-70-this.radius; 
    this.dx=2; 
    this.collision=false; 
    
  }

  update() {
    if(this.left){this.x+=this.dx; 
    } else {
      this.x -=this.dx; 
    }
  }

  draw() {
    ctx.beginPath(); 
    ctx.arc(this.x,this.y,this.radius,0, Math.PI*2); 
    ctx.closePath();
    ctx.fill();
  }

}