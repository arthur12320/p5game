function loadItens(){
    let itens={}


    //grass 0
    let grassimg = loadImage('./assets/grasstile.png');
    let grassItem = {
        tile:grassimg,
        name:'grass',
        collide:false,
        pickable:false,
        mode:'walking',
        status:{
        
        }
    }
    itens[0]=grassItem;

    //wood 1
    let woodimg = loadImage('./assets/wood.png');
    let woodItem = {
        tile:woodimg,
        name:'wood',
        collide:false,
        pickable:false,
        mode:'walking',
        status:{
        
        }
    }
    itens[1]=woodItem;

    //stone 2
    let stoneimg = loadImage('./assets/stone.png');
    
    let stoneItem = {
        tile:stoneimg,
        name:'stone',
        collide:true,
        pickable:false,
        mode:'walking',
        status:{
        
        }
    }
    itens[2] = stoneItem;
    //door 3
    let doorimg = loadImage('./assets/door.png');
    let dooroppenimg = loadImage('./assets/dooropen.png');
    let doorItem = {
        tile:doorimg,
        name:'door',
        collide:true,
        pickable:false,
        mode:'walking',
        status:{
            open:false
        },
        interact: function(){
            if(!this.status.open){
                this.status.open = true;
                this.tile = dooroppenimg
                this.collide = false;
            }else {
                this.status.open = false;
                this.tile = doorimg
                this.collide = true;
            }
        
        }
    }
    itens[3] = doorItem;
    //slime 4
    let slimeimg = loadImage('./assets/slime.png');
    let slimeItem = {
        tile:slimeimg,
        name:'slime',
        collide:false,
        pickable:false,
        mode:'walking',
        status:{
        
        }
    }
    itens[4] = slimeItem;

    //stick 5
    let stickimg = loadImage('./assets/stick.png');
    let stickGround = loadImage('./assets/stickGround.png');
    let stickItem = {
        tile:stickimg,
        groundTile:stickGround,
        name:'stick',
        width:10,
        height:75,
        collide:false,
        pickable:true,
        mode:'walking',
        range: 75,
        damage:5,
        delay:500,
        cooldown:false,
        status:{
            
        },
        use: function(){
            if(!player.cooldown){
                player.cooldown = true;
                let finish  = polarToCart(this.range,mouseangle(mouseY,mouseX));
                player.displayWeapon = true;
                mobs.forEach(mob=>{
                    x1 = player.x;
                    y1 = player.y;
                    x2 = player.x+finish.x;
                    y2 = player.y-finish.y;

                    rx = mob.x - (mob.width/2);
                    ry = mob.y - (mob.height/2);
                    rw = mob.width;
                    rh = mob.height;

                    if(lineRect(x1,y1,x2,y2,rx,ry,rw,rh)){
                        mob.health-=this.damage;
                    }
                })
                setTimeout(() => {
                    player.displayWeapon = false;
                    player.cooldown = false;
                }, this.delay);
            }
        },
        interact: function(){
            if(player.inventory.length < player.maxinventory){
                let copy = JSON.parse(JSON.stringify(stickItem));
                copy.tile = stickimg;
                copy.groundTile = stickGround;
                copy.use = this.use;
                addItemToPlayer(copy);
                this.remove = true;
                player.equipItem();
            }else{
                displayMessage = true;
                messageToDisplay = `full inventory`
                setTimeout(() => {
                    displayMessage=false;
                }, 2000);
            }
        }
            
    }
    itens[5] = stickItem;

    //sword 6
    let swordimg = loadImage('./assets/sword.png');
    let swordGround = loadImage('./assets/swordGround.png');
    let swordItem = {
        tile:swordimg,
        groundTile:swordGround,
        name:'sword',
        width:20,
        height:75,
        range: 75,
        damage:50,
        collide:false,
        pickable:true,
        mode:'walking',
        delay:500,
        cooldown:false,
        status:{
            
        },
        use: function(){

            let finish  = polarToCart(this.range,mouseangle(mouseY,mouseX));
            player.displayWeapon = true;
            mobs.forEach(mob=>{
                x1 = player.x;
                y1 = player.y;
                x2 = player.x+finish.x;
                y2 = player.y-finish.y;

                rx = mob.x - (mob.width/2);
                ry = mob.y - (mob.height/2);
                rw = mob.width;
                rh = mob.height;

                if(lineRect(x1,y1,x2,y2,rx,ry,rw,rh)){
                    mob.health-=this.damage;
                }
            })
            setTimeout(() => {
                player.displayWeapon = false;
            }, this.delay);
        },
        interact: function(){
            if(player.inventory.length < player.maxinventory){
                let copy = JSON.parse(JSON.stringify(swordItem));
                copy.tile = swordimg;
                copy.groundTile = swordGround;
                copy.use = this.use;
                player.inventory.push(copy);
                this.remove = true;
                player.equipItem();
            }else{
                displayMessage = true;
                messageToDisplay = `full inventory`
                setTimeout(() => {
                    displayMessage=false;
                }, 2000);
            }
            
        }
    }
    itens[6] = swordItem;



    //gold 7
    let goldimg = loadImage('./assets/goldGroundTile.png');
    let goldGround = loadImage('./assets/goldGroundTile.png');
    let goldItem = {
        tile:goldimg,
        groundTile:goldGround,
        name:'gold',
        width:100,
        height:100,
        collide:false,
        pickable:true,
        mode:'walking',
        status:{
            
        },
        interact: function(){
            let foundIndex = -1
            player.inventory.forEach((item,index)=>{
                if(item.name == 'gold'){
                    foundIndex = index;
                }
            })

            if(foundIndex != -1){
                player.gold += this.quantity;
                player.inventory[foundIndex].quantity += this.quantity;
                this.remove = true;
            }else{
                if(player.inventory.length < player.maxinventory){
                    let copy = JSON.parse(JSON.stringify(goldItem));
                    copy.quantity = this.quantity;
                    copy.tile = goldimg;
                    copy.groundTile = goldGround;
                    player.inventory.push(copy);
                    player.gold += this.quantity;
                    this.remove = true;
                    player.equipItem();
                }
                displayMessage = true;
                messageToDisplay = `full inventory`
                setTimeout(() => {
                    displayMessage=false;
                }, 2000);
                return;
            }
            displayMessage = true;
            messageToDisplay = `picked up +${this.quantity} gold`
            setTimeout(() => {
                displayMessage=false;
            }, 2000);
        }
    }
    itens[7] = goldItem;

    //health_potion 8
    let healthPotionimg = loadImage('./assets/health_potion.png');
    let healthPotionGround = loadImage('./assets/health_potion.png');
    let healthPotionItem = {
        tile:healthPotionimg,
        groundTile:healthPotionGround,
        name:'health Potion',
        width:100,
        height:100,
        range: 75,
        damage:50,
        collide:false,
        pickable:true,
        mode:'walking',
        delay:500,
        cooldown:false,
        status:{
            
        },
        use: function(){
            if(player.health != player.fullHealth){
                player.health += 10;
                if(player.health > player.fullHealth){
                    player.health = player.fullHealth;
                }
                player.inventory.splice(player.selectediventory,1);
                player.displayMode = 'walking';
                displayMessage = true;
                messageToDisplay = `used a health potion`
                player.equipItem();
                setTimeout(() => {
                    displayMessage=false;
                }, 2000);
            }else{
                displayMessage = true;
                messageToDisplay = `no need to use that`
                setTimeout(() => {
                    displayMessage=false;
                }, 2000);
            }
        },
        interact: function(){
            if(player.inventory.length < player.maxinventory){
                let copy = JSON.parse(JSON.stringify(healthPotionItem));
                copy.tile = healthPotionimg;
                copy.groundTile = healthPotionGround;
                copy.use = this.use;
                player.inventory.push(copy);
                this.remove = true;
                player.equipItem();
    
                displayMessage = true;
                messageToDisplay = `picked up +1 health potion`
                setTimeout(() => {
                    displayMessage=false;
                }, 2000);
            }else{
                displayMessage = true;
                messageToDisplay = `full inventory`
                setTimeout(() => {
                    displayMessage=false;
                }, 2000);
            }
        },
        
    }
    itens[8] = healthPotionItem;


    //molotov 9
    let molotovimg = loadImage('./assets/molotov.png');
    let molotovGround = loadImage('./assets/molotov.png');
    let molotovGroundOverlay = loadImage('./assets/molotovGroungOverlay.png')
    let molotovItem = {
        tile:molotovimg,
        groundTile:molotovGround,
        name:'molotov',
        width:100,
        height:100,
        range: 600,
        spread: 1,
        damage:50,
        collide:false,
        pickable:true,
        mode:'throw',
        delay:500,
        cooldown:false,
        status:{
            
        },
        interact: function(){
            if(player.inventory.length < player.maxinventory){
                let copy = JSON.parse(JSON.stringify(molotovItem));
                copy.tile = molotovimg;
                copy.groundTile = molotovGround;
                copy.use = this.use;
                player.inventory.push(copy);
                this.remove = true;
                player.equipItem();
            } else {
                displayMessage = true;
                messageToDisplay = `full inventory`
                setTimeout(() => {
                    displayMessage=false;
                }, 2000);
            }
        },
        use: function(){
            let mousePos = createVector(mouseX,mouseY);
            let centerPos = createVector(windowWidth/2,windowHeight/2);

            let dist = mousePos.dist(centerPos);

            if(dist <= this.range/2){
                let blockX = Math.floor(mouseXToRealX(mouseX)/blockSize);
                let blockY = Math.floor(mouseYToRealY(mouseY)/blockSize);
                for(let i = -this.spread; i <= this.spread;i++){
                    for(let j = -this.spread; j<= this.spread;j++){
                        world.setOverlay(blockX+i,blockY+j,molotovGroundOverlay);
                    }
                }
                player.inventory.splice(player.selectediventory,1);
                player.displayMode = 'walking';
                displayMessage = true;
                messageToDisplay = `used a molotov cocktail`
                player.equipItem();


                mobs.forEach(mob => {
                    let mobBlockX = Math.floor(mob.x/blockSize);
                    let mobBlockY = Math.floor(mob.y/blockSize);
                    
                    for(let i = -this.spread; i <= this.spread;i++){
                        for(let j = -this.spread; j<= this.spread;j++){
                            if(mobBlockX ==blockX+i && mobBlockY == blockY+j){
                                mob.giveEffect('fire',6000)
                                mob.health-=10;
                                setTimeout(() => {
                                    mob.health-=10;
                                    setTimeout(() => {
                                        mob.health-=10;
                                        setTimeout(() => {
                                            mob.health-=10;
                                            setTimeout(() => {
                                                mob.health-=10;
                                                setTimeout(() => {
                                                    mob.health-=10;
                                                    setTimeout(() => {
                                                        
                                                    }, 1000);
                                                }, 1000);
                                            }, 1000);
                                        }, 1000);
                                    }, 1000);
                                }, 1000);
                            }
                        }
                    }
                    
                    
                })

                setTimeout(() => {
                    for(let i = -this.spread; i <= this.spread;i++){
                        for(let j = -this.spread; j<= this.spread;j++){
                            world.setOverlay(blockX+i,blockY+j,undefined);
                        }
                    }
                }, 6000);
            }else{
                displayMessage = true;
                messageToDisplay = `can't throw that far`
            }
            
        }
    }
    itens[9] = molotovItem;


    //newSword 10
    let newSwordimg = loadImage('./assets/sword.png');
    let newSwordGround = loadImage('./assets/swordGround.png');
    let newSwordItem = {
        tile:newSwordimg,
        groundTile:newSwordGround,
        name:'newSword',
        width:20,
        height:75,
        range: 75,
        damage:50,
        collide:false,
        pickable:true,
        mode:'walking',
        delay:500,
        cooldown:false,
        status:{
            
        },
        use: function(){
            if(!player.cooldown){
                player.cooldown = true;
                let finish  = polarToCart(this.range,mouseangle(mouseY,mouseX));
                player.displayWeapon = true;
                mobs.forEach(mob=>{
                    x1 = player.x;
                    y1 = player.y;
                    x2 = player.x+finish.x;
                    y2 = player.y-finish.y;

                    rx = mob.x - (mob.width/2);
                    ry = mob.y - (mob.height/2);
                    rw = mob.width;
                    rh = mob.height;

                    if(lineRect(x1,y1,x2,y2,rx,ry,rw,rh)){
                        mob.health-=this.damage;
                    }
                })
                setTimeout(() => {
                    player.displayWeapon = false;
                    player.cooldown = false;
                }, this.delay);
            }
        },
        interact: function(){
            if(player.inventory.length < player.maxinventory){
                let copy = JSON.parse(JSON.stringify(newSwordItem));
                copy.tile = newSwordimg;
                copy.groundTile = newSwordGround;
                copy.use = this.use;
                player.inventory.push(copy);
                this.remove = true;
                player.equipItem();
            }else{
                console.log('full invenotury')
                displayMessage = true;
                messageToDisplay = `full inventory`
                setTimeout(() => {
                    displayMessage=false;
                }, 2000);
            }
            
        }
    }
    itens[10] = newSwordItem;

    //longSword 11
    let longSwordimg = loadImage('./assets/longSword.png');
    let longSwordGround = loadImage('./assets/swordGround.png');
    let longSwordItem = {
        tile:longSwordimg,
        groundTile:longSwordGround,
        name:'longSword',
        width:20,
        height:125,
        range: 125,
        damage:50,
        collide:false,
        pickable:true,
        mode:'walking',
        delay:500,
        cooldown:false,
        status:{
            
        },
        use: function(){
            if(!player.cooldown){
                player.cooldown = true;
                let finish  = polarToCart(this.range,mouseangle(mouseY,mouseX));
                player.displayWeapon = true;
                mobs.forEach(mob=>{
                    x1 = player.x;
                    y1 = player.y;
                    x2 = player.x+finish.x;
                    y2 = player.y-finish.y;

                    rx = mob.x - (mob.width/2);
                    ry = mob.y - (mob.height/2);
                    rw = mob.width;
                    rh = mob.height;

                    if(lineRect(x1,y1,x2,y2,rx,ry,rw,rh)){
                        mob.health-=this.damage;
                    }
                })
                setTimeout(() => {
                    player.displayWeapon = false;
                    player.cooldown = false;
                }, this.delay);
            }
        },
        interact: function(){
            if(player.inventory.length < player.maxinventory){
                let copy = JSON.parse(JSON.stringify(longSwordItem));
                copy.tile = longSwordimg;
                copy.groundTile = longSwordGround;
                copy.use = this.use;
                player.inventory.push(copy);
                this.remove = true;
                player.equipItem();
            }else{
                displayMessage = true;
                messageToDisplay = `full inventory`
                setTimeout(() => {
                    displayMessage=false;
                }, 2000);
            }
            
        }
    }
    itens[11] = longSwordItem;




    //grenade 12
    let grenadeimg = loadImage('./assets/grenade.png');
    let grenadeGround = loadImage('./assets/grenade.png');
    let grenadeExplosionEdge = loadImage('./assets/grenadeExplosionEdges.png')
    let grenadeExplosionCenter = loadImage('./assets/grenadeExplosionCenter.png')
    let grenadeGroundOverlay = loadImage('./assets/grenade.png');
    let grenadeItem = {
        tile:grenadeimg,
        groundTile:grenadeGround,
        name:'grenade',
        width:100,
        height:100,
        range: 600,
        spread: 1,
        damage:50,
        collide:false,
        pickable:true,
        mode:'throw',
        delay:2000,
        cooldown:false,
        status:{
            
        },
        interact: function(){
            if(player.inventory.length < player.maxinventory){
                let copy = JSON.parse(JSON.stringify(grenadeItem));
                copy.tile = grenadeimg;
                copy.groundTile = grenadeGround;
                copy.use = this.use;
                player.inventory.push(copy);
                this.remove = true;
                player.equipItem();
            } else {
                displayMessage = true;
                messageToDisplay = `full inventory`
                setTimeout(() => {
                    displayMessage=false;
                }, this.delay);
            }
        },
        use: function(){
            let mousePos = createVector(mouseX,mouseY);
            let centerPos = createVector(windowWidth/2,windowHeight/2);

            let dist = mousePos.dist(centerPos);

            if(dist <= this.range/2){
                let blockX = Math.floor(mouseXToRealX(mouseX)/blockSize);
                let blockY = Math.floor(mouseYToRealY(mouseY)/blockSize);
                
                world.setOverlay(blockX,blockY,grenadeGroundOverlay);

                player.inventory.splice(player.selectediventory,1);
                player.displayMode = 'walking';
                displayMessage = true;
                messageToDisplay = `used a grenade`
                player.equipItem();

                setTimeout(() => {

                    for(let i = -this.spread; i <= this.spread;i++){
                        for(let j = -this.spread; j<= this.spread;j++){
                            world.setOverlay(blockX+i,blockY+j,grenadeExplosionEdge);
                        }
                    }
                    mobs.forEach(mob => {
                        let mobBlockX = Math.floor(mob.x/blockSize);
                        let mobBlockY = Math.floor(mob.y/blockSize);
                        
                        for(let i = -this.spread; i <= this.spread;i++){
                            for(let j = -this.spread; j<= this.spread;j++){
                                if(mobBlockX ==blockX+i && mobBlockY == blockY+j){
                                    
                                    mob.health-=200;
                                    
                                }
                            }
                        }
                        
                        
                    })


                    setTimeout(() => {
                        for(let i = -this.spread; i <= this.spread;i++){
                            for(let j = -this.spread; j<= this.spread;j++){
                                world.setOverlay(blockX+i,blockY+j,undefined);
                            }
                        }
                        world.setOverlay(blockX,blockY,undefined);
                    }, 500);
                    world.setOverlay(blockX,blockY,grenadeExplosionCenter);
                }, 2000);
                

            }else{
                displayMessage = true;
                messageToDisplay = `can't throw that far`
            }
            
        }
    }
    itens[12] = grenadeItem

    //zombie 13
    let zombieimg = loadImage('./assets/zombie.png');
    let zombieItem = {
        tile:zombieimg,
        name:'zombie',
        collide:false,
        pickable:false,
        mode:'walking',
        status:{
        
        }
    }
    itens[13] = zombieItem


    //kabutoSword 14
    let kabutoSwordimg = loadImage('./assets/kabutoSword.png');
    let kabutoSwordGround = loadImage('./assets/kabutoswordGround.png');
    let kabutoSwordItem = {
        tile:kabutoSwordimg,
        groundTile:kabutoSwordGround,
        name:'kabutoSword',
        width:20,
        height:125,
        range: 125,
        damage:80,
        collide:false,
        pickable:true,
        mode:'walking',
        delay:700,
        cooldown:false,
        status:{
            
        },
        use: function(){
            if(!player.cooldown){
                player.cooldown = true;
                let finish  = polarToCart(this.range,mouseangle(mouseY,mouseX));
                player.displayWeapon = true;
                mobs.forEach(mob=>{
                    x1 = player.x;
                    y1 = player.y;
                    x2 = player.x+finish.x;
                    y2 = player.y-finish.y;

                    rx = mob.x - (mob.width/2);
                    ry = mob.y - (mob.height/2);
                    rw = mob.width;
                    rh = mob.height;

                    if(lineRect(x1,y1,x2,y2,rx,ry,rw,rh)){
                        mob.health-=this.damage;
                    }
                })
                setTimeout(() => {
                    player.displayWeapon = false;
                    player.cooldown = false;
                }, this.delay);
            }
        },
        interact: function(){
            if(player.inventory.length < player.maxinventory){
                let copy = JSON.parse(JSON.stringify(kabutoSwordItem));
                copy.tile = kabutoSwordimg;
                copy.groundTile = kabutoSwordGround;
                copy.use = this.use;
                player.inventory.push(copy);
                this.remove = true;
                player.equipItem();
            }else{
                displayMessage = true;
                messageToDisplay = `full inventory`
                setTimeout(() => {
                    displayMessage=false;
                }, 2000);
            }
            
        }
    }
    itens[14] = kabutoSwordItem
    ;


    return itens;
}