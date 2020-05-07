function spawnHelper(quantity,name,mobs){
    switch(name){
        case 'slime':  
            for(let i = 0; i< quantity;i++){       //mob creation
                let randomx = Math.floor(Math.random()*windowWidth);
                let randomy = Math.floor(Math.random()*windowHeight);
                let slime = new Slime(windowWidth,windowHeight,randomx,randomy,blockSize);
                mobs.push(slime);
            }
            break;
    }
}

function spawnNextWave(number,mobs){
    // switch(number){
    //     case 1:
    //         spawnHelper(5,'slime',mobs)
    //         break;
    //     case 2: 
    //         //wave 2
    //         spawnHelper(20,'slime',mobs)
    //         break;
    //     case 3:
    //         //wave 3
    //         spawnHelper(40,'slime',mobs)
    //         break;
    //     case 4:
    //         //wave 4
    //         spawnHelper(60,'slime',mobs)
    //         break;
    // }
    spawnHelper(10*number,'slime',mobs)

}