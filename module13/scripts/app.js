(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*global Phaser*/
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _statesBootJs = require("./states/Boot.js");

var _statesBootJs2 = _interopRequireDefault(_statesBootJs);

var _statesPreloadJs = require("./states/Preload.js");

var _statesPreloadJs2 = _interopRequireDefault(_statesPreloadJs);

var _statesGameJs = require("./states/Game.js");

var _statesGameJs2 = _interopRequireDefault(_statesGameJs);

var game;

window.onload = function () {
    game = new Phaser.Game(1200, 800);
    game.state.add('boot', _statesBootJs2["default"]);
    game.state.add('preload', _statesPreloadJs2["default"]);
    game.state.add('game', _statesGameJs2["default"]);
    game.state.start('boot');
};

},{"./states/Boot.js":5,"./states/Game.js":6,"./states/Preload.js":7}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Enemy = (function (_Phaser$Sprite) {
    _inherits(Enemy, _Phaser$Sprite);

    function Enemy(game, x, y, bullets, player, layer) {
        _classCallCheck(this, Enemy);

        _get(Object.getPrototypeOf(Enemy.prototype), 'constructor', this).call(this, game, x, y, 'enemy_shoot', 0);

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

        this.arm = this.addChild(new Phaser.Sprite(game, 0, 0, 'arm'));
        this.torso = this.addChild(new Phaser.Sprite(game, 0, 0, 'body'));
        this.robotRun = this.addChild(new Phaser.Sprite(game, 0, 0, 'robot_run'));

        this.anchor.setTo(.5, .5);
        this.arm.anchor.setTo(0, .5);
        this.torso.anchor.setTo(.5, .5);
        this.robotRun.anchor.setTo(.5, .5);
        this.arm.visible = false;
        this.torso.visible = false;
        this.scale.x = -1;

        this.robotRun.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7], 5, true);
        this.robotRun.play('run');

        this.enemyHealth = { current: 3, max: 3 };
    }

    _createClass(Enemy, [{
        key: 'update',
        value: function update() {

            this.line.start.set(this.player.x, this.player.y);
            this.line.end.set(this.x, this.y);
            this.tilesHit = this.layer.getRayCastTiles(this.line, 4, false, true);

            if (this.tilesHit.length == 0 && Phaser.Math.distance(this.player.x, this.player.y, this.x, this.y) < 800 && (this.scale.x < 0 && this.x - this.player.x > 0 || this.scale.x > 0 && this.x - this.player.x < 0)) {

                this.body.velocity.x = 0;
                this.children[2].visible = false;
                this.children[0].visible = true;
                this.children[1].visible = true;

                this.enemyShoots();
            } else if (this.game.time.now > this.enemyWalk) {

                this.enemyWalk = this.game.time.now + Phaser.Timer.SECOND * 5;

                this.children[2].visible = true;
                this.children[0].visible = false;
                this.children[1].visible = false;

                if (this.turn) {
                    this.body.velocity.x = 100;
                    this.scale.x = 1;
                    this.turn = false;
                } else {
                    this.body.velocity.x = -100;
                    this.scale.x = -1;
                    this.turn = true;
                }
            }
        }
    }, {
        key: 'enemyShoots',
        value: function enemyShoots() {

            var dir = this.scale.x > 0 ? 1 : -1;
            this.children[0].rotation = dir * Math.atan((this.y - this.player.y) / (this.x - this.player.x));
            var p = new Phaser.Point(this.x, this.y);
            p.rotate(p.x, p.y, (this.children[0].rotation - .05) * dir, false, this.scale.x > 0 ? 25 : -50);

            if (this.game.time.now > this.enemy_nextShot) {
                this.enemy_nextShot = this.game.time.now + Phaser.Timer.SECOND * 1;

                var bullet = this.bullets.getFirstDead();
                if (bullet) {
                    bullet.x = p.x;
                    bullet.y = p.y;
                    bullet.revive();
                } else {
                    bullet = this.bullets.create(p.x, p.y, 'bullet');
                    this.game.physics.arcade.enable(bullet);
                    bullet.outOfBoundsKill = true;
                    bullet.checkWorldBounds = true;
                }
                bullet.angle = this.children[0].angle * dir;
                this.game.physics.arcade.velocityFromRotation(this.children[0].rotation * dir, 700 * dir, bullet.body.velocity);
            }
        }
    }]);

    return Enemy;
})(Phaser.Sprite);

exports['default'] = Enemy;
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HealthBar = (function (_Phaser$Group) {
    _inherits(HealthBar, _Phaser$Group);

    function HealthBar(game, xpos, ypos, barGraphic, holderGraphic) {
        _classCallCheck(this, HealthBar);

        _get(Object.getPrototypeOf(HealthBar.prototype), "constructor", this).call(this, game);
        this.x = xpos;
        this.y = ypos;

        this.bar = this.create(0, 0, barGraphic);
        this.holder = this.create(0, 0, holderGraphic);
    }

    _createClass(HealthBar, [{
        key: "setValue",
        value: function setValue(val) {

            if (this.tween) this.tween.stop();
            this.tween = this.game.add.tween(this.bar.scale);
            this.tween.to({ x: val }, 350);
            this.tween.start();
        }
    }]);

    return HealthBar;
})(Phaser.Group);

exports["default"] = HealthBar;
module.exports = exports["default"];

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Player = (function (_Phaser$Sprite) {
    _inherits(Player, _Phaser$Sprite);

    function Player(game, x, y, bullets) {
        _classCallCheck(this, Player);

        _get(Object.getPrototypeOf(Player.prototype), 'constructor', this).call(this, game, x, y, 'ninja', 0);
        this.jetpackSpeed = 50;
        this.heroflying = false;
        this.firstAnimation = true;
        this.takeOffComplete = false;
        this.flightSequenceInit = false;
        this.shotSpeed = 1500;
        this.bullets = bullets;
        this.shotInterval = .5;

        this.health = { max: 10, current: 10 };

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

        this.animations.add('attack', [0, 1, 2, 3, 4, 5], 10, true);
        this.animations.add('die', [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], 10, true);
        this.animations.add('dizzy', [18, 19, 20, 21], 10, true);
        this.idle = this.animations.add('idle', [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33], 10, true);
        this.animations.add('jetpack', [34, 35, 36, 37, 38, 39, 40, 41], 10, true);
        this.animations.add('jump', [42, 43, 44, 45, 46, 47], 10, false);
        this.animations.add('roll', [48, 49, 50, 51, 52, 53, 54, 55], 10, true);
        this.animations.add('run', [56, 57, 58, 59, 60, 61, 62, 63, 64, 65], 10, false);
        this.runShot = this.animations.add('run_with_gun', [66, 67, 68, 69, 70, 71, 72, 73, 74, 75], 10, false);
        this.idleShot = this.animations.add('shot', [76, 77, 78, 79, 80], 10, false);
        this.runShotStop = this.animations.add('shotStop', [79, 80], 8, false);
        this.animations.add('sliding', [81, 82, 83, 84, 85, 86], 10, true);
        this.animations.add('throwing', [87, 88, 89, 90, 91, 92], 10, true);
        this.animations.add('jetpack_fire', [93, 94, 95, 96, 97], 10, false);
        this.animations.add('jump_fire', [98, 99, 100, 101, 102], 10, false);

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

    _createClass(Player, [{
        key: 'update',
        value: function update() {
            if (this.body.onFloor()) {
                this.firstAnimation = true;
                if (this.heroflying) {

                    this.resetFlight();
                }

                this.groundControls();
            } else {

                if (!this.heroflying) {

                    this.jumpControls();
                } else {

                    this.flightControls();
                }
            }
        }
    }, {
        key: 'groundControls',
        value: function groundControls() {
            //         console.log(!(this.runShot.isPlaying || this.idleShot.isPlaying));
            //         console.log("runshot: " + this.runShot.isPlaying);
            //        console.log("idleshot: " + this.idleShot.isPlaying);
            if (this.shoot.isDown) {
                this.shotFired();
                //                    (this.body.velocity.x != 0)? this.runShot.play() : this.idleShot.play();
            }

            if (this.moveRight.isDown) {
                if (!(this.runShot.isPlaying || this.idleShot.isPlaying)) {
                    this.play('run');
                }
                this.body.velocity.x = this.charecterspeed;
                this.scale.x = 1;
            } else if (this.moveLeft.isDown) {
                this.body.velocity.x = -this.charecterspeed;
                this.scale.x = -1;
                if (!(this.runShot.isPlaying || this.idleShot.isPlaying)) {
                    this.play('run');
                }
            } else {
                this.body.velocity.x = 0;
                if (!(this.runShot.isPlaying || this.idleShot.isPlaying || this.runShotStop.isPlaying)) {
                    this.play('idle');
                } else {
                    if (this.runShot.isPlaying) {
                        this.runShot.stop();
                        this.runShotStop.play();
                        console.log("runstop");
                    }
                }
            }
            if (this.jump.isDown) {
                this.body.velocity.y = -400;
            }
            if (this.jetmode.isDown) {
                this.body.velocity.y = -400;
                this.game.time.events.add(Phaser.Timer.SECOND * .1, this.startFlight, this);
                this.flightDelay = this.game.time.now + 600;
            }
        }
    }, {
        key: 'jumpControls',
        value: function jumpControls() {
            if (this.firstAnimation) {
                this.play('jump');
                this.firstAnimation = false;
            }

            if (this.moveRight.isDown) {
                this.body.velocity.x = this.charecterspeed;

                this.scale.x = 1;
            } else if (this.moveLeft.isDown) {
                this.body.velocity.x = -this.charecterspeed;

                this.scale.x = -1;
            } else {

                this.body.velocity.x = 0;
            }
            if (this.jetmode.isDown) {
                if (this.game.time.now > this.flightDelay) {

                    this.startFlight();
                }
            }

            if (this.shoot.isDown) {
                this.play('jump_fire');
                this.shotFired();
            }
        }
    }, {
        key: 'flightControls',
        value: function flightControls() {

            if (this.shoot.isDown) {
                this.airShot();
            }

            var dir = this.scale.x > 0 ? 1 : -1;
            if (this.jump.isDown) {
                this.angle -= 1 * dir;
            }
            if (this.moveDown.isDown) {
                this.angle += 1 * dir;
            }
            if (!this.flightSequenceInit) {
                this.flightSequence(dir);
            }

            this.game.physics.arcade.velocityFromRotation(this.rotation + this.rotationSeq, (this.jetpackSpeed + this.jetBoost) * dir, this.body.velocity);

            if (this.jetmode.isDown) {

                if (this.game.time.now > this.flightDelay) {
                    this.play('jump');
                    this.resetFlight();
                    this.flightDelay = this.game.time.now + 600;

                    //                          this.jetAudio.stop();
                }
            }
        }
    }, {
        key: 'resetFlight',
        value: function resetFlight() {
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
    }, {
        key: 'shotFired',
        value: function shotFired() {

            if (this.game.time.now > this.nextShot) {
                this.nextShot = this.game.time.now + Phaser.Timer.SECOND * this.shotInterval;

                var dir = this.scale.x > 0 ? 1 : -1;
                var bullet = this.bullets.getFirstDead();
                if (bullet) {
                    bullet.x = this.x + dir * 25;
                    bullet.y = this.y;
                    bullet.angle = 0;
                    this.game.physics.arcade.velocityFromRotation(this.rotation, 0, bullet.body.velocity);
                    bullet.revive();
                } else {
                    bullet = this.bullets.create(this.x + dir * 25, this.y, 'bullet');
                    this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
                    bullet.outOfBoundsKill = true;
                    bullet.checkWorldBounds = true;
                }
                bullet.body.velocity.x = dir * this.shotSpeed;

                //animations for shots
                if (this.body.velocity.x === 0) {
                    this.idleShot.play();
                } else {
                    this.runShot.play();
                }
            }
        }
    }, {
        key: 'airShot',
        value: function airShot() {

            if (this.game.time.now > this.nextShot) {
                this.nextShot = this.game.time.now + Phaser.Timer.SECOND * this.shotInterval;
                this.play('jetpack_fire');
                this.animations.currentAnim.onComplete.add(function () {
                    this.play('jetpack');
                }, this);

                var dir = this.scale.x > 0 ? 1 : -1;
                var p = new Phaser.Point(this.x, this.y);
                p.rotate(p.x, p.y, this.rotation, false, 40 * dir);
                var bullet = this.bullets.getFirstDead();
                if (bullet) {
                    bullet.x = p.x;
                    bullet.y = p.y;
                    bullet.revive();
                } else {
                    var bullet = this.bullets.create(p.x, p.y, 'bullet');
                    this.game.physics.arcade.enable(bullet);
                    bullet.outOfBoundsKill = true;
                    bullet.checkWorldBounds = true;
                }
                bullet.scale.x = dir;
                bullet.angle = this.angle + -18 * dir;
                this.game.physics.arcade.velocityFromRotation(this.rotation + this.rotationSeq, this.shotSpeed * dir, bullet.body.velocity);
            }
        }
    }, {
        key: 'flightSequence',
        value: function flightSequence(dir) {
            if (this.game.time.now > this.flightWarmUp) {
                this.flightWarmUp = this.game.time.now + Phaser.Timer.SECOND * .1;
                this.angleCount++;
                this.angle += 1 * dir;
                this.rotationSeq -= .36 / 18 * dir;
                this.jetBoost += 25;
                if (this.angleCount == 18) {
                    this.flightSequenceInit = true;
                    this.angleCount = 0;
                }
            }
        }
    }, {
        key: 'startFlight',
        value: function startFlight() {
            this.play('jetpack');
            this.heroflying = true;
            this.flightDelay = this.game.time.now + 600;
            //                    this.jetAudio.play('',0,1,true);  
        }
    }]);

    return Player;
})(Phaser.Sprite);

exports['default'] = Player;
module.exports = exports['default'];

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Boot = (function () {
    function Boot() {
        _classCallCheck(this, Boot);
    }

    _createClass(Boot, [{
        key: 'preload',
        value: function preload() {
            this.load.image('preloader', 'assets/img/loading_bar.png');
        }
    }, {
        key: 'create',
        value: function create() {
            this.game.input.maxPointer = 1;
            this.game.state.start('preload');
        }
    }]);

    return Boot;
})();

exports['default'] = Boot;
module.exports = exports['default'];

},{}],6:[function(require,module,exports){
/* global Phaser */

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _prefabsPlayerJs = require("../prefabs/Player.js");

var _prefabsPlayerJs2 = _interopRequireDefault(_prefabsPlayerJs);

var _prefabsEnemyJs = require("../prefabs/Enemy.js");

var _prefabsEnemyJs2 = _interopRequireDefault(_prefabsEnemyJs);

var _prefabsHealthBarJs = require("../prefabs/HealthBar.js");

var _prefabsHealthBarJs2 = _interopRequireDefault(_prefabsHealthBarJs);

var Game = (function (_Phaser$State) {
    _inherits(Game, _Phaser$State);

    function Game() {
        _classCallCheck(this, Game);

        _get(Object.getPrototypeOf(Game.prototype), "constructor", this).call(this);
    }

    _createClass(Game, [{
        key: "preload",
        value: function preload() {
            this.load.image('tileset', 'assets/Tiles_32x32.png');
            this.load.tilemap('mytilemap', 'assets/platform.json', null, Phaser.Tilemap.TILED_JSON);
        }
    }, {
        key: "create",
        value: function create() {

            this.myTiles = this.game.add.tilemap('mytilemap');
            this.myTiles.addTilesetImage('platforms', 'tileset');
            this.myTiles.setCollisionBetween(1, 63);
            this.mytileslayer = this.myTiles.createLayer('blocks');
            this.mygemlayer = this.myTiles.createLayer('gems');
            this.mytileslayer.resizeWorld();

            this.playerBullets = this.add.group();
            this.playerBullets.enableBody = true;
            this.playerBullets.physicsBodyType = Phaser.Physics.ARCADE;

            this.enemyBullets = this.add.group();
            this.enemyBullets.enableBody = true;
            this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;

            this.mainCharecter = new _prefabsPlayerJs2["default"](this.game, 400, 50, this.playerBullets);
            this.game.add.existing(this.mainCharecter);
            this.game.camera.follow(this.mainCharecter);

            //place enemies
            this.enemies = this.add.group();
            this.myTiles.createFromObjects('Enemies', 236, 'null', 'null', true, false, this.enemies, _prefabsEnemyJs2["default"]);
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
    }, {
        key: "update",
        value: function update() {
            this.physics.arcade.collide(this.mainCharecter, this.mytileslayer);
            this.physics.arcade.collide(this.enemies, this.mytileslayer);
            this.physics.arcade.collide(this.mainCharecter, this.coins, this.collect, null, this);
            this.physics.arcade.collide(this.enemies, this.playerBullets, this.enemyShot, null, this);
            this.physics.arcade.collide(this.mainCharecter, this.enemyBullets, this.playerShot, null, this);
        }
    }, {
        key: "render",
        value: function render() {

            //        this.game.debug.spriteInfo(this.mainCharecter, 20, 32);
            //         this.game.debug.geom(this.line);
        }
    }, {
        key: "setupUI",
        value: function setupUI() {

            this.UILayer = this.add.group();

            this.healthBar = new _prefabsHealthBarJs2["default"](this.game, 120, 40, "health_bar", "empty_bar");
            this.healthBar.fixedToCamera = true;
            this.healthBar.cameraOffset.setTo(120, 40);

            this.UILayer.add(this.healthBar);
        }
    }, {
        key: "enemyShot",
        value: function enemyShot(enemy, bullet) {
            console.log(enemy);
            bullet.kill();
            enemy.enemyHealth.current--;
            if (enemy.enemyHealth.current === 0) {
                enemy.destroy();
            }
        }
    }, {
        key: "playerShot",
        value: function playerShot(player, bullet) {
            bullet.kill();
            player.health.current--;
            if (player.health.current > 0) {
                this.healthBar.setValue(player.health.current / player.health.max);
            }
        }
    }, {
        key: "collect",
        value: function collect(player, coin) {
            coin.kill();
            this.score++;
            //            text.text = "Score: " + score;
            this.collectSound.play();
        }
    }]);

    return Game;
})(Phaser.State);

exports["default"] = Game;
module.exports = exports["default"];

},{"../prefabs/Enemy.js":2,"../prefabs/HealthBar.js":3,"../prefabs/Player.js":4}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Preload = (function () {
    function Preload() {
        _classCallCheck(this, Preload);

        this.asset = null;
        this.ready = false;
    }

    _createClass(Preload, [{
        key: 'preload',
        value: function preload() {
            this.load.image('loading_bg', 'assets/img/loading_bg.jpg');
        }
    }, {
        key: 'create',
        value: function create() {
            this.add.sprite(0, 0, "loading_bg");
            this.asset = this.add.sprite(this.game.width / 2, this.game.height / 2, "preloader");
            this.asset.anchor.setTo(0.5, 0.5);
            this.load.onLoadStart.add(this.onLoadStart, this);
            this.load.onLoadComplete.add(this.onLoadComplete, this);
            this.load.setPreloadSprite(this.asset);

            this.load.start();
        }
    }, {
        key: 'update',
        value: function update() {
            console.log("notready");
            if (this.ready) {
                console.log("ready");
                this.game.state.start('game');
            }
        }
    }, {
        key: 'onLoadStart',
        value: function onLoadStart() {
            //load your assets here
            this.load.spritesheet('ninja', 'assets/img/ninja2.png', 90, 90);
            this.load.spritesheet('coins', 'assets/img/coins.png', 50, 49);
            this.load.spritesheet('robot_run', 'assets/img/robot_run.png', 92, 90);
            this.load.image('bullet', 'assets/img/Bullet01.png');
            this.load.image('enemy_shoot', 'assets/img/robot_place.png');
            this.load.image('body', 'assets/img/robot_body.png');
            this.load.image('arm', 'assets/img/robot_arm.png');
            this.load.image('empty_bar', 'assets/img/EmptyBar.png');
            this.load.image('health_bar', 'assets/img/RedBar.png');
            //            this.load.image('tileset','assets/Tiles_32x32.png');
            //            this.load.tilemap('mytilemap','assets/platform.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.audio('collect', 'assets/audio/UI_Electric_08.mp3');
            this.load.audio('jets', 'assets/audio/jet_sound.mp3');
        }
    }, {
        key: 'onLoadComplete',
        value: function onLoadComplete() {
            this.ready = true;
        }
    }]);

    return Preload;
})();

exports['default'] = Preload;
module.exports = exports['default'];

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS91YnVudHUvd29ya3NwYWNlL21vZHVsZTEzL3NyYy9hcHAuanMiLCIvaG9tZS91YnVudHUvd29ya3NwYWNlL21vZHVsZTEzL3NyYy9wcmVmYWJzL0VuZW15LmpzIiwiL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9tb2R1bGUxMy9zcmMvcHJlZmFicy9IZWFsdGhCYXIuanMiLCIvaG9tZS91YnVudHUvd29ya3NwYWNlL21vZHVsZTEzL3NyYy9wcmVmYWJzL1BsYXllci5qcyIsIi9ob21lL3VidW50dS93b3Jrc3BhY2UvbW9kdWxlMTMvc3JjL3N0YXRlcy9Cb290LmpzIiwiL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9tb2R1bGUxMy9zcmMvc3RhdGVzL0dhbWUuanMiLCIvaG9tZS91YnVudHUvd29ya3NwYWNlL21vZHVsZTEzL3NyYy9zdGF0ZXMvUHJlbG9hZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OzRCQ0dpQixrQkFBa0I7Ozs7K0JBQ2YscUJBQXFCOzs7OzRCQUN4QixrQkFBa0I7Ozs7QUFKbkMsSUFBSSxJQUFJLENBQUM7O0FBTVQsTUFBTSxDQUFDLE1BQU0sR0FBRyxZQUFZO0FBQ3hCLFFBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ2xDLFFBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sNEJBQU8sQ0FBQztBQUM3QixRQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLCtCQUFVLENBQUM7QUFDbkMsUUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSw0QkFBTyxDQUFDO0FBQzdCLFFBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBRTVCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDZG1CLEtBQUs7Y0FBTCxLQUFLOztB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QUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDbEYsWUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3hELFlBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDbkcsWUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMxRSxZQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNoRSxZQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3ZFLFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUMvRSxZQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUN2RyxZQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDeEUsWUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3JFLFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2xFLFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ25FLFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDcEUsWUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFDLEVBQUUsRUFBQyxLQUFLLENBQUMsQ0FBQzs7O0FBVWxFLFlBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbkUsWUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwRSxZQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9ELFlBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbkUsWUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztBQUMxRCxZQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FB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LEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNyRSxnQkFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFDLHlCQUF5QixDQUFDLENBQUM7QUFDcEQsZ0JBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBQyw0QkFBNEIsQ0FBQyxDQUFDO0FBQzVELGdCQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUMsMkJBQTJCLENBQUMsQ0FBQztBQUNwRCxnQkFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFDLDBCQUEwQixDQUFDLENBQUM7QUFDbEQsZ0JBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBQ3ZELGdCQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUMsdUJBQXVCLENBQUMsQ0FBQzs7O0FBR3RELGdCQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUMsaUNBQWlDLENBQUMsQ0FBQztBQUM3RCxnQkFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFDLDRCQUE0QixDQUFDLENBQUM7U0FDNUQ7OztlQUVhLDBCQUFHO0FBQ2IsZ0JBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1NBQ3JCOzs7V0FqRGdCLE9BQU87OztxQkFBUCxPQUFPIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLypnbG9iYWwgUGhhc2VyKi9cbnZhciBnYW1lO1xuXG5pbXBvcnQgQm9vdCBmcm9tIFwiLi9zdGF0ZXMvQm9vdC5qc1wiO1xuaW1wb3J0IFByZWxvYWQgZnJvbSBcIi4vc3RhdGVzL1ByZWxvYWQuanNcIjtcbmltcG9ydCBHYW1lIGZyb20gXCIuL3N0YXRlcy9HYW1lLmpzXCI7XG5cbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZSgxMjAwLCA4MDApO1xuICAgIGdhbWUuc3RhdGUuYWRkKCdib290JywgQm9vdCk7XG4gICAgZ2FtZS5zdGF0ZS5hZGQoJ3ByZWxvYWQnLCBQcmVsb2FkKTtcbiAgICBnYW1lLnN0YXRlLmFkZCgnZ2FtZScsIEdhbWUpO1xuICAgIGdhbWUuc3RhdGUuc3RhcnQoJ2Jvb3QnKTtcbiAgICBcbn07IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW5lbXkgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgYnVsbGV0cywgcGxheWVyLCBsYXllcikge1xyXG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksICdlbmVteV9zaG9vdCcsIDApO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucGxheWVyID0gcGxheWVyOyBcclxuICAgICAgICB0aGlzLmJ1bGxldHMgPSBidWxsZXRzO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmVuYWJsZSh0aGlzLCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xyXG4gICAgICAgIHRoaXMuYm9keS5ncmF2aXR5LnkgPSA3MDA7XHJcbiAgICAgICAgdGhpcy5ib2R5LmltbW92YWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy50dXJuID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmVuZW15V2FsayA9IDA7XHJcbiAgICAgICAgdGhpcy5lbmVteV9uZXh0U2hvdCA9IDA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICB0aGlzLmxpbmUgPSBuZXcgUGhhc2VyLkxpbmUoKTtcclxuICAgICAgICAgIHRoaXMudGlsZXNIaXQgPSBbXTtcclxuICAgICAgICAgIHRoaXMubGF5ZXIgPSBsYXllcjtcclxuICAgICAgICBcclxuICAgICBcclxuICAgICAgICBcclxuICAgICAgICAgIHRoaXMuYXJtID0gdGhpcy5hZGRDaGlsZChuZXcgUGhhc2VyLlNwcml0ZShnYW1lLCAwLDAsJ2FybScpKTtcclxuICAgICAgICAgIHRoaXMudG9yc28gPSB0aGlzLmFkZENoaWxkKG5ldyBQaGFzZXIuU3ByaXRlKGdhbWUsIDAsMCwnYm9keScpKTtcclxuICAgICAgICAgIHRoaXMucm9ib3RSdW4gPSB0aGlzLmFkZENoaWxkKG5ldyBQaGFzZXIuU3ByaXRlKGdhbWUsIDAsMCwncm9ib3RfcnVuJykpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgdGhpcy5hbmNob3Iuc2V0VG8oLjUsLjUpO1xyXG4gICAgICAgICAgdGhpcy5hcm0uYW5jaG9yLnNldFRvKDAsLjUpO1xyXG4gICAgICAgICAgdGhpcy50b3Jzby5hbmNob3Iuc2V0VG8oLjUsLjUpO1xyXG4gICAgICAgICAgdGhpcy5yb2JvdFJ1bi5hbmNob3Iuc2V0VG8oLjUsLjUpO1xyXG4gICAgICAgICAgdGhpcy5hcm0udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy50b3Jzby52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLnNjYWxlLnggPSAtMTtcclxuICAgICAgICBcclxuICAgICAgICAgIHRoaXMucm9ib3RSdW4uYW5pbWF0aW9ucy5hZGQoJ3J1bicsWzAsMSwyLDMsNCw1LDYsN10sIDUsIHRydWUpO1xyXG4gICAgICAgICAgdGhpcy5yb2JvdFJ1bi5wbGF5KCdydW4nKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmVuZW15SGVhbHRoID0ge2N1cnJlbnQ6IDMsIG1heDogMyB9O1xyXG4gICAgICBcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcbiAgICBcclxuIHVwZGF0ZSgpe1xyXG4gICAgIFxyXG4gICAgIFxyXG4gICAgICAgICAgIHRoaXMubGluZS5zdGFydC5zZXQodGhpcy5wbGF5ZXIueCwgdGhpcy5wbGF5ZXIueSk7XHJcbiAgICAgICAgICAgdGhpcy5saW5lLmVuZC5zZXQodGhpcy54LCB0aGlzLnkpO1xyXG4gICAgICAgICAgIHRoaXMudGlsZXNIaXQgPSB0aGlzLmxheWVyLmdldFJheUNhc3RUaWxlcyh0aGlzLmxpbmUsIDQsIGZhbHNlLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZigodGhpcy50aWxlc0hpdC5sZW5ndGggPT0gMCkgJiYgKFBoYXNlci5NYXRoLmRpc3RhbmNlKHRoaXMucGxheWVyLngsdGhpcy5wbGF5ZXIueSx0aGlzLngsdGhpcy55KSA8IDgwMCkgICYmICAoKCh0aGlzLnNjYWxlLnggIDwgIDApICAmJiAgKCh0aGlzLnggLSB0aGlzLnBsYXllci54KT4wKSApIHx8ICgodGhpcy5zY2FsZS54ICA+ICAwKSAgJiYgICgodGhpcy54IC0gdGhpcy5wbGF5ZXIueCkgPCAwKSApICkpe1xyXG4gICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlblsyXS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuWzBdLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlblsxXS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuZW15U2hvb3RzKCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmdhbWUudGltZS5ub3cgPiB0aGlzLmVuZW15V2Fsayl7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5lbXlXYWxrID0gdGhpcy5nYW1lLnRpbWUubm93ICsgKFBoYXNlci5UaW1lci5TRUNPTkQgKiA1KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlblsyXS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRyZW5bMF0udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlblsxXS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMudHVybil7XHJcbiAgICAgICAgICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IDEwMDtcclxuICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhbGUueCA9IDE7ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHVybiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAtMTAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhbGUueCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHVybiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgXHJcbiAgICAgXHJcbiAgICAgXHJcbiAgICAgXHJcbiB9ICBcclxuICAgIFxyXG4gICAgZW5lbXlTaG9vdHMoKXtcclxuICAgICAgICBcclxuICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHZhciBkaXIgPSAodGhpcy5zY2FsZS54ID4gMCkgPyAxIDogLTE7XHJcbiAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuWzBdLnJvdGF0aW9uID0gIGRpciAqIChNYXRoLmF0YW4oKHRoaXMueSAtIHRoaXMucGxheWVyLnkpLyh0aGlzLnggLSB0aGlzLnBsYXllci54KSkpO1xyXG4gICAgICAgICAgICAgICAgICAgdmFyIHAgPSBuZXcgUGhhc2VyLlBvaW50KHRoaXMueCwgdGhpcy55KTsgXHJcbiAgICAgICAgICAgICAgICAgICBwLnJvdGF0ZShwLngsIHAueSwgKHRoaXMuY2hpbGRyZW5bMF0ucm90YXRpb24gLSAuMDUpKiBkaXIsIGZhbHNlLCAodGhpcy5zY2FsZS54ID4gMCkgPyAyNSA6IC01MCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmdhbWUudGltZS5ub3cgPiB0aGlzLmVuZW15X25leHRTaG90KXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5lbXlfbmV4dFNob3QgPSB0aGlzLmdhbWUudGltZS5ub3cgKyAoUGhhc2VyLlRpbWVyLlNFQ09ORCAqIDEpO1xyXG4gICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdmFyIGJ1bGxldCA9IHRoaXMuYnVsbGV0cy5nZXRGaXJzdERlYWQoKTtcclxuICAgICAgICAgICAgICAgICBpZihidWxsZXQpe1xyXG4gICAgICAgICAgICAgICAgICBidWxsZXQueCA9IHAueDtcclxuICAgICAgICAgICAgICAgICAgYnVsbGV0LnkgPSBwLnk7XHJcbiAgICAgICAgICAgICAgICAgIGJ1bGxldC5yZXZpdmUoKTtcclxuICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGJ1bGxldCA9IHRoaXMuYnVsbGV0cy5jcmVhdGUocC54LHAueSwnYnVsbGV0Jyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUuZW5hYmxlKGJ1bGxldCk7ICAgXHJcbiAgICAgICAgICAgICAgICBidWxsZXQub3V0T2ZCb3VuZHNLaWxsID0gdHJ1ZTtcclxuXHQgICAgXHRcdGJ1bGxldC5jaGVja1dvcmxkQm91bmRzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBidWxsZXQuYW5nbGUgPSB0aGlzLmNoaWxkcmVuWzBdLmFuZ2xlICogZGlyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLnZlbG9jaXR5RnJvbVJvdGF0aW9uKCh0aGlzLmNoaWxkcmVuWzBdLnJvdGF0aW9uICogZGlyKSwgKDcwMCAqIGRpciksIGJ1bGxldC5ib2R5LnZlbG9jaXR5KTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYWx0aEJhciBleHRlbmRzIFBoYXNlci5Hcm91cCB7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHhwb3MsIHlwb3MsIGJhckdyYXBoaWMsIGhvbGRlckdyYXBoaWMgKXtcclxuICAgICAgICBzdXBlcihnYW1lKTtcclxuICAgICAgICB0aGlzLng9IHhwb3M7XHJcbiAgICAgICAgdGhpcy55ID0geXBvcztcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmJhciA9IHRoaXMuY3JlYXRlKDAsMCwgYmFyR3JhcGhpYyk7XHJcbiAgICAgICAgdGhpcy5ob2xkZXIgPSB0aGlzLmNyZWF0ZSgwLDAsIGhvbGRlckdyYXBoaWMpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzZXRWYWx1ZSggdmFsICl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy50d2VlbikgdGhpcy50d2Vlbi5zdG9wKCk7XHJcbiAgICAgICAgdGhpcy50d2VlbiA9IHRoaXMuZ2FtZS5hZGQudHdlZW4oIHRoaXMuYmFyLnNjYWxlKTtcclxuICAgICAgICB0aGlzLnR3ZWVuLnRvKHsgeDogdmFsIH0sIDM1MCk7XHJcbiAgICAgICAgdGhpcy50d2Vlbi5zdGFydCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBidWxsZXRzICkge1xyXG4gICAgICAgIHN1cGVyKGdhbWUsIHgsIHksICduaW5qYScsIDApO1xyXG4gICAgICAgIHRoaXMuamV0cGFja1NwZWVkID0gNTA7XHJcbiAgICAgICAgdGhpcy5oZXJvZmx5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5maXJzdEFuaW1hdGlvbiA9IHRydWU7XHJcbiAgICAgICAgdGhpcy50YWtlT2ZmQ29tcGxldGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZsaWdodFNlcXVlbmNlSW5pdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2hvdFNwZWVkID0gMTUwMDtcclxuICAgICAgICB0aGlzLmJ1bGxldHMgPSBidWxsZXRzO1xyXG4gICAgICAgIHRoaXMuc2hvdEludGVydmFsID0gLjU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5oZWFsdGggPSB7IG1heDogMTAsIGN1cnJlbnQ6IDEwfTtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5mbGlnaHREZWxheSA9IDA7XHJcbiAgICAgICAgdGhpcy5jaGFyZWN0ZXJzcGVlZCA9IDUwMDtcclxuICAgICAgICB0aGlzLmZsaWdodFdhcm1VcCA9IDA7XHJcbiAgICAgICAgdGhpcy5hbmdsZUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLnJvdGF0aW9uU2VxID0gMDtcclxuICAgICAgICB0aGlzLmpldEJvb3N0ID0gMDtcclxuICAgICAgICB0aGlzLm5leHRTaG90ID0gMDtcclxuICAgICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmVuYWJsZSh0aGlzLCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgIHRoaXMuYm9keS5ncmF2aXR5LnkgPSA3MDA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICB0aGlzLmFuY2hvci5zZXRUbyguNSwgLjUpO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoJ2F0dGFjaycsIFswLCAxLCAyLCAzLCA0LCA1XSwxMCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoJ2RpZScsIFs2LCA3LCA4LCA5LCAxMCwgMTEsIDEyLCAxMywgMTQsIDE1LCAxNiwgMTddLDEwLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25zLmFkZCgnZGl6enknLCBbMTgsIDE5LCAyMCwgMjFdLDEwLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5pZGxlID0gdGhpcy5hbmltYXRpb25zLmFkZCgnaWRsZScsIFsyMiwgMjMsIDI0LCAyNSwgMjYsIDI3LCAyOCwgMjksIDMwLCAzMSwgMzIsIDMzXSwxMCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoJ2pldHBhY2snLCBbMzQsIDM1LCAzNiwgMzcsIDM4LCAzOSwgNDAsIDQxXSwxMCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoJ2p1bXAnLCBbNDIsIDQzLCA0NCwgNDUsIDQ2LCA0N10sMTAsIGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25zLmFkZCgncm9sbCcsIFs0OCwgNDksIDUwLCA1MSwgNTIsIDUzLCA1NCwgNTVdLDEwLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25zLmFkZCgncnVuJywgWzU2LCA1NywgNTgsIDU5LCA2MCwgNjEsIDYyLCA2MywgNjQsIDY1XSwxMCwgZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLnJ1blNob3QgPSB0aGlzLmFuaW1hdGlvbnMuYWRkKCdydW5fd2l0aF9ndW4nLCBbNjYsIDY3LCA2OCwgNjksIDcwLCA3MSwgNzIsIDczLCA3NCwgNzVdLDEwLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuaWRsZVNob3QgPSB0aGlzLmFuaW1hdGlvbnMuYWRkKCdzaG90JywgWzc2LDc3LDc4LDc5LDgwXSwxMCwgZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLnJ1blNob3RTdG9wID0gdGhpcy5hbmltYXRpb25zLmFkZCgnc2hvdFN0b3AnLCBbNzksODBdLDgsIGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25zLmFkZCgnc2xpZGluZycsIFs4MSwgODIsIDgzLCA4NCwgODUsIDg2XSwxMCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoJ3Rocm93aW5nJywgWzg3LCA4OCwgODksIDkwLCA5MSwgOTJdLDEwLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25zLmFkZCgnamV0cGFja19maXJlJywgWzkzLCA5NCwgOTUsIDk2LCA5N10sMTAsIGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25zLmFkZCgnanVtcF9maXJlJyxbOTgsIDk5LCAxMDAsIDEwMSwgMTAyXSwxMCxmYWxzZSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgLy9yZWdpc3RlcmVkIGlucHV0c1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVMZWZ0ID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmFkZEtleShcIkFcIi5jaGFyQ29kZUF0KDApKTtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlUmlnaHQgPSB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFwiRFwiLmNoYXJDb2RlQXQoMCkpO1xyXG4gICAgICAgICAgICB0aGlzLmp1bXAgPSB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFwiV1wiLmNoYXJDb2RlQXQoMCkpO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVEb3duID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmFkZEtleShcIlNcIi5jaGFyQ29kZUF0KDApKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJzb3IgPSB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQuY3JlYXRlQ3Vyc29yS2V5cygpO1xyXG4gICAgICAgICAgICB0aGlzLmpldG1vZGUgPSB0aGlzLmdhbWUuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KDE2KTtcclxuICAgICAgICAgICAgdGhpcy5zaG9vdCA9IHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5hZGRLZXkoMzIpO1xyXG4gICAgICAgICAgICB0aGlzLnRlc3RzaG90ID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmFkZEtleSgxMyk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVwZGF0ZSgpe1xyXG4gICAgaWYodGhpcy5ib2R5Lm9uRmxvb3IoKSl7XHJcbiAgICAgICAgICAgICAgICAgdGhpcy5maXJzdEFuaW1hdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmhlcm9mbHlpbmcpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldEZsaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgdGhpcy5ncm91bmRDb250cm9scygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKCF0aGlzLmhlcm9mbHlpbmcpe1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgdGhpcy5qdW1wQ29udHJvbHMoKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgIHRoaXMuZmxpZ2h0Q29udHJvbHMoKTtcclxuICAgICAgICAgICAgICAgICBcclxuICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuICAgIGdyb3VuZENvbnRyb2xzKCl7XHJcbi8vICAgICAgICAgY29uc29sZS5sb2coISh0aGlzLnJ1blNob3QuaXNQbGF5aW5nIHx8IHRoaXMuaWRsZVNob3QuaXNQbGF5aW5nKSk7XHJcbi8vICAgICAgICAgY29uc29sZS5sb2coXCJydW5zaG90OiBcIiArIHRoaXMucnVuU2hvdC5pc1BsYXlpbmcpOyBcclxuLy8gICAgICAgIGNvbnNvbGUubG9nKFwiaWRsZXNob3Q6IFwiICsgdGhpcy5pZGxlU2hvdC5pc1BsYXlpbmcpOyBcclxuICAgICAgICAgICAgaWYodGhpcy5zaG9vdC5pc0Rvd24pe1xyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3RGaXJlZCgpO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgKHRoaXMuYm9keS52ZWxvY2l0eS54ICE9IDApPyB0aGlzLnJ1blNob3QucGxheSgpIDogdGhpcy5pZGxlU2hvdC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZih0aGlzLm1vdmVSaWdodC5pc0Rvd24pe1xyXG4gICAgICAgICAgICAgICAgaWYoISh0aGlzLnJ1blNob3QuaXNQbGF5aW5nIHx8IHRoaXMuaWRsZVNob3QuaXNQbGF5aW5nICkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXkoJ3J1bicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ID0gdGhpcy5jaGFyZWN0ZXJzcGVlZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NhbGUueCA9IDE7XHJcbiAgICAgICB9ZWxzZSBpZih0aGlzLm1vdmVMZWZ0LmlzRG93bil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IC10aGlzLmNoYXJlY3RlcnNwZWVkOyAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjYWxlLnggPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICBpZighKHRoaXMucnVuU2hvdC5pc1BsYXlpbmcgfHwgdGhpcy5pZGxlU2hvdC5pc1BsYXlpbmcpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5KCdydW4nKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCEodGhpcy5ydW5TaG90LmlzUGxheWluZyB8fCB0aGlzLmlkbGVTaG90LmlzUGxheWluZyB8fCB0aGlzLnJ1blNob3RTdG9wLmlzUGxheWluZykpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXkoJ2lkbGUnKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5ydW5TaG90LmlzUGxheWluZyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1blNob3Quc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW5TaG90U3RvcC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJ1bnN0b3BcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmp1bXAuaXNEb3duKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueSA9IC00MDA7XHJcbiAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgaWYgKHRoaXMuamV0bW9kZS5pc0Rvd24pIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSAtNDAwO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmdhbWUudGltZS5ldmVudHMuYWRkKFBoYXNlci5UaW1lci5TRUNPTkQgKiAuMSwgdGhpcy5zdGFydEZsaWdodCwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmxpZ2h0RGVsYXkgPSB0aGlzLmdhbWUudGltZS5ub3cgKyA2MDA7XHJcbiAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBqdW1wQ29udHJvbHMoKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuZmlyc3RBbmltYXRpb24pe1xyXG4gICAgICAgICAgICAgICB0aGlzLnBsYXkoJ2p1bXAnKTsgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RBbmltYXRpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHRoaXMubW92ZVJpZ2h0LmlzRG93bil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSB0aGlzLmNoYXJlY3RlcnNwZWVkO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2NhbGUueCA9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXMubW92ZUxlZnQuaXNEb3duKXtcclxuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IC10aGlzLmNoYXJlY3RlcnNwZWVkO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2NhbGUueCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuamV0bW9kZS5pc0Rvd24pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmdhbWUudGltZS5ub3cgPiB0aGlzLmZsaWdodERlbGF5KXtcclxuICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydEZsaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgaWYodGhpcy5zaG9vdC5pc0Rvd24pe1xyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXkoJ2p1bXBfZmlyZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdEZpcmVkKCk7XHJcbiAgICAgICAgICAgICAgICAgIH0gXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGZsaWdodENvbnRyb2xzKCl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgaWYodGhpcy5zaG9vdC5pc0Rvd24pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFpclNob3QoKTtcclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgdmFyIGRpciA9ICh0aGlzLnNjYWxlLnggPiAwKSA/IDEgOiAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmp1bXAuaXNEb3duKXtcclxuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFuZ2xlLT0xKihkaXIpO1xyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5tb3ZlRG93bi5pc0Rvd24pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYW5nbGUrPTEqKGRpcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZighdGhpcy5mbGlnaHRTZXF1ZW5jZUluaXQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmxpZ2h0U2VxdWVuY2UoZGlyKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS52ZWxvY2l0eUZyb21Sb3RhdGlvbih0aGlzLnJvdGF0aW9uICsgdGhpcy5yb3RhdGlvblNlcSwgKHRoaXMuamV0cGFja1NwZWVkICsgdGhpcy5qZXRCb29zdCkgKiAoZGlyKSwgdGhpcy5ib2R5LnZlbG9jaXR5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5qZXRtb2RlLmlzRG93bikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5nYW1lLnRpbWUubm93ID4gdGhpcy5mbGlnaHREZWxheSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXkoJ2p1bXAnKTsgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldEZsaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mbGlnaHREZWxheSA9IHRoaXMuZ2FtZS50aW1lLm5vdyArIDYwMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5qZXRBdWRpby5zdG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJlc2V0RmxpZ2h0KCl7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICB0aGlzLmpldEF1ZGlvLnN0b3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb2ZseWluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmdsZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFuZ2xlQ291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mbGlnaHRTZXF1ZW5jZUluaXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGFrZU9mZkNvbXBsZXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdGF0aW9uU2VxID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuamV0Qm9vc3QgPSAwOyAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLnZlbG9jaXR5RnJvbVJvdGF0aW9uKHRoaXMucm90YXRpb24sIDAsIHRoaXMuYm9keS52ZWxvY2l0eSk7ICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzaG90RmlyZWQoKXtcclxuICAgIFxyXG4gICAgICAgICAgICBpZih0aGlzLmdhbWUudGltZS5ub3cgPiB0aGlzLm5leHRTaG90ICl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5leHRTaG90ID0gdGhpcy5nYW1lLnRpbWUubm93ICsgUGhhc2VyLlRpbWVyLlNFQ09ORCAqIHRoaXMuc2hvdEludGVydmFsO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB2YXIgZGlyID0gKHRoaXMuc2NhbGUueCA+IDApID8gMSA6IC0xO1xyXG4gICAgICAgICAgICAgICAgdmFyIGJ1bGxldCA9IHRoaXMuYnVsbGV0cy5nZXRGaXJzdERlYWQoKTtcclxuICAgICAgICAgICAgICAgIGlmKGJ1bGxldCl7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0LnggPSAgdGhpcy54ICsgKGRpciAqIDI1KTtcclxuICAgICAgICAgICAgICAgICAgICBidWxsZXQueSA9IHRoaXMueTtcclxuICAgICAgICAgICAgICAgICAgICBidWxsZXQuYW5nbGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS52ZWxvY2l0eUZyb21Sb3RhdGlvbih0aGlzLnJvdGF0aW9uLCAwLCBidWxsZXQuYm9keS52ZWxvY2l0eSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0LnJldml2ZSgpOyAgICBcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0ID0gdGhpcy5idWxsZXRzLmNyZWF0ZSh0aGlzLnggKyAoZGlyICogMjUpLHRoaXMueSwnYnVsbGV0Jyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUoYnVsbGV0LCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xyXG5cdFx0XHRcdGJ1bGxldC5vdXRPZkJvdW5kc0tpbGwgPSB0cnVlO1xyXG5cdCAgICBcdFx0YnVsbGV0LmNoZWNrV29ybGRCb3VuZHMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnVsbGV0LmJvZHkudmVsb2NpdHkueCA9IGRpciAqIHRoaXMuc2hvdFNwZWVkOyAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vYW5pbWF0aW9ucyBmb3Igc2hvdHNcclxuICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuYm9keS52ZWxvY2l0eS54ID09PSAwKXtcclxuICAgICAgICAgICAgICAgICAgIHRoaXMuaWRsZVNob3QucGxheSgpOyBcclxuICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgIHRoaXMucnVuU2hvdC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgYWlyU2hvdCgpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuZ2FtZS50aW1lLm5vdyA+IHRoaXMubmV4dFNob3Qpe1xyXG4gICAgICAgICAgICB0aGlzLm5leHRTaG90ID0gdGhpcy5nYW1lLnRpbWUubm93ICsgUGhhc2VyLlRpbWVyLlNFQ09ORCAqIHRoaXMuc2hvdEludGVydmFsO1xyXG4gICAgICAgICAgICAgdGhpcy5wbGF5KCdqZXRwYWNrX2ZpcmUnKTsgXHJcbiAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbnMuY3VycmVudEFuaW0ub25Db21wbGV0ZS5hZGQoZnVuY3Rpb24gKCkge1x0dGhpcy5wbGF5KCdqZXRwYWNrJyk7IH0sIHRoaXMpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgIHZhciBkaXIgPSAodGhpcy5zY2FsZS54ID4gMCkgPyAxIDogLTE7XHJcbiAgICAgICAgICAgIHZhciBwID0gbmV3IFBoYXNlci5Qb2ludCh0aGlzLngsIHRoaXMueSk7IFxyXG4gICAgICAgICAgcC5yb3RhdGUocC54LCBwLnksIHRoaXMucm90YXRpb24sIGZhbHNlLCAoNDAqZGlyKSk7XHJcbiAgICAgICAgICB2YXIgYnVsbGV0ID0gdGhpcy5idWxsZXRzLmdldEZpcnN0RGVhZCgpO1xyXG4gICAgICAgICAgICBpZihidWxsZXQpe1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0LnggPSBwLng7XHJcbiAgICAgICAgICAgICAgICBidWxsZXQueSA9IHAueTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldC5yZXZpdmUoKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB2YXIgYnVsbGV0ID0gdGhpcy5idWxsZXRzLmNyZWF0ZShwLngscC55LCdidWxsZXQnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5lbmFibGUoYnVsbGV0KTtcclxuICAgICAgICAgICAgICAgICBidWxsZXQub3V0T2ZCb3VuZHNLaWxsID0gdHJ1ZTtcclxuXHQgICAgXHRcdGJ1bGxldC5jaGVja1dvcmxkQm91bmRzID0gdHJ1ZTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJ1bGxldC5zY2FsZS54ID0gZGlyO1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0LmFuZ2xlID0gdGhpcy5hbmdsZSArICgoLTE4KSpkaXIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLnZlbG9jaXR5RnJvbVJvdGF0aW9uKHRoaXMucm90YXRpb24gKyB0aGlzLnJvdGF0aW9uU2VxLCB0aGlzLnNob3RTcGVlZCAqIGRpciwgYnVsbGV0LmJvZHkudmVsb2NpdHkpO1xyXG4gICAgICAgICAgIH1cclxuICAgICAgICB9ICBcclxuICAgIFxyXG4gICAgZmxpZ2h0U2VxdWVuY2UoZGlyKXtcclxuICAgICAgICAgaWYodGhpcy5nYW1lLnRpbWUubm93ID4gdGhpcy5mbGlnaHRXYXJtVXApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmxpZ2h0V2FybVVwID0gdGhpcy5nYW1lLnRpbWUubm93ICsgUGhhc2VyLlRpbWVyLlNFQ09ORCAqIC4xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmdsZUNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFuZ2xlKz0xKihkaXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3RhdGlvblNlcSAtPSAoKC4zNi8xOCkqKGRpcikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5qZXRCb29zdCArPSAyNTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuYW5nbGVDb3VudCA9PSAxOCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZsaWdodFNlcXVlbmNlSW5pdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFuZ2xlQ291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgc3RhcnRGbGlnaHQoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5KCdqZXRwYWNrJyk7XHJcbiAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9mbHlpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgdGhpcy5mbGlnaHREZWxheSA9IHRoaXMuZ2FtZS50aW1lLm5vdyArIDYwMDtcclxuLy8gICAgICAgICAgICAgICAgICAgIHRoaXMuamV0QXVkaW8ucGxheSgnJywwLDEsdHJ1ZSk7ICAgIFxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBCb290IHtcbiAgICBcbiAgICBwcmVsb2FkKCkge1xuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3ByZWxvYWRlcicsICdhc3NldHMvaW1nL2xvYWRpbmdfYmFyLnBuZycpO1xuICAgIH1cbiAgICBcbiAgICBjcmVhdGUoKSB7XG4gICAgICAgIHRoaXMuZ2FtZS5pbnB1dC5tYXhQb2ludGVyID0gMTtcbiAgICAgICAgdGhpcy5nYW1lLnN0YXRlLnN0YXJ0KCdwcmVsb2FkJyk7XG4gICAgfVxuICAgIFxuICAgIFxufSIsIi8qIGdsb2JhbCBQaGFzZXIgKi9cblxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi4vcHJlZmFicy9QbGF5ZXIuanNcIjtcbmltcG9ydCBFbmVteSBmcm9tICBcIi4uL3ByZWZhYnMvRW5lbXkuanNcIjtcbmltcG9ydCBIZWFsdGhCYXIgZnJvbSBcIi4uL3ByZWZhYnMvSGVhbHRoQmFyLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUgZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgfVxuICAgIHByZWxvYWQoKXtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3RpbGVzZXQnLCdhc3NldHMvVGlsZXNfMzJ4MzIucG5nJyk7XG4gICAgICAgICAgICB0aGlzLmxvYWQudGlsZW1hcCgnbXl0aWxlbWFwJywnYXNzZXRzL3BsYXRmb3JtLmpzb24nLCBudWxsLCBQaGFzZXIuVGlsZW1hcC5USUxFRF9KU09OKTsgICAgXG4gICAgICAgIFxuICAgIH1cbiAgICBcbiAgICBjcmVhdGUoKSB7XG4gICAgICAgIFxuICAgICAgICAgdGhpcy5teVRpbGVzID0gdGhpcy5nYW1lLmFkZC50aWxlbWFwKCdteXRpbGVtYXAnKTtcbiAgICAgICAgICAgIHRoaXMubXlUaWxlcy5hZGRUaWxlc2V0SW1hZ2UoJ3BsYXRmb3JtcycsICd0aWxlc2V0Jyk7XG4gICAgICAgICAgICB0aGlzLm15VGlsZXMuc2V0Q29sbGlzaW9uQmV0d2VlbigxLDYzKTtcbiAgICAgICAgICAgIHRoaXMubXl0aWxlc2xheWVyID0gdGhpcy5teVRpbGVzLmNyZWF0ZUxheWVyKCdibG9ja3MnKTtcbiAgICAgICAgICAgIHRoaXMubXlnZW1sYXllciA9IHRoaXMubXlUaWxlcy5jcmVhdGVMYXllcignZ2VtcycpO1xuICAgICAgICAgICAgdGhpcy5teXRpbGVzbGF5ZXIucmVzaXplV29ybGQoKTsgICAgXG4gICAgICAgIFxuICAgIHRoaXMucGxheWVyQnVsbGV0cyA9IHRoaXMuYWRkLmdyb3VwKCk7XG4gICAgdGhpcy5wbGF5ZXJCdWxsZXRzLmVuYWJsZUJvZHkgPSB0cnVlO1xuICAgIHRoaXMucGxheWVyQnVsbGV0cy5waHlzaWNzQm9keVR5cGUgPSBQaGFzZXIuUGh5c2ljcy5BUkNBREU7XG4gICAgICAgIFxuICAgICB0aGlzLmVuZW15QnVsbGV0cyA9IHRoaXMuYWRkLmdyb3VwKCk7XG4gICAgdGhpcy5lbmVteUJ1bGxldHMuZW5hYmxlQm9keSA9IHRydWU7XG4gICAgdGhpcy5lbmVteUJ1bGxldHMucGh5c2ljc0JvZHlUeXBlID0gUGhhc2VyLlBoeXNpY3MuQVJDQURFO1xuICAgICAgICAgICAgXG4gICB0aGlzLm1haW5DaGFyZWN0ZXIgPSBuZXcgUGxheWVyKHRoaXMuZ2FtZSwgNDAwLCA1MCwgdGhpcy5wbGF5ZXJCdWxsZXRzKTtcbiAgICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMubWFpbkNoYXJlY3Rlcik7XG4gICAgICAgIHRoaXMuZ2FtZS5jYW1lcmEuZm9sbG93KHRoaXMubWFpbkNoYXJlY3Rlcik7XG4gICAgICAgIFxuICAgICAgICAvL3BsYWNlIGVuZW1pZXNcbiAgIHRoaXMuZW5lbWllcyA9IHRoaXMuYWRkLmdyb3VwKCk7XG4gICB0aGlzLm15VGlsZXMuY3JlYXRlRnJvbU9iamVjdHMoJ0VuZW1pZXMnLCAyMzYsICdudWxsJywgJ251bGwnLCB0cnVlLCBmYWxzZSwgdGhpcy5lbmVtaWVzLCBFbmVteSk7XG4gICAgICAgIHRoaXMuZW5lbWllcy5zZXRBbGwoJ3BsYXllcicsIHRoaXMubWFpbkNoYXJlY3Rlcik7XG4gICAgICAgIHRoaXMuZW5lbWllcy5zZXRBbGwoJ2J1bGxldHMnLCB0aGlzLmVuZW15QnVsbGV0cyk7XG4gICAgICAgIHRoaXMuZW5lbWllcy5zZXRBbGwoJ2xheWVyJywgdGhpcy5teXRpbGVzbGF5ZXIpO1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0U291bmQgPSB0aGlzLmFkZC5hdWRpbygnY29sbGVjdCcpO1xuICAgICAgICAgICAgdGhpcy5qZXRBdWRpbyA9IHRoaXMuYWRkLmF1ZGlvKCdqZXRzJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG4gICAgICAgIFxuICAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmNvaW5zID0gdGhpcy5hZGQuZ3JvdXAoKTtcbiAgICAgICAgICAgIHRoaXMuY29pbnMuZW5hYmxlQm9keSA9IHRydWU7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICB0aGlzLm15VGlsZXMuY3JlYXRlRnJvbU9iamVjdHMoJ2dlbXMnLCAxMTUsICdjb2lucycsIDAsIHRydWUsIGZhbHNlLCB0aGlzLmNvaW5zKTtcblxuICAvLyAgQWRkIGFuaW1hdGlvbnMgdG8gYWxsIG9mIHRoZSBjb2luIHNwcml0ZXNcbiAgICAgICAgICAgXG4gICAgdGhpcy5jb2lucy5jYWxsQWxsKCdhbmltYXRpb25zLmFkZCcsICdhbmltYXRpb25zJywgJ3NwaW4nLCBbMCwgMSwgMiwgMywgNCwgNV0sIDEwLCB0cnVlKTtcbiAgICB0aGlzLmNvaW5zLmNhbGxBbGwoJ2FuaW1hdGlvbnMucGxheScsICdhbmltYXRpb25zJywgJ3NwaW4nKTtcbiAgICAgICAgICAgIFxuICAgIFxuICAgICAgICAgICAgICAgIFxuICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnNldHVwVUkoKTtcbiAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgXG4gICAgICAgIFxuICAgICAgICAgICAgXG4gIFxuICAgICAgICAgICAgXG4gICAgICAgIFxuICAgIH1cbiAgICBcbiAgICB1cGRhdGUoKSB7XG4gICAgICAgICAgICB0aGlzLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5tYWluQ2hhcmVjdGVyLCB0aGlzLm15dGlsZXNsYXllcik7XG4gICAgICAgICAgICB0aGlzLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5lbmVtaWVzLCB0aGlzLm15dGlsZXNsYXllcik7XG4gICAgICAgICAgICB0aGlzLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5tYWluQ2hhcmVjdGVyLCB0aGlzLmNvaW5zLCB0aGlzLmNvbGxlY3QgLCBudWxsLCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLmVuZW1pZXMsIHRoaXMucGxheWVyQnVsbGV0cywgdGhpcy5lbmVteVNob3QsIG51bGwsIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMubWFpbkNoYXJlY3RlciwgdGhpcy5lbmVteUJ1bGxldHMsIHRoaXMucGxheWVyU2hvdCwgbnVsbCwgdGhpcyk7XG4gICAgIFxuICAgIH1cbiAgICBcbiAgICByZW5kZXIoKXtcbiAgICAgICAgXG4vLyAgICAgICAgdGhpcy5nYW1lLmRlYnVnLnNwcml0ZUluZm8odGhpcy5tYWluQ2hhcmVjdGVyLCAyMCwgMzIpO1xuLy8gICAgICAgICB0aGlzLmdhbWUuZGVidWcuZ2VvbSh0aGlzLmxpbmUpO1xuICAgIH1cbiAgICBcbiAgICBzZXR1cFVJKCkge1xuICAgICAgICBcbiAgICAgICAgdGhpcy5VSUxheWVyID0gdGhpcy5hZGQuZ3JvdXAoKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuaGVhbHRoQmFyID0gbmV3IEhlYWx0aEJhcih0aGlzLmdhbWUsIDEyMCw0MCwgXCJoZWFsdGhfYmFyXCIsIFwiZW1wdHlfYmFyXCIpO1xuICAgICAgICB0aGlzLmhlYWx0aEJhci5maXhlZFRvQ2FtZXJhID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5oZWFsdGhCYXIuY2FtZXJhT2Zmc2V0LnNldFRvKDEyMCwgNDApO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5VSUxheWVyLmFkZCh0aGlzLmhlYWx0aEJhcik7XG4gICAgICAgIFxuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgZW5lbXlTaG90KGVuZW15LCBidWxsZXQpe1xuICAgICAgICBjb25zb2xlLmxvZyhlbmVteSk7XG4gICAgICAgIGJ1bGxldC5raWxsKCk7XG4gICAgICAgIGVuZW15LmVuZW15SGVhbHRoLmN1cnJlbnQtLTtcbiAgICAgICBpZihlbmVteS5lbmVteUhlYWx0aC5jdXJyZW50ID09PSAwKXtcbiAgICAgICAgICAgZW5lbXkuZGVzdHJveSgpO1xuXG4gICAgICAgfVxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIFxuICAgIH1cbiAgICBcbiAgICBwbGF5ZXJTaG90KHBsYXllciwgYnVsbGV0KXtcbiAgICAgICAgYnVsbGV0LmtpbGwoKTtcbiAgICAgICAgcGxheWVyLmhlYWx0aC5jdXJyZW50LS07XG4gICAgICAgIGlmKHBsYXllci5oZWFsdGguY3VycmVudCA+IDApe1xuICAgICAgICB0aGlzLmhlYWx0aEJhci5zZXRWYWx1ZShwbGF5ZXIuaGVhbHRoLmN1cnJlbnQvIHBsYXllci5oZWFsdGgubWF4KTtcbiAgICAgICAgfVxuICAgICAgIFxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIFxuICAgIH1cblxuXG4gICAgXG5jb2xsZWN0KHBsYXllcixjb2luKXtcbiAgICAgICAgICAgIGNvaW4ua2lsbCgpO1xuICAgICAgICAgICAgdGhpcy5zY29yZSsrO1xuLy8gICAgICAgICAgICB0ZXh0LnRleHQgPSBcIlNjb3JlOiBcIiArIHNjb3JlO1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0U291bmQucGxheSgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIFxuICAgIFxuICAgIFxufSIsIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlbG9hZCB7XG4gICAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYXNzZXQgPSBudWxsO1xuICAgICAgICB0aGlzLnJlYWR5ID0gZmFsc2U7XG4gICAgfVxuICAgIFxuICAgIHByZWxvYWQoKSB7XG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnbG9hZGluZ19iZycsICdhc3NldHMvaW1nL2xvYWRpbmdfYmcuanBnJyk7XG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZSgpIHtcbiAgICAgICAgdGhpcy5hZGQuc3ByaXRlKDAsMCwgXCJsb2FkaW5nX2JnXCIpO1xuICAgICAgICB0aGlzLmFzc2V0ID0gdGhpcy5hZGQuc3ByaXRlKHRoaXMuZ2FtZS53aWR0aC8yLCB0aGlzLmdhbWUuaGVpZ2h0LzIsIFwicHJlbG9hZGVyXCIpO1xuICAgICAgICB0aGlzLmFzc2V0LmFuY2hvci5zZXRUbygwLjUsMC41KTtcbiAgICAgICAgdGhpcy5sb2FkLm9uTG9hZFN0YXJ0LmFkZCh0aGlzLm9uTG9hZFN0YXJ0LHRoaXMpO1xuICAgICAgICB0aGlzLmxvYWQub25Mb2FkQ29tcGxldGUuYWRkKHRoaXMub25Mb2FkQ29tcGxldGUsIHRoaXMpO1xuICAgICAgICB0aGlzLmxvYWQuc2V0UHJlbG9hZFNwcml0ZSh0aGlzLmFzc2V0KTtcblxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmxvYWQuc3RhcnQoKTtcbiAgICB9XG4gICAgXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIm5vdHJlYWR5XCIpO1xuICAgICAgICBpZih0aGlzLnJlYWR5KXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVhZHlcIik7XG4gICAgICAgICAgICB0aGlzLmdhbWUuc3RhdGUuc3RhcnQoJ2dhbWUnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvbkxvYWRTdGFydCgpIHtcbiAgICAgICAgICAgICAgIC8vbG9hZCB5b3VyIGFzc2V0cyBoZXJlXG4gICAgICAgICAgICB0aGlzLmxvYWQuc3ByaXRlc2hlZXQoJ25pbmphJywnYXNzZXRzL2ltZy9uaW5qYTIucG5nJywgOTAsIDkwKTtcbiAgICAgICAgICAgIHRoaXMubG9hZC5zcHJpdGVzaGVldCgnY29pbnMnLCdhc3NldHMvaW1nL2NvaW5zLnBuZycsNTAsIDQ5KTtcbiAgICAgICAgICAgIHRoaXMubG9hZC5zcHJpdGVzaGVldCgncm9ib3RfcnVuJywnYXNzZXRzL2ltZy9yb2JvdF9ydW4ucG5nJyw5MiwgOTApO1xuICAgICAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdidWxsZXQnLCdhc3NldHMvaW1nL0J1bGxldDAxLnBuZycpO1xuICAgICAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdlbmVteV9zaG9vdCcsJ2Fzc2V0cy9pbWcvcm9ib3RfcGxhY2UucG5nJyk7XG4gICAgICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ2JvZHknLCdhc3NldHMvaW1nL3JvYm90X2JvZHkucG5nJyk7XG4gICAgICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ2FybScsJ2Fzc2V0cy9pbWcvcm9ib3RfYXJtLnBuZycpO1xuICAgICAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdlbXB0eV9iYXInLCdhc3NldHMvaW1nL0VtcHR5QmFyLnBuZycpO1xuICAgICAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdoZWFsdGhfYmFyJywnYXNzZXRzL2ltZy9SZWRCYXIucG5nJyk7XG4vLyAgICAgICAgICAgIHRoaXMubG9hZC5pbWFnZSgndGlsZXNldCcsJ2Fzc2V0cy9UaWxlc18zMngzMi5wbmcnKTtcbi8vICAgICAgICAgICAgdGhpcy5sb2FkLnRpbGVtYXAoJ215dGlsZW1hcCcsJ2Fzc2V0cy9wbGF0Zm9ybS5qc29uJywgbnVsbCwgUGhhc2VyLlRpbGVtYXAuVElMRURfSlNPTik7XG4gICAgICAgICAgICB0aGlzLmxvYWQuYXVkaW8oJ2NvbGxlY3QnLCdhc3NldHMvYXVkaW8vVUlfRWxlY3RyaWNfMDgubXAzJyk7XG4gICAgICAgICAgICB0aGlzLmxvYWQuYXVkaW8oJ2pldHMnLCdhc3NldHMvYXVkaW8vamV0X3NvdW5kLm1wMycpOyBcbiAgICB9XG4gICAgXG4gICAgb25Mb2FkQ29tcGxldGUoKSB7XG4gICAgICAgIHRoaXMucmVhZHkgPSB0cnVlO1xuICAgIH1cbn0iXX0=
