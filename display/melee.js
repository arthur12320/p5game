function displayMelee(player){

    fill(155,155,155)

    // corner1angle = mouseangle(mouseY,mouseX)-(player.meleeWeapon.rangeangle/2);
    // corner4angle = mouseangle(mouseY,mouseX)+(player.meleeWeapon.rangeangle/2);
    // corner2angle = mouseangle(mouseY,mouseX)-(player.meleeWeapon.rangeangle/4);
    // corner3angle = mouseangle(mouseY,mouseX)+(player.meleeWeapon.rangeangle/4);

    let finish  = polarToCart(player.meleeWeapon.range/2+player.meleeWeapon.range/4,mouseangle(mouseY,mouseX));
    // let finish1 = polarToCart(player.meleeWeapon.range,corner1angle);
    // let finish2 = polarToCart(player.meleeWeapon.range,corner2angle);
    // let finish3 = polarToCart(player.meleeWeapon.range,corner3angle);
    // let finish4 = polarToCart(player.meleeWeapon.range,corner4angle);
    if(debugMode){
        strokeWeight(3);
        stroke(255,0,0);
        line(windowWidth/2,windowHeight/2,mouseX,mouseY)
        stroke(0,0,255);
        ellipse((windowWidth/2)+finish.x,(windowHeight/2)-finish.y,player.meleeWeapon.range/2,player.meleeWeapon.range/2)
        line(windowWidth/2,windowHeight/2,(windowWidth/2)+finish.x,(windowHeight/2)-finish.y)
    }
    
    if(player.meleeWeapon.cooldown){
        drawWeapon(mouseangle(mouseY,mouseX));
    }
    // line(windowWidth/2,windowHeight/2,(windowWidth/2)+finish1.x,(windowHeight/2)-finish1.y)
    // line(windowWidth/2,windowHeight/2,(windowWidth/2)+finish2.x,(windowHeight/2)-finish2.y)
    // line(windowWidth/2,windowHeight/2,(windowWidth/2)+finish3.x,(windowHeight/2)-finish3.y)
    // line(windowWidth/2,windowHeight/2,(windowWidth/2)+finish4.x,(windowHeight/2)-finish4.y)
    //curve((windowWidth/2)+finish1.x,(windowHeight/2)-finish1.y,(windowWidth/2)+finish2.x,(windowHeight/2)-finish2.y,(windowWidth/2)+finish3.x,(windowHeight/2)-finish3.y,(windowWidth/2)+finish4.x,(windowHeight/2)-finish4.y)

    stroke(0);
    strokeWeight(2);


}

function handleClickMelee(player){
    if(!player.meleeWeapon.cooldown){
        player.meleeWeapon.cooldown = true;
        mobs.forEach(element=>{
            element.checkMeleeHit(player);
            console.log('tested')
        })
        setTimeout(() => {
            let x = player.selectediventory
            player.inventory[x].cooldown = false;
        }, player.meleeWeapon.delay);
    }
}   

function drawWeapon(angle){
    
        push();
        translate(windowWidth/2,windowHeight/2);
        imageMode(CENTER);
        angleMode(DEGREES)
        rotate(-angle+90);
        image(player.meleeWeapon.tile,0,-player.meleeWeapon.range/2,player.meleeWeapon.width,player.meleeWeapon.height);
        imageMode(CORNERS);
        pop()
    
}