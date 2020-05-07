function Slime(ww, wh, x, y, bs, index) {
    this.x = x; //position center based
    this.y = y; //position center based
    this.width = 50;
    this.height = 50;
    this.speed = 0.5;
    this.lastMoveX = 0;
    this.lastMoveY = 0;
    this.name = 'slime';
    this.canchange = true;
    this.heading = 'right';
    this.fullHealth = 100;
    this.health = this.fullHealth;
    this.damaged = false;
    this.hitanimationFrame = -1;
    this.lastDamage = 0;
    this.remove = false;
    this.lastMoveX = 0;
    this.lastMoveY = 0;
    this.damage = 10;

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

    this.sprite = 4;





    this.display = function () {
        image(itens[this.sprite].tile, -(player.x - (ww / 2)) + (this.x - (this.width / 2)), -(player.y - (wh / 2)) + (this.y - (this.height / 2)), this.width, this.height);
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


    this.checkMeleeHit = function (player) {
        let myVector = createVector(this.x - (this.width / 2), this.y - (this.height / 2));
        console.log(myVector)
        let finish = polarToCart(player.meleeWeapon.range / 2+player.meleeWeapon.range/4, mouseangle(mouseY, mouseX));
        let weaponVector = createVector(player.x + finish.x, player.y - finish.y);

        console.log(circleRect(weaponVector.x, weaponVector.y, player.meleeWeapon.range / 4, myVector.x, myVector.y, this.width, this.height))

        if (circleRect(weaponVector.x, weaponVector.y, player.meleeWeapon.range / 4, myVector.x, myVector.y, this.width, this.height)) {
            this.damaged = true;
            setTimeout(() => {
                this.damaged = false;
            }, 50);
            this.hitanimationFrame = 0;
            this.health -= player.meleeWeapon.damage
            this.lastDamage = player.meleeWeapon.damage;
            if (this.health <= 0) {
                this.die();
                
            }
        }

    }


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