let worldStartX;
let worldStartY;
let blocksline;
let startx;

function displayEnviroment(ww,wh,blocksize,camx,camy,world){
    let blocksline = (ww / blocksize) +2
    let blockscoloumn = (wh / blocksize) +2;
    startx = -(camx%blocksize);    //where to start drawing x
    starty = -(camy%blocksize);
    
    worldStartX = camx - (ww/2);    //where in the mapx the block is located
    worldStartY = camy - (wh/2);    //where in the mapy the block is located

    

    for(let i = -1;i<=blocksline;i++){
        for(let j = -1;j<=blockscoloumn;j++){
            stroke(0);
            let posx = startx+(i*blocksize) ;
            let posy = starty+(j*blocksize) ;
            let x = Math.floor(((i*blocksize)+startx + worldStartX)/blocksize)
            let y = Math.floor(((j*blocksize)+starty+worldStartY)/blocksize)+1
            
            world.draw(posx,posy,blocksize,x,y)

            strokeWeight(0);
            c = color('hsla(255, 0, 0, 0.5)');
            fill(c); // Use updated 'c' as fill color
            ellipse(mouseX,mouseY,20,20)
            strokeWeight(2);
        }
    }


    


}


function mouseXtoblockX(posx){
    let x = Math.ceil(((posx+ worldStartX))/blockSize)-1
    return x
}

function mouseYtoblockY(posy){
    return y =  Math.ceil(((posy+ worldStartY))/blockSize)
}

function posToBlockX(posx){
    return x = Math.floor(posx /blockSize)
}

function posToBlockY(posy){
    return y = Math.floor(posy/blockSize)
}

function handleClickWalking(){
    let x = mouseXtoblockX(mouseX);
    let y = mouseYtoblockY(mouseY);

    let playerx = posToBlockX(player.x);
    let playery = posToBlockY(player.y)

    console.log('using')
    console.log(player.inventory)
    console.log(player.selectediventory)
    if(player.inventory[player.selectediventory].use != 'undefined'){
        player.inventory[player.selectediventory].use();
    }else{
        if(x !== playerx || y !== playery){
            console.log(`clicked at : x=${x} y=${y}`);  
            world.modblock(x,y);
        }else{
            console.log('cannot click on the block you are standing');
        }
    }
}

function handleInteractWalking(player){
    let x = mouseXtoblockX(mouseX);
    let y = mouseYtoblockY(mouseY);

    let playerx = posToBlockX(player.x);
    let playery = posToBlockY(player.y)

    // if(x !== playerx || y !== playery){
        console.log(`interacted at : x=${x} y=${y}`);  
        world.interactblock(x,y);
    // }
}