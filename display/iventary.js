let holding = false;
let holdingObject = null;
let selectedindex = null;
function inventaryShow(ww,wh,player){
    textAlign(LEFT)
    fill(25,25,25);
    rect(0,0,ww,wh);
    textSize(30);
    fill(255)
    noStroke();
    text('inventory:',15,30);
    textSize(20);
    text(`player: ${player.name}`,15,60)
    text(`gold: ${player.gold}`,15,90)


    

    //draw hot bar
    fill(255);
    text('HotBar:',15,120);
    for(let i = 0; i < player.maxHotBar;i++){
        fill(155, 155, 155);
        rect(50+ 90*i,150,70,70);
        if(typeof player.inventory[i] != 'undefined'){
            image(player.inventory[i].groundTile,50+90*i,150,70,70);
            if (typeof player.inventory[i].quantity != 'undefined') {
                textAlign(LEFT);
                noStroke();
                fill(255);
                textSize(20);
                text(player.inventory[i].quantity, 50 + (i * 92),215)
            }
        }
        
    }

    //draw inventory
    fill(255);
    text('inventory:',15,270);
    for(let i = player.maxHotBar; i < player.maxinventory;i++){
        fill(155, 155, 155);
        rect(50+ 90*(i%10),300+((Math.floor(i/10)-1)*90),70,70);
        if(typeof player.inventory[i] != 'undefined'){
            image(player.inventory[i].groundTile,50+90*(i%10),300+((Math.floor(i/10)-1)*90),70,70);
            if (typeof player.inventory[i].quantity != 'undefined') {
                textAlign(LEFT);
                noStroke();
                fill(255);
                textSize(20);
                text(player.inventory[i].quantity, 50 + (i * 92),300+(Math.floor(i/10)*90))
            }
        }
        
    }


    //outline hot bar
    
    for(let i = 0; i < player.maxHotBar;i++){
        if(mouseX >= 50+ 90*i && mouseX <=  120+ 90*i){
            if(mouseY >= 150 && mouseY <= 220){
                stroke(255,0,0);
                strokeWeight(4);
                noFill();
                rect(50+ 90*i,150,70,70);
            } 
        }
    }

    strokeWeight();
    //outline inventory
    
    for(let i = player.maxHotBar; i < player.maxinventory;i++){
        if(mouseX >= 50+ 90*(i%10) && mouseX <=  120+ 90*(i%10)){
            if(mouseY >= 300+((Math.floor(i/10)-1)*90) && mouseY <= 370+((Math.floor(i/10)-1)*90)){
                stroke(255,0,0);
                strokeWeight(4);
                noFill();
                rect(50+ 90*(i%10),300+((Math.floor(i/10)-1)*90),70,70);
            }
        }
    }

    // draw holding item
    if(holdingObject){
        rectMode(CENTER)
        imageMode(CENTER)
        fill(155,155,155);
        rect(mouseX,mouseY,70,70)
        image(holdingObject.groundTile,mouseX,mouseY,70,70)
        rectMode(CORNER)
        imageMode(CORNER)
    }



    stroke(25, 25, 25);
}

function handleClickInventary(){
    //check click hot bar
    text('HotBar:',15,120);
    for(let i = 0; i < player.maxHotBar;i++){
        if(mouseX >= 50+ 90*i && mouseX <=  120+ 90*i){
            if(mouseY >= 150 && mouseY <= 220){
                holdingObject = player.inventory[i];
                selectedindex = i;
            } 
        }
    }

    strokeWeight();
    //check click inventory
    fill(255);
    text('inventory:',15,250);
    for(let i = player.maxHotBar; i < player.maxinventory;i++){
        if(mouseX >= 50+ 90*(i%10) && mouseX <=  120+ 90*(i%10)){
            if(mouseY >= 300+((Math.floor(i/10)-1)*90) && mouseY <= 370+((Math.floor(i/10)-1)*90)){   
                holdingObject = player.inventory[i];
                selectedindex = i;
            }
        }
    }
}

function handleReleaseInventary(){
    //check click hot bar
    text('HotBar:',15,120);
    for(let i = 0; i < player.maxHotBar;i++){
        if(mouseX >= 50+ 90*i && mouseX <=  120+ 90*i){
            if(mouseY >= 150 && mouseY <= 220){
                if(holdingObject){
                    let obj1 = player.inventory[i];
                    player.inventory[i] = holdingObject;
                    player.inventory[selectedindex] = obj1;
                    
                }
            }
        }
    }

    strokeWeight();
    //check click inventory
    fill(255);
    text('inventory:',15,250);
    for(let i = player.maxHotBar; i < player.maxinventory;i++){
        if(mouseX >= 50+ 90*(i%10) && mouseX <=  120+ 90*(i%10)){
            if(mouseY >= 300+((Math.floor(i/10)-1)*90) && mouseY <= 370+((Math.floor(i/10)-1)*90)){
                if(holdingObject){
                    let obj1 = player.inventory[i];
                    player.inventory[i] = holdingObject;
                    player.inventory[selectedindex] = obj1;
                    
                }
            }
        }
    }
    selectedindex = null;
    holdingObject = null
}