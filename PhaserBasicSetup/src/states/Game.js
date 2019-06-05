import Player from "../prefab/Player.js";

export default class Game extends Phaser.State {
    
    constructor() {
        
        
        super();
    }
    
    create() {
        this.game.stage.backgroundColor = "#4488AA";
        this.clouds = this.add.group();
        // this.add.sprite(50,100, 'star');
        
        this.score = 0;
        var style = {
            font: '24px Arial', fill : '#FFFFFF'
        };
        this.txtScore = this.add.text(10,10, this.score.toString(), style);
        
        this.star = new Player(this.game, 50, 50);
        
        console.log(this.star);
        
        
    }
    
    update() {
        if(Math.random() < .01){
            var cloud = this.clouds.getFirstDead();
            if(cloud){
                cloud.x = Math.random() * this.game.width;
                cloud.y = Math.random() * this.game.height;
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
        cloud.kill();
        this.score++;
        this.txtScore.setText(this.score.toString());
    }
    
    
}