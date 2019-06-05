
export default class Preload {
    
    constructor() {
        this.asset = null;
        this.ready = false;
    }
    
    preload() {
        this.load.image('loading_bg', 'assets/img/loading_bg.jpg');
    }
    
    create() {
        this.add.sprite(0,0, "loading_bg");
        this.asset = this.add.sprite(this.game.width/2, this.game.height/2, "preloader");
        this.asset.anchor.setTo(0.5,0.5);
        this.load.onLoadStart.add(this.onLoadStart,this);
        this.load.onLoadComplete.add(this.onLoadComplete, this);
        this.load.setPreloadSprite(this.asset);

            
            this.load.start();
    }
    
    update() {
        console.log("notready");
        if(this.ready){
            console.log("ready");
            this.game.state.start('game');
        }
    }
    onLoadStart() {
               //load your assets here
            this.load.spritesheet('ninja','assets/img/ninja2.png', 90, 90);
            this.load.spritesheet('coins','assets/img/coins.png',50, 49);
            this.load.spritesheet('robot_run','assets/img/robot_run.png',92, 90);
            this.load.image('bullet','assets/img/Bullet01.png');
            this.load.image('enemy_shoot','assets/img/robot_place.png');
            this.load.image('body','assets/img/robot_body.png');
            this.load.image('arm','assets/img/robot_arm.png');
            this.load.image('empty_bar','assets/img/EmptyBar.png');
            this.load.image('health_bar','assets/img/RedBar.png');
//            this.load.image('tileset','assets/Tiles_32x32.png');
//            this.load.tilemap('mytilemap','assets/platform.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.audio('collect','assets/audio/UI_Electric_08.mp3');
            this.load.audio('jets','assets/audio/jet_sound.mp3'); 
    }
    
    onLoadComplete() {
        this.ready = true;
    }
}