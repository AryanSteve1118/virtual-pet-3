class Food{
    constructor(){
    
     this.milk = loadImage("images/Milk.png");
     this.foodStock = 0;
     this.lastFed;
  }
      getFoodStock(){
        return this.foodStock;
      }
      updateFoodStock(Stock){
    foodStock=Stock;
      }
      deductFood(){
        this.foodStock =this.foodStock-1
      }
      getFedTime(lastFed){
        this.lastFed=lastFed;
      }
      display(){
        var x=80,y=100;

        imageMode(CENTER);
        image(this.milk,720,220,70,70)
          if(this.foodStock!=0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10===0){
                   x=80;
                   y=y+50;
                }
                image(this.milk,x,y,50,50);
                x=x+30;
            }
        } 

        
      }
      bedroom(){
        background(bedroom,550,550);
      }
      garden(){
        background(garden,550,550)
      }
      washroom(){
        background(washroom,550,550)
      }
}
