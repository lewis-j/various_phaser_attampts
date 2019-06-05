export default class Enemy extends Phaser.Sprite {
    
    constructor(game, x, y, bullets, player, layer) {
        super(game, x, y, 'enemy_shoot', 0);
        
        this.player = player; 
        this.bullets = bullets;
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.gravity.y = 700;
        this.body.immovable = true;
        this.turn = true;
        this.enemyWalk = 0;
        this.enemy_nextShot = 0;
        
          this.line = new Phaser.Line();
          this.tilesHit = [];
          this.layer = layer;
        
     
        
          this.arm = this.addChild(new Phaser.Sprite(game, 0,0,'arm'));
          this.torso = this.addChild(new Phaser.Sprite(game, 0,0,'body'));
          this.robotRun = this.addChild(new Phaser.Sprite(game, 0,0,'robot_run'));
        
          this.anchor.setTo(.5,.5);
          this.arm.anchor.setTo(0,.5);
          this.torso.anchor.setTo(.5,.5);
          this.robotRun.anchor.setTo(.5,.5);
          this.arm.visible = false;
          this.torso.visible = false;
          this.scale.x = -1;
        
          this.robotRun.animations.add('run',[0,1,2,3,4,5,6,7], 5, true);
          this.robotRun.play('run');
        
        this.enemyHealth = {current: 3, max: 3 };
      
        
    }
    
    
    
 update(){
     
     
           this.line.start.set(this.player.x, this.player.y);
           this.line.end.set(this.x, this.y);
           this.tilesHit = this.layer.getRayCastTiles(this.line, 4, false, true);

            
            if((this.tilesHit.length == 0) && (Phaser.Math.distance(this.player.x,this.player.y,this.x,this.y) < 800)  &&  (((this.scale.x  <  0)  &&  ((this.x - this.player.x)>0) ) || ((this.scale.x  >  0)  &&  ((this.x - this.player.x) < 0) ) )){
                

                this.body.velocity.x = 0;
                this.children[2].visible = false;
                this.children[0].visible = true;
                this.children[1].visible = true;
                
                
                this.enemyShoots();
                
                 
                
            }else if(this.game.time.now > this.enemyWalk){
                
                this.enemyWalk = this.game.time.now + (Phaser.Timer.SECOND * 5);
                
                this.children[2].visible = true;
                this.children[0].visible = false;
                this.children[1].visible = false;
                
                if(this.turn){
                   this.body.velocity.x = 100;
                   this.scale.x = 1;    
                    this.turn = false;
                }else{
                    this.body.velocity.x = -100;
                    this.scale.x = -1;
                    this.turn = true;
                }
               
            }
     
     
     
     
 }  
    
    enemyShoots(){
        
         
                
                var dir = (this.scale.x > 0) ? 1 : -1;
                   this.children[0].rotation =  dir * (Math.atan((this.y - this.player.y)/(this.x - this.player.x)));
                   var p = new Phaser.Point(this.x, this.y); 
                   p.rotate(p.x, p.y, (this.children[0].rotation - .05)* dir, false, (this.scale.x > 0) ? 25 : -50);
        
                if(this.game.time.now > this.enemy_nextShot){
                this.enemy_nextShot = this.game.time.now + (Phaser.Timer.SECOND * 1);
                 
                 
                var bullet = this.bullets.getFirstDead();
                 if(bullet){
                  bullet.x = p.x;
                  bullet.y = p.y;
                  bullet.revive();
                 }else{
                bullet = this.bullets.create(p.x,p.y,'bullet');
                this.game.physics.arcade.enable(bullet);   
                bullet.outOfBoundsKill = true;
	    		bullet.checkWorldBounds = true;
                 }
                bullet.angle = this.children[0].angle * dir;
                this.game.physics.arcade.velocityFromRotation((this.children[0].rotation * dir), (700 * dir), bullet.body.velocity);
                    
                    
                }
        
    }
}