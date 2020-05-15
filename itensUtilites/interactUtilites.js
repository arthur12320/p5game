function addItemToPlayer(item){

    for(let i = 0;i < player.maxinventory;i++){
        if(typeof player.inventory[i] == 'undefined'){
            player.inventory[i] = item;
            return
        }
    }
}