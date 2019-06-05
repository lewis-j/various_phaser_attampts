export default class Preload {
    
    constructor() {
        this.asset = null;
        this.ready = false;
    }
    
    preload() {
        this.load.image('loading_bg', 'assets/images/loading_bg.jpg');
    }
    
    create() {
        this.add.sprite(0,0, "loading_bg");
        this.asset = this.add.sprite(this.game.width/2, this.game.height/2, "preloader");
        this.asset.anchor.setTo(0.5,0.5);
        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.load.setPreloadSprite(this.asset);
        //load your assets here
        this.load.image('cloud', 'assets/images/cloud.png');
        this.load.image('game_bg', 'assets/images/lightning.jpg');
        this.load.image('sm_cloud',"assets/images/sm_cloud.png");
        this.load.start();
    }
    
    update() {
        if(this.ready){
            this.game.state.start('game');
        }
    }
    
    onLoadComplete() {
        this.ready = true;
    }
}