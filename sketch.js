//Create variables here
var dog ,dogImg,happyDog,hdImg,sadDog;
var foodStock;
var database;
var foodS;
var addFood,feed
var foodObj;
var lastFed;
var gameState,changingGameStates,readingGameStates
var bedroom,garden,washroom
function preload()
{
  //load images here
  dogImg = loadImage("images/Dog.png")
  happyDog = loadImage("images/happydog.png")
  bedroom = loadImage("images/Bed Room.png")
  garden = loadImage("images/Garden.png")
  washroom = loadImage("images/Wash Room.png")
  
}

function setup() {
	createCanvas(1600, 700);
  database = firebase.database();
  readingGameStates = database.ref('gameState')
  readingGameStates.on("value",function(data){
    gameState=data.val
  })
  dog = createSprite(1350,300,20,20);
  dog.addImage(dogImg)
  dog.scale=0.3
  foodStock = database.ref('Food');
  foodStock.on("value",readStock)
  addFood = createButton("add")
  addFood.position(800,50);
  addFood.mousePressed(addFoods)

  feed=createButton("feed")
  feed.position(700,50)
  feed.mousePressed(feedDog)

  foodObj = new Food()
}


function draw() {  
  currentTime = hour();
  if(currentTime==(lastFed+1)){
    update("playing");
    foodObj.garden();
  }else if(currentTime==(lastFed+2)){
    update("sleeping");
    foodObj.bedroom();
  }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("bathing");
    foodObj.washroom()
  }else{
    update("Hungry");
    foodObj.display();
  }
  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
    feed.show()
    addFood.show();
    dog.addImage("dog");
  }
  
  fedTime=database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  

  fill(255,255,254)
  textSize(15)
  if(lastFed>=12){
    text("last Feed : " + lastFed%12 + "pm",350,30)
  } else if(lastFed===0){
    text("last Feed : 12 AM",350,30);
  } else {
    text("lastFeed : "+ lastFed + "AM",350,30)
  }
  drawSprites();
  
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
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
function update(state){
  database.ref('/').update({
    gameState:state
  })
}

