function World(blockSize,pickups){
    let blocksx = 20;
    let blocksy = 20;
    let lines = [];
    

    for(let i = 0;i < blocksx;i++){
        let col=[]
        for(let j =0;j<blocksy;j++){
            let block = {
                name:itens[0].name,
                tile:itens[0].tile,
                x: i*blockSize,
                y: j*blockSize,
                blockSize: blockSize,
                collide:itens[0].collide,
                interact:itens[0].interact,
                status: itens[0].status
            }
            col.push(block);
        }
        lines.push(col);
        console.log(`loading ${i}/${blocksx}`);
        
    }

    for(let i = 0;i < 1;i++){
        let randomx = Math.floor(Math.random()*blocksx);
        let randomy = Math.floor(Math.random()*blocksy);

        let pickup = {
            name:itens[5].name,
            tile:itens[5].tile,
            groundTile:itens[5].groundTile,
            x: randomx*blockSize,
            y: randomy*blockSize,
            blockx: randomx,
            blocky: randomy,
            blockSize: blockSize,
            remove:false,
            interact:itens[5].interact,
        }
        pickups.push(pickup);
    }

    // for(let i = 0;i < 1;i++){
    //     let randomx = Math.floor(Math.random()*blocksx);
    //     let randomy = Math.floor(Math.random()*blocksy);

    //     let pickup = {
    //         name:itens[6].name,
    //         tile:itens[6].tile,
    //         groundTile:itens[6].groundTile,
    //         x: randomx*blockSize,
    //         y: randomy*blockSize,
    //         blockx: randomx,
    //         blocky: randomy,
    //         blockSize: blockSize,
    //         remove:false,
    //         interact:itens[6].interact,
    //     }
    //     pickups.push(pickup);
    // }


    for(let i = 0;i < 5;i++){
        let randomx = Math.floor(Math.random()*blocksx);
        let randomy = Math.floor(Math.random()*blocksy);

        let pickup = {
            name:itens[7].name,
            tile:itens[7].tile,
            groundTile:itens[7].groundTile,
            x: randomx*blockSize,
            y: randomy*blockSize,
            blockx: randomx,
            blocky: randomy,
            blockSize: blockSize,
            remove:false,
            interact:itens[7].interact,
            quantity: 10
        }
        pickups.push(pickup);
    }

    for(let i = 0;i < 5;i++){
        let randomx = Math.floor(Math.random()*blocksx);
        let randomy = Math.floor(Math.random()*blocksy);

        let pickup = {
            ...itens[8],
            name:itens[8].name,
            tile:itens[8].tile,
            x: randomx*blockSize,
            y: randomy*blockSize,
            blockx: randomx,
            blocky: randomy,
            blockSize: blockSize,
            interact:itens[8].interact,
            use:itens[8].use,
            remove:false
        }
        pickups.push(pickup);
    }

    for(let i = 0;i < 5;i++){
        let randomx = Math.floor(Math.random()*blocksx);
        let randomy = Math.floor(Math.random()*blocksy);

        let pickup = {
            ...itens[9],
            x: randomx*blockSize,
            y: randomy*blockSize,
            blockx: randomx,
            blocky: randomy,
            blockSize: blockSize,
            remove:false
        }
        pickups.push(pickup);
    }

    for(let i = 0;i < 5;i++){
        let randomx = Math.floor(Math.random()*blocksx);
        let randomy = Math.floor(Math.random()*blocksy);

        let pickup = {
            ...itens[10],
            x: randomx*blockSize,
            y: randomy*blockSize,
            blockx: randomx,
            blocky: randomy,
            blockSize: blockSize,
            remove:false
        }
        pickups.push(pickup);
    }

    for(let i = 0;i < 5;i++){
        let randomx = Math.floor(Math.random()*blocksx);
        let randomy = Math.floor(Math.random()*blocksy);

        let pickup = {
            ...itens[11],
            x: randomx*blockSize,
            y: randomy*blockSize,
            blockx: randomx,
            blocky: randomy,
            blockSize: blockSize,
            remove:false
        }
        pickups.push(pickup);
    }
    
    for(let i = 0;i < 5;i++){
        let randomx = Math.floor(Math.random()*blocksx);
        let randomy = Math.floor(Math.random()*blocksy);

        let pickup = {
            ...itens[12],
            x: randomx*blockSize,
            y: randomy*blockSize,
            blockx: randomx,
            blocky: randomy,
            blockSize: blockSize,
            remove:false
        }
        pickups.push(pickup);
    }
    
    
    
    this.draw = function(posx,posy,s,x,y){

        if(!(typeof lines[x] == 'undefined')){
            if(!(typeof lines[x][y] === 'undefined')){
                image(lines[x][y].tile,posx,posy,s,s)
                if(typeof lines[x][y].overlay != 'undefined'){
                    image(lines[x][y].overlay,posx,posy,s,s);
                }
            }else{
                fill(40,40,40)
                rect(posx,posy,s,s);
            }
        }else{
            fill(40,40,40)
            rect(posx,posy,s,s);
        }
        strokeWeight(2);

        pickups.forEach(element=>{
            if(element.blockx == x && element.blocky == y){
                image(element.groundTile,posx,posy,s,s)
            }
        })
       

        // textSize(15);
        // fill(0);
        
        // text(`x:${x}/y:${y}`,posx+5,posy+15)
    }


    this.getBlock = function(x,y){
        return lines[x][y];
    }

    this.setOverlay = function(x,y,overlay){
        lines[x][y].overlay = overlay;
    }

    this.getSurround = function(x,y){
        // console.log(x)
        // console.log(y);
        let blocks = [];
        if(typeof lines[x-1] != 'undefined'){
            if(lines[x-1][y-1]){
                blocks.push(lines[x-1][y-1]);
            }
        }
        if(lines[x-1]){
            if(lines[x-1][y]){
                blocks.push(lines[x-1][y]);
            }
        }
        if(lines[x-1]){
            if(lines[x-1][y+1]){
                blocks.push(lines[x-1][y+1]);
            }
        }
        if(lines[x]){
            if(lines[x][y-1]){
                blocks.push(lines[x][y-1]);
            }
        }
        if(lines[x]){
            if(lines[x][y+1]){
                blocks.push(lines[x][y+1]);
            }
        }
        if(lines[x+1]){
            if(lines[x+1][y-1]){
                blocks.push(lines[x+1][y-1]);
            }
        }
        if(lines[x+1]){
            if(lines[x+1][y]){
                blocks.push(lines[x+1][y]);
            }
        }
        if(lines[x+1]){
            if(lines[x+1][y+1]){
                blocks.push(lines[x+1][y+1]);
            }
        }
        
        return blocks;
    }


    this.modblock = function(x,y){      //for trsting, can be deleted after
        if(lines[x][y].name == 'grass'){
            lines[x][y].name = itens[1].name
            lines[x][y].tile = itens[1].tile
            lines[x][y].collide = itens[1].collide
            lines[x][y].interact = itens[1].interact
            lines[x][y].status= itens[1].status
        }else if (lines[x][y].name == 'wood'){
            lines[x][y].name = itens[2].name
            lines[x][y].tile = itens[2].tile
            lines[x][y].collide = itens[2].collide
            lines[x][y].interact = itens[2].interact
            lines[x][y].status= itens[2].status
        }else if (lines[x][y].name == 'stone'){
            lines[x][y].name = itens[3].name
            lines[x][y].tile = itens[3].tile
            lines[x][y].collide = itens[3].collide
            lines[x][y].interact = itens[3].interact
            lines[x][y].status= itens[3].status
        }else {
            lines[x][y].name = itens[0].name
            lines[x][y].tile = itens[0].tile
            lines[x][y].collide = itens[0].collide
            lines[x][y].interact = itens[0].interact
            lines[x][y].status= itens[0].status
        }
        
    }

    this.interactblock = function(x,y){
        if(typeof lines[x] !== 'undefined'){
            if(typeof lines[x][y] !== 'undefined'){
                if(typeof lines[x][y].interact !== 'undefined'){
                    console.log('hi')
                    lines[x][y].interact();
                    
                }
                pickups.forEach(element=>{
                    if(element.blockx == x && element.blocky == y){
                        
                        console.log('picked')
                        element.interact();
                    }
                })
            }
        }


    }


    this.garbageCollection = function(){
        pickups.forEach((element,index)=>{
            if(element.remove){
                pickups.splice(index,1);
            }
        })
    }

    
}