/* global Phaser */

import Player from "../prefabs/Player.js";
import Enemy from  "../prefabs/Enemy.js";
import HealthBar from "../prefabs/HealthBar.js";

export default class Game extends Phaser.State {
    
    constructor() {
        super();

    }
    preload(){
                this.load.image('tileset','assets/Tiles_32x32.png');
            this.load.tilemap('mytilemap','assets/platform.json', null, Phaser.Tilemap.TILED_JSON);    
        
    }
    
    create() {
        
         this.myTiles = this.game.add.tilemap('mytilemap');
            this.myTiles.addTilesetImage('platforms', 'tileset');
            this.myTiles.setCollisionBetween(1,63);
            this.mytileslayer = this.myTiles.createLayer('blocks');
            this.mygemlayer = this.myTiles.createLayer('gems');
            this.mytileslayer.resizeWorld();    
        
    this.playerBullets = this.add.group();
    this.playerBullets.enableBody = true;
    this.playerBullets.physicsBodyType = Phaser.Physics.ARCADE;
        
     this.enemyBullets = this.add.group();
    this.enemyBullets.enableBody = true;
    this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
            
   this.mainCharecter = new Player(this.game, 400, 50, this.playerBullets);
    this.game.add.existing(this.mainCharecter);
        this.game.camera.follow(this.mainCharecter);
        
        //place enemies
   this.enemies = this.add.group();
   this.myTiles.createFromObjects('Enemies', 236, 'null', 'null', true, false, this.enemies, Enemy);
        this.enemies.setAll('player', this.mainCharecter);
        this.enemies.setAll('bullets', this.enemyBullets);
        this.enemies.setAll('layer', this.mytileslayer);
            this.collectSound = this.add.audio('collect');
            this.jetAudio = this.add.audio('jets');
            
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
           
            
       
            
            this.coins = this.add.group();
            this.coins.enableBody = true;
            
             this.myTiles.createFromObjects('gems', 115, 'coins', 0, true, false, this.coins);

  //  Add animations to all of the coin sprites
           
    this.coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
    this.coins.callAll('animations.play', 'animations', 'spin');
            
    
                
    
            
            this.setupUI();
           
            
            
   
        
            
  
            
        
    }
    
    update() {
            this.physics.arcade.collide(this.mainCharecter, this.mytileslayer);
            this.physics.arcade.collide(this.enemies, this.mytileslayer);
            this.physics.arcade.collide(this.mainCharecter, this.coins, this.collect , null, this);
            this.physics.arcade.collide(this.enemies, this.playerBullets, this.enemyShot, null, this);
            this.physics.arcade.collide(this.mainCharecter, this.enemyBullets, this.playerShot, null, this);
     
    }
    
    render(){
        
//        this.game.debug.spriteInfo(this.mainCharecter, 20, 32);
//         this.game.debug.geom(this.line);
    }
    
    setupUI() {
        
        this.UILayer = this.add.group();
        
        this.healthBar = new HealthBar(this.game, 120,40, "health_bar", "empty_bar");
        this.healthBar.fixedToCamera = true;
        this.healthBar.cameraOffset.setTo(120, 40);
        
        this.UILayer.add(this.healthBar);
        
        
    }
    
    enemyShot(enemy, bullet){
        console.log(enemy);
        bullet.kill();
        enemy.enemyHealth.current--;
       if(enemy.enemyHealth.current === 0){
           enemy.destroy();

       }
        
        
        
    }
    
    playerShot(player, bullet){
        bullet.kill();
        player.health.current--;
        if(player.health.current > 0){
        this.healthBar.setValue(player.health.current/ player.health.max);
        }
       
        
        
        
    }


    
collect(player,coin){
            coin.kill();
            this.score++;
//            text.text = "Score: " + score;
            this.collectSound.play();
        }
        
    
    
    
}