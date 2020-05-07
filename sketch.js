//display variables 
let windowHeight = 800;    //always mantain 10/8 and pair numbers
let windowWidth = 1000;
let blockSize = 100;

let debugMode = false;


//global variables 
let player;
let world;
let mobs = [];
let pickups = [];
let gameover = false;


//message board 
let displayMessage = false;
let messageToDisplay = 'testando recebeu 20 gold'


//images 
let itens = []; //0=grass,1=wood,2=woodwall,3=door, 4 = slime


//wave based game
let waveNumber = 1;
let waveCooldown = false;

function preload() {
    itens = loadItens();
}

function setup(){
    createCanvas(windowWidth, windowHeight);
   
    world = new World(blockSize,pickups);
    player = new Player(windowWidth,windowHeight,blockSize,world);

    spawnNextWave(waveNumber,mobs);
    console.log(mobs);
   
}

function draw(){
    background(0);
    if(gameover){
        gameOver(); 
    }else{


    let blockX;
    let blockY;
    let blocks;
    switch(player.displayMode){
        case 'walking':
            player.move();
            handleCollisions();
            displayWalking();
            if(debugMode){
                debugDisplay();
            }
            diplayItenBar()
            break;
        case 'melee':
            player.move();
            handleCollisions();
            displayWalking();
            displayMelee(player);
            if(debugMode){
                debugDisplay();
            }
            diplayItenBar()
            break;
        case 'iventary':
            player.move();
             displayInventary();
             if(debugMode){
                    debugDisplay();
            }
             break;
        default:
            textSize(40);
            text('nothing to show',20,20)
    }

    checkWaveEnd(mobs);

    if(displayMessage){
        messageDisplay()
    }
    //console.log(mouseX)
    //noloop()
}
}


function handleCollisions(){
    blockX = posToBlockX(player.x );    //player collision to blocks 
    blockY = posToBlockY(player.y );
    blocks = world.getSurround(blockX,blockY);
    player.colide(blocks);

    player.intersectMob(mobs);

    mobs.forEach(mob=>{         // mobs collision
        mobblockX = posToBlockX(mob.x );
        mobblockY = posToBlockY(mob.y );

        blocks = world.getSurround(mobblockX,mobblockY);
        mob.colide(blocks);
    })
    world.garbageCollection();
}

function mousePressed(){
    switch(player.displayMode){
        case 'place':
            handleClickWalking(player);
            break;
        case 'melee':
            handleClickMelee(player);
            break;
        default:
            console.log('mouse clicked');
    }
}

function displayWalking(){
    displayEnviroment(windowWidth,windowWidth,blockSize,player.x,player.y,world);
    player.display();
    mobs.forEach((element,i)=>{
        element.display();
        element.move();
    })
    removeMobs();
}


function displayInventary(){
    
    inventaryShow(windowWidth,windowHeight,player)
}


function diplayItenBar(){
    for(let i =0;i<player.maxinventory;i++){
        strokeWeight(3);
        fill(155,155,155);
        rect((i*50),windowHeight-80,50,50);
    }

    player.inventory.forEach((item,index)=>{
        image(item.tile,25+(index*50)-(((item.width*50)/blockSize)/2),windowHeight-55-(((item.height*50)/blockSize)/2),(item.width*50)/blockSize,(item.height*50)/blockSize);
        if(typeof item.quantity != 'undefined'){
            noStroke();
            fill(255);
            textSize(20);
            text(item.quantity,(index*50),windowHeight-34)
        }
    })

    noFill();
    stroke(255,0,0);
    rect((player.selectediventory*50),windowHeight-80,50,50);
}



function debugDisplay(){
    fill(155,155,155)
    let blockX = posToBlockX(player.x );
    let blockY = posToBlockY(player.y );
    let degree = mouseangle(mouseY,mouseX)
    //display cords:
    textSize(12);
    text(`x:${blockX}/y:${blockY}`,20,20)
    text(`display mode:${player.displayMode}`,20,34 )
    text(`degree:${degree}`,20,48 )

}

function removeMobs(){
    mobs.forEach((element,i)=>{
        if(Math.abs(player.x-element.x)>windowWidth){
            //mobs.splice(i,1);
        }else if(Math.abs(player.y-element.y)>windowHeight){
            //mobs.splice(i,1);
        }else if(element.remove){
            mobs.splice(i,1);
        }
    })
}

function gameOver(){
    background(0);
    fill(155,155,155)
    stroke(0)
    textSize(100);
    text('Game Over',200,400);
   
}

function messageDisplay(){
    strokeWeight(3)
    stroke(0)
    fill(155,155,155);
    rect(10,10,500,75);
    textSize(20);
    fill(0);
    noStroke()
    text(messageToDisplay,20,40)
}