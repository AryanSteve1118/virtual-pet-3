//Create variables here
var dog ,dogImg,happyDog,hdImg;
var foodStock;
var database;
var foodS;
function preload()
{
  //load images here
  dogImg = loadImage("images/Dog.png")
  happyDog = loadImage("images/happydog.png")
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250,300,20,20);
  dog.addImage(dogImg)
  dog.scale=0.3
  foodStock = database.ref('Food');
   foodStock.on("value",readStock)
}


function draw() {  
  background(46,139,87)
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(happyDog)
  }
  drawSprites();
  //add styles here
  textSize(18)
  fill("white")
  text("Note: press UP_ARROW key to feed Drago milk!",70,70)
  fill("white")
  text("Food Remaining: "+foodS,180,200)
}
function readStock(data){
  foodS=data.val();
  console.log(foodS)
}
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1
  }
  console.log("x: "+x)
  database.ref('/').update({
    Food:x
  })
}


