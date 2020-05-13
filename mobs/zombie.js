function Zombie(ww, wh, x, y, bs, index) {
    this.x = x; //position center based
    this.y = y; //position center based
    this.width = 100;
    this.height = 100;
    this.speed = 0.5;
    this.lastMoveX = 0;
    this.lastMoveY = 0;
    this.name = 'zombie';
    this.canchange = true;
    this.heading = 'right';
    this.fullHealth = 500;
    this.health = this.fullHealth;
    this.damaged = false;
    this.hitanimationFrame = -1;
    this.lastDamage = 0;
    this.remove = false;
    this.lastMoveX = 0;
    this.lastMoveY = 0;
    this.damage = 50;
    this.effectsImages = {};

    this.dropTable = [
        {
            item: itens[6],
            dropChance: 10  //out of 100
        },
        {
            item: {
                ...itens[7],
                quantity:20
            },
            dropChance: 90  //out of 100
        },
    ]

    this.sprite = 13;





    this.display = function () {
        push();
        translate(-(player.x - (ww / 2)) + (this.x ),-(player.y - (wh / 2)) + (this.y ));
        imageMode(CENTER);
        angleMode(DEGREES);
        if(this.lastMoveX > 0 && this.lastMoveY == 0){ //right
            
            this.heading = 'right'
        }else if(this.lastMoveX < 0 && this.lastMoveY == 0){ //left
            
            this.heading = 'left'
        }else if(this.lastMoveX == 0 && this.lastMoveY > 0){ //down
            
            this.heading = 'down'
        }else if(this.lastMoveX == 0 && this.lastMoveY < 0){ //up
            
            this.heading = 'up'
        }

        if(this.heading == 'right'){
            rotate(-90);
        }else if(this.heading == 'left'){
            rotate(90);
        }else if(this.heading == 'down'){
            rotate(0);
        }else if(this.heading == 'up'){
            rotate(180);
        }
        image(itens[this.sprite].tile, 0,0, this.width, this.height);
        pop()
        
        //ellipse(-(player.x - (ww / 2)) +this.x, -(player.y - (wh / 2)) + this.y,10,10)
        if (this.damaged) {
            fill(255, 0, 0);
            rect(-(player.x - (ww / 2)) + (this.x - (this.width / 2)), -(player.y - (wh / 2)) + (this.y - (this.height / 2)), this.width, this.height);
        }
        if(this.fullHealth != this.health){
            this.showHealthBar();
        }
        if (this.hitanimationFrame >= 0) {
            fill(155, 155, 155)
            textSize(15);
            text(this.lastDamage, -(player.x - (ww / 2)) + (this.x - (this.width / 2)) + 10, -(player.y - (wh / 2)) + (this.y - (this.height / 2) - (this.hitanimationFrame)))
            this.hitanimationFrame++;
            if (this.hitanimationFrame > 20) {
                this.hitanimationFrame = -1;
            }

        }
        for (var [key, value] of Object.entries(this.effectsImages)) {
            image(value, -(player.x - (ww / 2)) + (this.x - (this.width / 2)), -(player.y - (wh / 2)) + (this.y - (this.height / 2)), this.width, this.height);
        }
        if(this.health <= 0){
            this.die()
        }

    }

    this.move = function () {
        this.lastMoveX = 0;
        this.lastMoveY = 0;
        // if (this.heading == 'right') {
        //     this.lastMoveX += this.speed;
        // }
        // if (this.heading == 'left') {                        //for random direction
        //     this.lastMoveX -= this.speed;
        // }
        // if (this.heading == 'up') {
        //     this.lastMoveY += this.speed;
        // }
        // if (this.heading == 'down') {
        //     this.lastMoveY -= this.speed;
        // }

        if(player.x > this.x){
            this.lastMoveX += this.speed;
        }else if(player.x < this.x){
            this.lastMoveX -= this.speed;
        }

        if(player.y > this.y){
            this.lastMoveY += this.speed;
        }else if(player.y < this.y){
            this.lastMoveY -= this.speed;
        }

        this.x += this.lastMoveX;
        this.y += this.lastMoveY;
    }

    this.changeDirection = function () {

        // let choice = Math.floor(Math.random() * 4)
        // if (choice == 0) {
        //     this.heading = 'up';
        // }
        // else if (choice == 1) {
        //     this.heading = 'left';
        // }
        // else if (choice == 2) {
        //     this.heading = 'down';
        // }
        // else if (choice == 3) {
        //     this.heading = 'right';
        // }

    }

    setInterval(() => {
        this.changeDirection();

    }, 1000);

    // this.colide = function(blocks){
    //     blocks.forEach(element => {
    //         if(element.collide){
    //             if(blockCollision(this.x-(this.width/2),this.y-(this.height/2),this.width,this.height,element.x,element.y,element.blockSize,element.blockSize)){
    //                 this.x -= this.lastMoveX;
    //                 this.y -= this.lastMoveY;
    //             }
    //         }
    //     });
    // }

    this.colide = function(blocks){
       
        blocks.forEach(element => {
            //console.log(element)
            if(element.collide){
                
                if(blockCollision(this.x-(this.width/2),this.y-(this.height/2),this.width,this.height,element.x,element.y,element.blockSize,element.blockSize)){
                    
                    this.x -= this.lastMoveX;
                    this.y -= this.lastMoveY;
                }
            }
        });
    }


    this.showHealthBar = function () {
        fill(255, 0, 0)
        rect(-(player.x - (ww / 2)) + (this.x - (this.width / 2)), -(player.y - (wh / 2)) + (this.y - (this.height / 2)) - 20, this.width, 10);
        stroke(0);
        fill(0, 255, 0)
        rect(-(player.x - (ww / 2)) + (this.x - (this.width / 2)), -(player.y - (wh / 2)) + (this.y - (this.height / 2)) - 20, (this.width * this.health) / this.fullHealth, 10);
    }


    this.giveEffect = function(effect,time){
        switch(effect){
            case 'fire':
                this.effectsImages.burnt  = loadImage('../assets/molotovGroungOverlay.png');
                
                setTimeout(() => {
                    delete this.effectsImages.burnt;
                }, time);
                break;
        }
    }

    this.die = function(){

        let prevTotal = 0;
        let rng = Math.floor(Math.random()*100) + 1;
        this.dropTable.forEach(item=>{
            console.log(item)
            console.log(rng)
            if(rng <= prevTotal+item.dropChance&&rng > prevTotal){
                let pickup = {
                    name:item.item.name,
                    tile:item.item.tile,
                    groundTile:item.item.groundTile,
                    x: this.x,
                    y: this.x,
                    blockx: Math.floor(this.x/blockSize),
                    blocky: Math.floor(this.y/blockSize),
                    blockSize: blockSize,
                    remove:false,
                    interact:item.item.interact,
                    use:item.item.use,
                    quantity:item.item.quantity
                }
                pickups.push(pickup);
                this.remove = true;
                prevTotal += item.dropChance;
            }else{
                prevTotal += item.dropChance;
            }
        })
        
        
    }

}
