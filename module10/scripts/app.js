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

},{"./states/Boot.js":2,"./states/Game.js":3,"./states/Preload.js":4}],2:[function(require,module,exports){
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
            this.load.image('preloader', 'assets/images/loading_bar.png');
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

},{}],3:[function(require,module,exports){
/* global Phaser */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Game = (function (_Phaser$State) {
    _inherits(Game, _Phaser$State);

    function Game() {
        _classCallCheck(this, Game);

        _get(Object.getPrototypeOf(Game.prototype), 'constructor', this).call(this);
    }

    _createClass(Game, [{
        key: 'create',
        value: function create() {
            this.add.sprite(0, 0, 'game_bg');
            this.clouds = this.add.group();

            this.score = 0;
            var style = {
                font: '24px Arial', fill: '#FFFFFF'
            };
            this.txtScore = this.add.text(10, 10, this.score.toString(), style);
        }
    }, {
        key: 'update',
        value: function update() {
            if (Math.random() < .01) {
                var cloud = this.clouds.getFirstDead();
                if (cloud) {
                    cloud.x = Math.random() * this.game.width;
                    cloud.y = Math.random() * this.game.height;
                    cloud.scale.setTo(1, 1);
                    cloud.revive();
                } else {

                    var cloud = this.clouds.create(Math.random() * this.game.width, Math.random() * this.game.height, 'cloud');
                    cloud.inputEnabled = true;
                    cloud.events.onInputDown.add(this.onCloudClick, this);
                }

                cloud.alpha = 0;
                this.add.tween(cloud).to({ y: "-50", alpha: 1 }, 800, Phaser.Easing.Cubic.Out, true);
            }
        }
    }, {
        key: 'onCloudClick',
        value: function onCloudClick(cloud) {

            if (cloud.scale.x == 1) {
                cloud.kill();

                for (var i = 0; i < 2; i++) {
                    var smCloud = this.clouds.getFirstDead();
                    if (smCloud) {
                        smCloud.x = Math.random() * this.game.width;
                        smCloud.y = Math.random() * this.game.height;
                        smCloud.revive();
                    } else {

                        var smCloud = this.clouds.create(Math.random() * this.game.width, Math.random() * this.game.height, 'cloud');
                        smCloud.inputEnabled = true;
                        smCloud.events.onInputDown.add(this.onCloudClick, this);
                    }
                    smCloud.scale.setTo(.5, .5);
                    smCloud.alpha = 0;
                    this.add.tween(smCloud).to({ y: "-50", alpha: 1 }, 800, Phaser.Easing.Cubic.Out, true);
                }
            } else {
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
    }]);

    return Game;
})(Phaser.State);

exports['default'] = Game;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
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
            this.load.image('loading_bg', 'assets/images/loading_bg.jpg');
        }
    }, {
        key: 'create',
        value: function create() {
            this.add.sprite(0, 0, "loading_bg");
            this.asset = this.add.sprite(this.game.width / 2, this.game.height / 2, "preloader");
            this.asset.anchor.setTo(0.5, 0.5);
            this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
            this.load.setPreloadSprite(this.asset);
            //load your assets here
            this.load.image('cloud', 'assets/images/cloud.png');
            this.load.image('game_bg', 'assets/images/lightning.jpg');
            this.load.image('sm_cloud', "assets/images/sm_cloud.png");
            this.load.start();
        }
    }, {
        key: 'update',
        value: function update() {
            if (this.ready) {
                this.game.state.start('game');
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS91YnVudHUvd29ya3NwYWNlL21vZHVsZTEwL3NyYy9hcHAuanMiLCIvaG9tZS91YnVudHUvd29ya3NwYWNlL21vZHVsZTEwL3NyYy9zdGF0ZXMvQm9vdC5qcyIsIi9ob21lL3VidW50dS93b3Jrc3BhY2UvbW9kdWxlMTAvc3JjL3N0YXRlcy9HYW1lLmpzIiwiL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9tb2R1bGUxMC9zcmMvc3RhdGVzL1ByZWxvYWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs0QkNHaUIsa0JBQWtCOzs7OytCQUNmLHFCQUFxQjs7Ozs0QkFDeEIsa0JBQWtCOzs7O0FBSm5DLElBQUksSUFBSSxDQUFDOztBQU1ULE1BQU0sQ0FBQyxNQUFNLEdBQUcsWUFBWTtBQUN4QixRQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNsQyxRQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLDRCQUFPLENBQUM7QUFDN0IsUUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUywrQkFBVSxDQUFDO0FBQ25DLFFBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sNEJBQU8sQ0FBQztBQUM3QixRQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUU1QixDQUFDOzs7Ozs7Ozs7Ozs7O0lDZG1CLElBQUk7YUFBSixJQUFJOzhCQUFKLElBQUk7OztpQkFBSixJQUFJOztlQUVkLG1CQUFHO0FBQ04sZ0JBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSwrQkFBK0IsQ0FBQyxDQUFDO1NBQ2pFOzs7ZUFFSyxrQkFBRztBQUNMLGdCQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO0FB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LElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUNqRixnQkFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQztBQUNqQyxnQkFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDNUQsZ0JBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUV2QyxnQkFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLHlCQUF5QixDQUFDLENBQUM7QUFDcEQsZ0JBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO0FBQzFELGdCQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUMsNEJBQTRCLENBQUMsQ0FBQztBQUN6RCxnQkFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNyQjs7O2VBRUssa0JBQUc7QUFDTCxnQkFBRyxJQUFJLENBQUMsS0FBSyxFQUFDO0FBQ1Ysb0JBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNqQztTQUNKOzs7ZUFFYSwwQkFBRztBQUNiLGdCQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztTQUNyQjs7O1dBaENnQixPQUFPOzs7cUJBQVAsT0FBTyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qZ2xvYmFsIFBoYXNlciovXG52YXIgZ2FtZTtcblxuaW1wb3J0IEJvb3QgZnJvbSBcIi4vc3RhdGVzL0Jvb3QuanNcIjtcbmltcG9ydCBQcmVsb2FkIGZyb20gXCIuL3N0YXRlcy9QcmVsb2FkLmpzXCI7XG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9zdGF0ZXMvR2FtZS5qc1wiO1xuXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgIGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoMTIwMCwgODAwKTtcbiAgICBnYW1lLnN0YXRlLmFkZCgnYm9vdCcsIEJvb3QpO1xuICAgIGdhbWUuc3RhdGUuYWRkKCdwcmVsb2FkJywgUHJlbG9hZCk7XG4gICAgZ2FtZS5zdGF0ZS5hZGQoJ2dhbWUnLCBHYW1lKTtcbiAgICBnYW1lLnN0YXRlLnN0YXJ0KCdib290Jyk7XG4gICAgXG59OyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvb3Qge1xuICAgIFxuICAgIHByZWxvYWQoKSB7XG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgncHJlbG9hZGVyJywgJ2Fzc2V0cy9pbWFnZXMvbG9hZGluZ19iYXIucG5nJyk7XG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZSgpIHtcbiAgICAgICAgdGhpcy5nYW1lLmlucHV0Lm1heFBvaW50ZXIgPSAxO1xuICAgICAgICB0aGlzLmdhbWUuc3RhdGUuc3RhcnQoJ3ByZWxvYWQnKTtcbiAgICB9XG4gICAgXG4gICAgXG59IiwiLyogZ2xvYmFsIFBoYXNlciAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIGV4dGVuZHMgUGhhc2VyLlN0YXRlIHtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBzdXBlcigpO1xuICAgIH1cbiAgICBcbiAgICBjcmVhdGUoKSB7XG4gICAgICAgIHRoaXMuYWRkLnNwcml0ZSgwLDAsJ2dhbWVfYmcnKTtcbiAgICAgICAgdGhpcy5jbG91ZHMgPSB0aGlzLmFkZC5ncm91cCgpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5zY29yZSA9IDA7XG4gICAgICAgIHZhciBzdHlsZSA9IHtcbiAgICAgICAgICAgIGZvbnQ6ICcyNHB4IEFyaWFsJywgZmlsbCA6ICcjRkZGRkZGJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnR4dFNjb3JlID0gdGhpcy5hZGQudGV4dCgxMCwxMCwgdGhpcy5zY29yZS50b1N0cmluZygpLCBzdHlsZSk7XG4gICAgICAgIFxuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZihNYXRoLnJhbmRvbSgpIDwgLjAxKXtcbiAgICAgICAgICAgIHZhciBjbG91ZCA9IHRoaXMuY2xvdWRzLmdldEZpcnN0RGVhZCgpO1xuICAgICAgICAgICAgaWYoY2xvdWQpe1xuICAgICAgICAgICAgICAgIGNsb3VkLnggPSBNYXRoLnJhbmRvbSgpICogdGhpcy5nYW1lLndpZHRoO1xuICAgICAgICAgICAgICAgIGNsb3VkLnkgPSBNYXRoLnJhbmRvbSgpICogdGhpcy5nYW1lLmhlaWdodDtcbiAgICAgICAgICAgICAgICBjbG91ZC5zY2FsZS5zZXRUbygxLDEpO1xuICAgICAgICAgICAgICAgIGNsb3VkLnJldml2ZSgpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB2YXIgY2xvdWQgPSB0aGlzLmNsb3Vkcy5jcmVhdGUoTWF0aC5yYW5kb20oKSAqIHRoaXMuZ2FtZS53aWR0aCxNYXRoLnJhbmRvbSgpICogdGhpcy5nYW1lLmhlaWdodCwgJ2Nsb3VkJyk7XG4gICAgICAgICAgICAgICAgY2xvdWQuaW5wdXRFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjbG91ZC5ldmVudHMub25JbnB1dERvd24uYWRkKHRoaXMub25DbG91ZENsaWNrLCB0aGlzKTtcbiAgICAgICAgICAgIH0gIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBjbG91ZC5hbHBoYSA9IDA7XG4gICAgICAgICAgICB0aGlzLmFkZC50d2VlbihjbG91ZCkudG8oe3k6IFwiLTUwXCIsIGFscGhhOiAxfSwgODAwLCBQaGFzZXIuRWFzaW5nLkN1YmljLk91dCwgdHJ1ZSk7XG5cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBvbkNsb3VkQ2xpY2soY2xvdWQpIHtcbiAgICAgICAgXG4gICAgICAgIGlmKGNsb3VkLnNjYWxlLnggPT0gMSl7XG4gICAgICAgICAgICBjbG91ZC5raWxsKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCAyOyBpKyspe1xuICAgICAgICAgICAgIHZhciBzbUNsb3VkID0gdGhpcy5jbG91ZHMuZ2V0Rmlyc3REZWFkKCk7XG4gICAgICAgICAgICBpZihzbUNsb3VkKXtcbiAgICAgICAgICAgICAgICBzbUNsb3VkLnggPSBNYXRoLnJhbmRvbSgpICogdGhpcy5nYW1lLndpZHRoO1xuICAgICAgICAgICAgICAgIHNtQ2xvdWQueSA9IE1hdGgucmFuZG9tKCkgKiB0aGlzLmdhbWUuaGVpZ2h0O1xuICAgICAgICAgICAgICAgIHNtQ2xvdWQucmV2aXZlKCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHZhciBzbUNsb3VkID0gdGhpcy5jbG91ZHMuY3JlYXRlKE1hdGgucmFuZG9tKCkgKiB0aGlzLmdhbWUud2lkdGgsTWF0aC5yYW5kb20oKSAqIHRoaXMuZ2FtZS5oZWlnaHQsICdjbG91ZCcpO1xuICAgICAgICAgICAgICAgIHNtQ2xvdWQuaW5wdXRFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzbUNsb3VkLmV2ZW50cy5vbklucHV0RG93bi5hZGQodGhpcy5vbkNsb3VkQ2xpY2ssIHRoaXMpO1xuICAgICAgICAgICAgfSAgXG4gICAgICAgICAgICBzbUNsb3VkLnNjYWxlLnNldFRvKC41LC41KTtcbiAgICAgICAgICAgIHNtQ2xvdWQuYWxwaGEgPSAwO1xuICAgICAgICAgICAgdGhpcy5hZGQudHdlZW4oc21DbG91ZCkudG8oe3k6IFwiLTUwXCIsIGFscGhhOiAxfSwgODAwLCBQaGFzZXIuRWFzaW5nLkN1YmljLk91dCwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgY2xvdWQua2lsbCgpO1xuICAgICAgICB0aGlzLnNjb3JlKys7XG4gICAgICAgIHRoaXMudHh0U2NvcmUuc2V0VGV4dCh0aGlzLnNjb3JlLnRvU3RyaW5nKCkpO1xuICAgIHZhciBlbWl0dGVyID0gdGhpcy5nYW1lLmFkZC5lbWl0dGVyKGNsb3VkLngsIGNsb3VkLnksIDEwMCk7XG4gICAgZW1pdHRlci5tYWtlUGFydGljbGVzKCdzbV9jbG91ZCcpO1xuICAgIGVtaXR0ZXIubWluUGFydGljbGVTcGVlZC5zZXRUbygtMjAwLCAtMjAwKTtcbiAgICBlbWl0dGVyLm1heFBhcnRpY2xlU3BlZWQuc2V0VG8oMjAwLCAyMDApO1xuICAgIGVtaXR0ZXIuZ3Jhdml0eSA9IDIwO1xuICAgIGVtaXR0ZXIuc3RhcnQodHJ1ZSwgNTAwLCBudWxsLCAxMDApOyAgXG4gICAgICAgICAgICBcbiAgICAgICAgfVxuIFxuICAgIH1cbiAgICBcbiAgICBcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQcmVsb2FkIHtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5hc3NldCA9IG51bGw7XG4gICAgICAgIHRoaXMucmVhZHkgPSBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgcHJlbG9hZCgpIHtcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdsb2FkaW5nX2JnJywgJ2Fzc2V0cy9pbWFnZXMvbG9hZGluZ19iZy5qcGcnKTtcbiAgICB9XG4gICAgXG4gICAgY3JlYXRlKCkge1xuICAgICAgICB0aGlzLmFkZC5zcHJpdGUoMCwwLCBcImxvYWRpbmdfYmdcIik7XG4gICAgICAgIHRoaXMuYXNzZXQgPSB0aGlzLmFkZC5zcHJpdGUodGhpcy5nYW1lLndpZHRoLzIsIHRoaXMuZ2FtZS5oZWlnaHQvMiwgXCJwcmVsb2FkZXJcIik7XG4gICAgICAgIHRoaXMuYXNzZXQuYW5jaG9yLnNldFRvKDAuNSwwLjUpO1xuICAgICAgICB0aGlzLmxvYWQub25Mb2FkQ29tcGxldGUuYWRkT25jZSh0aGlzLm9uTG9hZENvbXBsZXRlLCB0aGlzKTtcbiAgICAgICAgdGhpcy5sb2FkLnNldFByZWxvYWRTcHJpdGUodGhpcy5hc3NldCk7XG4gICAgICAgIC8vbG9hZCB5b3VyIGFzc2V0cyBoZXJlXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnY2xvdWQnLCAnYXNzZXRzL2ltYWdlcy9jbG91ZC5wbmcnKTtcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdnYW1lX2JnJywgJ2Fzc2V0cy9pbWFnZXMvbGlnaHRuaW5nLmpwZycpO1xuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3NtX2Nsb3VkJyxcImFzc2V0cy9pbWFnZXMvc21fY2xvdWQucG5nXCIpO1xuICAgICAgICB0aGlzLmxvYWQuc3RhcnQoKTtcbiAgICB9XG4gICAgXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZih0aGlzLnJlYWR5KXtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zdGF0ZS5zdGFydCgnZ2FtZScpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG9uTG9hZENvbXBsZXRlKCkge1xuICAgICAgICB0aGlzLnJlYWR5ID0gdHJ1ZTtcbiAgICB9XG59Il19
