function Player(ww,wh,bs,world){
    this.x = ww/2; //position center based
    this.y = 150; //position center based
    this.width = 50;
    this.height = 50;
    this.speed = 3;
    this.lastMoveX = 0;
    this.lastMoveY = 0;
    this.name='arthur';
    this.fullHealth=100;
    this.health=this.fullHealth;
    this.damageCooldown = false;
    this.displayWeapon = false;
    
    //this.name=prompt('player name?');
    this.debounce = true;
    this.meleeWeapon = {
        
        
    }

    //inventory
    this.maxinventory = 10;
    this.selectediventory = 0;
    this.inventory = [
        
    ]
    this.gold = 0;
    
    

    this.displayMode = 'walking'; // display mode walking(the player can walk in the enviroment and interact), menu, plane, driving, shooting ......
    this.lastdisplayMode = 'walking';

    this.color = createVector(155,155,155);


    this.display = function(){
        fill(this.color.x,this.color.y,this.color.z);
        //stroke(255,0,0)
        // strokeWeight(4);
        // line(ww/2,0,ww/2,wh)
        // line(0,wh/2,ww,wh/2)                 //lines in the middle
        // stroke(0)
        // strokeWeight();
        rect((ww/2) - (this.width/2),(wh/2) - (this.height/2),this.width,this.height);
        // if(this.fullHealth !== this.health){
            
            this.displayHealthBar();
        // }
        if(this.displayWeapon){
            this.drawWeapon();
        }
    }

    this.move = function(){
        this.lastMoveY = 0;
        this.lastMoveX = 0;
       

        if(keyIsDown(16)){ //shift
            this.speed = 6;
        }
        if(keyIsDown(65)){ //move left
            
            this.lastMoveX -= this.speed;
        }
        if(keyIsDown(68)){ //move right
            this.lastMoveX += this.speed
        }
        if(keyIsDown(83)){ //move down
            this.lastMoveY += this.speed
        }   
        if(keyIsDown(87)){ //move up
            this.lastMoveY -= this.speed
        } 
        if(keyIsDown(69)){  //change to iventary
           
            if(this.debounce){
                this.debounce = false;
                console.log('here')
                if(this.displayMode == 'walking' ){
                    this.lastdisplayMode = 'walking'
                    this.displayMode = 'iventary';
                }else if(this.displayMode == 'melee'){
                    this.lastdisplayMode = 'melee'
                    this.displayMode = 'iventary';
                }
                else if(this.displayMode == 'iventary'){
                    this.displayMode = this.lastdisplayMode;
                }
                setTimeout(()=>{
                    this.debounce = true;
                },200)
            }
        }
        if(keyIsDown(70)){      //f interact
            if(this.debounce){
                this.debounce = false;
                if(this.displayMode == 'walking' || this.displayMode == 'melee'){
                    handleInteractWalking(player);
                }
                setTimeout(()=>{
                    this.debounce = true;
                },200)
            }
            
        }
        if(keyIsDown(80)){      //p debug
            if(this.debounce){
                this.debounce = false;
                if(debugMode){
                    debugMode=false;
                }else{
                    debugMode=true;
                }
                setTimeout(()=>{
                    this.debounce = true;
                },200)
            }
            
        }
        // if(keyIsDown(50)){      //2 melee mode
        //     if(this.debounce){
        //         this.debounce = false;
        //         this.displayMode='melee'
        //         setTimeout(()=>{
        //             this.debounce = true;
        //         },200)
        //     }
            
        // }
        // if(keyIsDown(49)){      //1 walking mode
        //     if(this.debounce){
        //         this.debounce = false;
        //         this.displayMode='walking'
        //         setTimeout(()=>{
        //             this.debounce = true;
        //         },200)
        //     }
            
        // }
        this.changeSelectedItem()

        this.x += this.lastMoveX;
        this.y += this.lastMoveY;
        this.speed = 3;
            
        
    }

    this.colide = function(blocks){
        blocks.forEach(element => {
            //console.log(element)
            if(element.collide){
                
                if(blockCollision(this.x-(this.width/2),this.y-(this.height/2),this.width,this.height,element.x,100,element.blockSize,50)){
                    this.x -= this.lastMoveX;
                    this.y -= this.lastMoveY;
                }
            }
        });

        
    }


    this.intersectMob = function(mobs){
        mobs.forEach(mob => {
            //console.log(element)

                if(blockCollision(this.x,this.y,this.width,this.height,mob.x,mob.y,mob.width,mob.height)){
                    if(!this.damageCooldown){
                        console.log('hit');
                        this.damageCooldown = true;
                        this.health -= mob.damage;
                        if(this.health <= 0){
                            gameover = true;
                        }
                        console.log(this.health);
                        setTimeout(() => {
                            this.damageCooldown=false;
                        }, 1000);
                    }
                    
                }
        });
    }   

    this.displayHealthBar = function(){
        fill(255, 0, 0)
        rect(0,wh-30, ww, 30);
        stroke(0);
        fill(0, 255, 0)
        rect(0,wh-30, (ww * this.health) / this.fullHealth, 30);
    }


    this.changeSelectedItem = function(){
        if(keyIsDown(49)){ //1
            this.selectediventory = 0;
            this.equipItem()
        }
        else if(keyIsDown(50)){ //2
            this.selectediventory = 1;
            this.equipItem()
        }
        else if(keyIsDown(51)){ //3
            this.selectediventory = 2;
            this.equipItem()
        }
        else if(keyIsDown(52)){ //4
            this.selectediventory = 3;
            this.equipItem()
        }
        else if(keyIsDown(53)){ //5
            this.selectediventory = 4;
            this.equipItem()
        }
        else if(keyIsDown(54)){ //6
            this.selectediventory = 5;
            this.equipItem()
        }
        else if(keyIsDown(55)){ //7
            this.selectediventory = 6;
            this.equipItem()
        }
        else if(keyIsDown(56)){ //8
            this.selectediventory = 7;
            this.equipItem()
        }
        else if(keyIsDown(57)){ //9
            this.selectediventory = 8;
            this.equipItem()
        }
        else if(keyIsDown(48)){ //0
            this.selectediventory = 9;
            this.equipItem()
        }
    }


    this.equipItem = function(){
        x = this.selectediventory;
        if(typeof this.inventory[x] !== 'undefined'){
            if(this.inventory[x].mode == 'melee'){
                this.meleeWeapon = this.inventory[x];
                this.meleeWeapon.cooldown = false;
            }
            this.displayMode = this.inventory[x].mode;
        }else{
            this.displayMode = 'walking';
        }
    }

    this.drawWeapon = function(){

        angle = mouseangle(mouseY,mouseX)
        let weapon  = this.inventory[this.selectediventory];
        push();
        translate(windowWidth/2,windowHeight/2);
        imageMode(CENTER);
        angleMode(DEGREES)
        rotate(-angle+90);
        fill(25,25,25);
        rect(weapon.tile,0,-weapon.range/2,weapon.width,weapon.height)
        image(weapon.tile,0,-weapon.range/2,weapon.width,weapon.height);
        imageMode(CORNERS);
        pop()
    
}

}