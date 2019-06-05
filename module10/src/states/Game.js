/* global Phaser */

export default class Game extends Phaser.State {
    
    constructor() {
        
        
        super();
    }
    
    create() {
        this.add.sprite(0,0,'game_bg');
        this.clouds = this.add.group();
        
        this.score = 0;
        var style = {
            font: '24px Arial', fill : '#FFFFFF'
        };
        this.txtScore = this.add.text(10,10, this.score.toString(), style);
        
        
    }
    
    update() {
        if(Math.random() < .01){
            var cloud = this.clouds.getFirstDead();
            if(cloud){
                cloud.x = Math.random() * this.game.width;
                cloud.y = Math.random() * this.game.height;
                cloud.scale.setTo(1,1);
                cloud.revive();
                
            } else {
                
                var cloud = this.clouds.create(Math.random() * this.game.width,Math.random() * this.game.height, 'cloud');
                cloud.inputEnabled = true;
                cloud.events.onInputDown.add(this.onCloudClick, this);
            }  
            
            cloud.alpha = 0;
            this.add.tween(cloud).to({y: "-50", alpha: 1}, 800, Phaser.Easing.Cubic.Out, true);

        }
    }
    
    onCloudClick(cloud) {
        
        if(cloud.scale.x == 1){
            cloud.kill();
            
            for(var i = 0; i < 2; i++){
             var smCloud = this.clouds.getFirstDead();
            if(smCloud){
                smCloud.x = Math.random() * this.game.width;
                smCloud.y = Math.random() * this.game.height;
                smCloud.revive();
                
                
            } else {
                
                var smCloud = this.clouds.create(Math.random() * this.game.width,Math.random() * this.game.height, 'cloud');
                smCloud.inputEnabled = true;
                smCloud.events.onInputDown.add(this.onCloudClick, this);
            }  
            smCloud.scale.setTo(.5,.5);
            smCloud.alpha = 0;
            this.add.tween(smCloud).to({y: "-50", alpha: 1}, 800, Phaser.Easing.Cubic.Out, true);
            }
            
            
        }else{
                 cloud.kill();
        this.score++;
        this.txtScore.setText(this.score.toString());
    var emitter = this.game.add.emitter(cloud.x, cloud.y, 100);
    emitter.makeParticles('sm_cloud');
    emitter.minParticleSpeed.setTo(-200, -200);
    emitter.maxParticleSpeed.setTo(200, 200);
    emitter.gravity = 20;
    emitter.start(true, 500, null, 100);  
            
        }
 
    }
    
    
}