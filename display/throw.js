function displayThrow(player){
    let weapon = player.inventory[player.selectediventory];
    fill(55,60);
    ellipse(windowWidth/2,windowHeight/2,weapon.range,weapon.range);

    let mousePos = createVector(mouseX,mouseY);
    let centerPos = createVector(windowWidth/2,windowHeight/2);

    let dist = mousePos.dist(centerPos);

    let blockX = Math.floor(mouseXToRealX(mouseX)/blockSize);
    let blockY = Math.floor(mouseYToRealY(mouseY)/blockSize);

    // console.log(blockX);
    // console.log(blockY);

    if(dist <= weapon.range/2){
        fill(0,255,0);
    }else{
        fill(255,0,0);
    }
    ellipse(mouseX,mouseY,10,10)



}