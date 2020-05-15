let buttonHover = false;
function displayControllsPage(){
    textAlign(LEFT);
    background(100);
    textSize(32);
    
    text('Controlls:',10,36)


    //wasd
    textAlign(CENTER);
    textSize(20);
    fill(240);
    rect(80, 60, 60, 60, 20);
    fill(0);
    text('W',110,97)
    fill(240);
    rect(80, 130, 60, 60, 20);
    fill(0);
    text('S',110,167)
    fill(240);
    rect(10, 130, 60, 60, 20);
    fill(0);
    text('A',40,167)
    fill(240);
    rect(150, 130, 60, 60, 20);
    fill(0);
    text('D',180,167)

    textAlign(LEFT);
    text('use WASD to move',240,140)

    // shift
    textAlign(CENTER);
    textSize(20);
    
    fill(240);
    rect(10, 240, 90, 60, 20);
    fill(0);
    text('SHIFT',55,277)
    
    textAlign(LEFT);
    
    text('use SHIFT to sprint',150,277)

    // 1..0
    textAlign(CENTER);
    textSize(20);
    fill(240);
    rect(10, 350, 60, 60, 20);
    fill(0);
    text('1',40,387)
    fill(240);
    rect(80, 350, 60, 60, 20);
    fill(0);
    text('...',110,387)
    fill(240);
    rect(150, 350, 60, 60, 20);
    fill(0);
    text('0',180,387);
    textAlign(LEFT);
    
    text('use 1,2,3,4,5,6,7,8,9,0 to select itens in your hotbar',250,387)

    // f
    textAlign(CENTER);
    textSize(20);
    fill(240);
    rect(10, 460, 60, 60, 20);
    fill(0);
    text('F',40,497)
    
    textAlign(LEFT);
    
    text('use F to pickup itens',120,497)

    // q
    textAlign(CENTER);
    textSize(20);
    fill(240);
    rect(10, 570, 60, 60, 20);
    fill(0);
    text('Q',40,607)
    
    textAlign(LEFT);
    
    text('use Q to throw away itens',120,607)

    // e
    textAlign(CENTER);
    textSize(20);
    fill(240);
    rect(10, 680, 60, 60, 20);
    fill(0);
    text('E',40,717)
    
    textAlign(LEFT);
    
    text('use E to open inventory',120,717)


    //mouse 

    fill(240);
    rect(600, 500, 120, 200, 20);
    strokeWeight(4)
    line(660,500,660,570)
    line(600,570,720,570)
    fill(0);
    
    
    textAlign(LEFT);
    
    text('use the mouse to aim',750,600)

    //exit button
    textAlign(CENTER);
    textSize(20);
    if(buttonHover){
        fill(0,255,0);
    }else{
        fill(240);
    }
    rect(850, 720, 120, 60, 20);
    fill(0);
    text('OK!',910,757)


    if(mouseX >= 850 && mouseX <=970 && mouseY >= 720 && mouseY <= 780){
        buttonHover=true;
    }else{
        buttonHover=false;
    }
    
}

function handleClickControllsPage(){
    if(mouseX >= 850 && mouseX <=970 && mouseY >= 720 && mouseY <= 780){
        player.displayMode = 'walking'
    }
}   