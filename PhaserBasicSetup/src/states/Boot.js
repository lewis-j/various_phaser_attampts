export default class Boot {
    
    preload() {
        this.load.image('preloader', 'assets/images/loading_bar.png');
          this.load.image('star','assets/images/star.jpg');
    }
    
    create() {
        this.game.input.maxPointer = 1;
        this.game.state.start('preload');
    }
    
    
}