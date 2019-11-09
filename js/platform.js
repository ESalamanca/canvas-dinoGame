class Platform {

  constructor(x,y,width,eggType,eggP){
    this.x=x; 
    this.y=y;
    this.width=width; 
    this.eggPos=eggP;
    this.egg=new Egg(eggType);
    this.egg.x=this.x+(this.eggPos+1)*50/2; 
    this.egg.y=this.y-this.egg.h*4;
    eggs.push(this.egg);
    
    this.active=true; 
    this.totalWidth=50*(this.width+2);
    this.h=30; 
  }

  draw(){

    if(this.active){
      if(translate){
        ctx.drawImage(platformL,this.x,this.y,50,this.h);
     
      if(this.width!=0){
        for (let i=0; i<this.width; i++){
        ctx.drawImage(platformC,this.x+(i+1)*50,this.y,50,this.h);
        }
      }
      ctx.drawImage(platformR,this.x+(this.width+1)*50,this.y,50,this.h); 
      }
      
    }

  }

}