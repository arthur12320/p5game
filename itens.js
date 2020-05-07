function loadItens(){
    let itens=[]


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
    itens.push(grassItem)
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
    itens.push(woodItem)
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
    itens.push(stoneItem)
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
    itens.push(doorItem)
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
    itens.push(slimeItem)

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
        mode:'melee',
        range: 75,
        damage:5,
        delay:500,
        cooldown:false,
        status:{
            
        },
        interact: function(){
            if(player.inventory.length < player.maxinventory){
                let copy = JSON.parse(JSON.stringify(stickItem));
                copy.tile = stickimg;
                copy.groundTile = stickGround;
                player.inventory.push(copy);
                this.remove = true;
                player.equipItem();
            }
        }
            
    }
    itens.push(stickItem)

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
        mode:'melee',
        delay:500,
        cooldown:false,
        status:{
            
        },
        interact: function(){
            let copy = JSON.parse(JSON.stringify(swordItem));
            copy.tile = swordimg;
            copy.groundTile = swordGround;
            player.inventory.push(copy);
            this.remove = true;
            player.equipItem();
        }
    }
    itens.push(swordItem)



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
            messageToDisplay = `ganhou +${this.quantity} gold`
            setTimeout(() => {
                displayMessage=false;
            }, 2000);
        }
    }
    itens.push(goldItem)




    return itens;
}