export default class Player extends Phaser.Sprite {
    
    constructor(game, x, y, bullets ) {
        super(game, x, y, 'ninja', 0);
        this.jetpackSpeed = 50;
        this.heroflying = false;
        this.firstAnimation = true;
        this.takeOffComplete = false;
        this.flightSequenceInit = false;
        this.shotSpeed = 1500;
        this.bullets = bullets;
        this.shotInterval = .5;
        
        this.health = { max: 10, current: 10};

        
        this.flightDelay = 0;
        this.charecterspeed = 500;
        this.flightWarmUp = 0;
        this.angleCount = 0;
        this.rotationSeq = 0;
        this.jetBoost = 0;
        this.nextShot = 0;
         this.game.physics.arcade.enable(this, Phaser.Physics.ARCADE);
        
              this.body.gravity.y = 700;
        
             this.anchor.setTo(.5, .5);
          
            this.animations.add('attack', [0, 1, 2, 3, 4, 5],10, true);
            this.animations.add('die', [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],10, true);
            this.animations.add('dizzy', [18, 19, 20, 21],10, true);
            this.idle = this.animations.add('idle', [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],10, true);
            this.animations.add('jetpack', [34, 35, 36, 37, 38, 39, 40, 41],10, true);
            this.animations.add('jump', [42, 43, 44, 45, 46, 47],10, false);
            this.animations.add('roll', [48, 49, 50, 51, 52, 53, 54, 55],10, true);
            this.animations.add('run', [56, 57, 58, 59, 60, 61, 62, 63, 64, 65],10, false);
            this.runShot = this.animations.add('run_with_gun', [66, 67, 68, 69, 70, 71, 72, 73, 74, 75],10, false);
            this.idleShot = this.animations.add('shot', [76,77,78,79,80],10, false);
            this.runShotStop = this.animations.add('shotStop', [79,80],8, false);
            this.animations.add('sliding', [81, 82, 83, 84, 85, 86],10, true);
            this.animations.add('throwing', [87, 88, 89, 90, 91, 92],10, true);
            this.animations.add('jetpack_fire', [93, 94, 95, 96, 97],10, false);
            this.animations.add('jump_fire',[98, 99, 100, 101, 102],10,false);
            
            

    

             
              
        
                  //registered inputs
            this.moveLeft = this.game.input.keyboard.addKey("A".charCodeAt(0));
            this.moveRight = this.game.input.keyboard.addKey("D".charCodeAt(0));
            this.jump = this.game.input.keyboard.addKey("W".charCodeAt(0));
            this.moveDown = this.game.input.keyboard.addKey("S".charCodeAt(0));
            this.cursor = this.game.input.keyboard.createCursorKeys();
            this.jetmode = this.game.input.keyboard.addKey(16);
            this.shoot = this.game.input.keyboard.addKey(32);
            this.testshot = this.game.input.keyboard.addKey(13);
        
    }
    
    update(){
    if(this.body.onFloor()){
                 this.firstAnimation = true;
                if(this.heroflying)
                    {
                        
                        this.resetFlight();
                    }
        
                  this.groundControls();
        
                                }else{
                                    
                if(!this.heroflying){
                    
                   this.jumpControls(); 
                    
                   }else{
                       
                   this.flightControls();
                 
       
                       }
                    
                    
                }
        
    }
    groundControls(){
//         console.log(!(this.runShot.isPlaying || this.idleShot.isPlaying));
//         console.log("runshot: " + this.runShot.isPlaying); 
//        console.log("idleshot: " + this.idleShot.isPlaying); 
            if(this.shoot.isDown){
                     this.shotFired();
//                    (this.body.velocity.x != 0)? this.runShot.play() : this.idleShot.play();
                
                        
                         }
                     
            if(this.moveRight.isDown){
                if(!(this.runShot.isPlaying || this.idleShot.isPlaying )){
                        this.play('run');
                    }
                this.body.velocity.x = this.charecterspeed;
                this.scale.x = 1;
       }else if(this.moveLeft.isDown){
                this.body.velocity.x = -this.charecterspeed;  
                this.scale.x = -1;
                    if(!(this.runShot.isPlaying || this.idleShot.isPlaying)){
                        this.play('run');
                    }
                    }else{
                       this.body.velocity.x = 0;
                    if(!(this.runShot.isPlaying || this.idleShot.isPlaying || this.runShotStop.isPlaying)){
                        this.play('idle');
                    }else{
                        if(this.runShot.isPlaying){
                            this.runShot.stop();
                            this.runShotStop.play();
                            console.log("runstop");
                        }
                        
                    }
                    } 
                if(this.jump.isDown){
                    this.body.velocity.y = -400;
                   }
                 if (this.jetmode.isDown) { 
                    this.body.velocity.y = -400;
                  this.game.time.events.add(Phaser.Timer.SECOND * .1, this.startFlight, this);
                     this.flightDelay = this.game.time.now + 600;
                 
                 }
    }
    
    jumpControls(){
                if(this.firstAnimation){
               this.play('jump');  
                    this.firstAnimation = false;
                }    
                    
            if(this.moveRight.isDown){
                       this.body.velocity.x = this.charecterspeed;

                this.scale.x = 1;
                }
                else if(this.moveLeft.isDown){
                       this.body.velocity.x = -this.charecterspeed;

                this.scale.x = -1;
                }else{

                this.body.velocity.x = 0;
                }
                if (this.jetmode.isDown) {
                    if(this.game.time.now > this.flightDelay){
                 
                        this.startFlight();
                }
                } 
                    
                  if(this.shoot.isDown){
                     this.play('jump_fire');
                       this.shotFired();
                  } 
    }
    
    flightControls(){
        
                     
        
                   if(this.shoot.isDown){
                        this.airShot();
                   }
                      
                   var dir = (this.scale.x > 0) ? 1 : -1;
                       if(this.jump.isDown){
                       this.angle-=1*(dir);
                   }
                         if(this.moveDown.isDown){
                       this.angle+=1*(dir);
                         }
                      if(!this.flightSequenceInit){
                       this.flightSequence(dir);
                      }
                        
                     this.game.physics.arcade.velocityFromRotation(this.rotation + this.rotationSeq, (this.jetpackSpeed + this.jetBoost) * (dir), this.body.velocity);
                       
                    if (this.jetmode.isDown) {
                        
                        if(this.game.time.now > this.flightDelay){
                            this.play('jump');  
                            this.resetFlight();
                            this.flightDelay = this.game.time.now + 600;
                            
//                          this.jetAudio.stop();
                        }
                   }
        

        
        
    }
    
    resetFlight(){
        //                  this.jetAudio.stop();
                            this.heroflying = false;
                            this.angle = 0;
                            this.angleCount = 0;
                            this.flightSequenceInit = false;
                            this.takeOffComplete = false;
                            this.rotationSeq = 0;
                            this.jetBoost = 0;   
                            this.game.physics.arcade.velocityFromRotation(this.rotation, 0, this.body.velocity);    
    }
    
    shotFired(){
    
            if(this.game.time.now > this.nextShot ){
                this.nextShot = this.game.time.now + Phaser.Timer.SECOND * this.shotInterval;
                
                var dir = (this.scale.x > 0) ? 1 : -1;
                var bullet = this.bullets.getFirstDead();
                if(bullet){
                    bullet.x =  this.x + (dir * 25);
                    bullet.y = this.y;
                    bullet.angle = 0;
                    this.game.physics.arcade.velocityFromRotation(this.rotation, 0, bullet.body.velocity);
                    bullet.revive();    
                }else{
                bullet = this.bullets.create(this.x + (dir * 25),this.y,'bullet');
                this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
				bullet.outOfBoundsKill = true;
	    		bullet.checkWorldBounds = true;
                }
                bullet.body.velocity.x = dir * this.shotSpeed;  
                
                //animations for shots
                   if(this.body.velocity.x === 0){
                   this.idleShot.play(); 
                }else {
                   this.runShot.play();
                }
         }
        }

    airShot(){
        
        if(this.game.time.now > this.nextShot){
            this.nextShot = this.game.time.now + Phaser.Timer.SECOND * this.shotInterval;
             this.play('jetpack_fire'); 
             this.animations.currentAnim.onComplete.add(function () {	this.play('jetpack'); }, this);
            
             var dir = (this.scale.x > 0) ? 1 : -1;
            var p = new Phaser.Point(this.x, this.y); 
          p.rotate(p.x, p.y, this.rotation, false, (40*dir));
          var bullet = this.bullets.getFirstDead();
            if(bullet){
                bullet.x = p.x;
                bullet.y = p.y;
                bullet.revive();
            }else{
                var bullet = this.bullets.create(p.x,p.y,'bullet');
                this.game.physics.arcade.enable(bullet);
                 bullet.outOfBoundsKill = true;
	    		bullet.checkWorldBounds = true;
             }
                bullet.scale.x = dir;
                bullet.angle = this.angle + ((-18)*dir);
                this.game.physics.arcade.velocityFromRotation(this.rotation + this.rotationSeq, this.shotSpeed * dir, bullet.body.velocity);
           }
        }  
    
    flightSequence(dir){
         if(this.game.time.now > this.flightWarmUp)
                        {
                            this.flightWarmUp = this.game.time.now + Phaser.Timer.SECOND * .1;
                            this.angleCount++;
                            this.angle+=1*(dir);
                            this.rotationSeq -= ((.36/18)*(dir));
                            this.jetBoost += 25;
                            if(this.angleCount == 18){
                            this.flightSequenceInit = true;
                            this.angleCount = 0;
                            }
                        }
    
    }
    
    startFlight(){
                           this.play('jetpack');
                   this.heroflying = true;
                   this.flightDelay = this.game.time.now + 600;
//                    this.jetAudio.play('',0,1,true);    
        
    }
    
    
}
