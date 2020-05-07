function inventaryShow(ww,wh,player){
    fill(25,25,25);
    rect(0,0,ww,wh);
    textSize(30);
    fill(255)
    noStroke();
    text('iventary:',15,30);
    textSize(20);
    text(`player: ${player.name}`,15,60)
    text(`gold: ${player.gold}`,15,90)


    text('Itens:',15,120);
    player.inventory.forEach((iten,index) => {
        text(iten.name,25,150+(index*30));
    });
}