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
    game = new Phaser.Game(800, 600);
    game.state.add('boot', _statesBootJs2["default"]);
    game.state.add('preload', _statesPreloadJs2["default"]);
    game.state.add('game', _statesGameJs2["default"]);
    game.state.start('boot');
};

},{"./states/Boot.js":3,"./states/Game.js":4,"./states/Preload.js":5}],2:[function(require,module,exports){
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

	function Player(game, x, y) {
		_classCallCheck(this, Player);

		_get(Object.getPrototypeOf(Player.prototype), 'constructor', this).call(this, game, x, y, 'star');

		game.add.sprite(x, y, 'star');
	}

	_createClass(Player, [{
		key: 'update',
		value: function update() {}
	}]);

	return Player;
})(Phaser.Sprite);

exports['default'] = Player;
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
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
            this.load.image('star', 'assets/images/star.jpg');
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

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _prefabPlayerJs = require("../prefab/Player.js");

var _prefabPlayerJs2 = _interopRequireDefault(_prefabPlayerJs);

var Game = (function (_Phaser$State) {
    _inherits(Game, _Phaser$State);

    function Game() {
        _classCallCheck(this, Game);

        _get(Object.getPrototypeOf(Game.prototype), "constructor", this).call(this);
    }

    _createClass(Game, [{
        key: "create",
        value: function create() {
            this.game.stage.backgroundColor = "#4488AA";
            this.clouds = this.add.group();
            // this.add.sprite(50,100, 'star');

            this.score = 0;
            var style = {
                font: '24px Arial', fill: '#FFFFFF'
            };
            this.txtScore = this.add.text(10, 10, this.score.toString(), style);

            this.star = new _prefabPlayerJs2["default"](this.game, 50, 50);

            console.log(this.star);
        }
    }, {
        key: "update",
        value: function update() {
            if (Math.random() < .01) {
                var cloud = this.clouds.getFirstDead();
                if (cloud) {
                    cloud.x = Math.random() * this.game.width;
                    cloud.y = Math.random() * this.game.height;
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
        key: "onCloudClick",
        value: function onCloudClick(cloud) {
            cloud.kill();
            this.score++;
            this.txtScore.setText(this.score.toString());
        }
    }]);

    return Game;
})(Phaser.State);

exports["default"] = Game;
module.exports = exports["default"];

},{"../prefab/Player.js":2}],5:[function(require,module,exports){
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
            this.load.image('star', 'assets/images/star.jpg');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS91YnVudHUvd29ya3NwYWNlL1BoYXNlckJhc2ljU2V0dXAvc3JjL2FwcC5qcyIsIi9ob21lL3VidW50dS93b3Jrc3BhY2UvUGhhc2VyQmFzaWNTZXR1cC9zcmMvcHJlZmFiL1BsYXllci5qcyIsIi9ob21lL3VidW50dS93b3Jrc3BhY2UvUGhhc2VyQmFzaWNTZXR1cC9zcmMvc3RhdGVzL0Jvb3QuanMiLCIvaG9tZS91YnVudHUvd29ya3NwYWNlL1BoYXNlckJhc2ljU2V0dXAvc3JjL3N0YXRlcy9HYW1lLmpzIiwiL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9QaGFzZXJCYXNpY1NldHVwL3NyYy9zdGF0ZXMvUHJlbG9hZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OzRCQ0dpQixrQkFBa0I7Ozs7K0JBQ2YscUJBQXFCOzs7OzRCQUN4QixrQkFBa0I7Ozs7QUFKbkMsSUFBSSxJQUFJLENBQUM7O0FBTVQsTUFBTSxDQUFDLE1BQU0sR0FBRyxZQUFZO0FBQ3hCLFFBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ2pDLFFBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sNEJBQU8sQ0FBQztBQUM3QixRQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLCtCQUFVLENBQUM7QUFDbkMsUUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSw0QkFBTyxDQUFDO0FBQzdCLFFBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBRTVCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDZG1CLE1BQU07V0FBTixNQUFNOztBQUVmLFVBRlMsTUFBTSxDQUVkLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO3dCQUZKLE1BQU07O0FBSXpCLDZCQUptQixN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QUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ2pGLGdCQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2pDLGdCQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM1RCxnQkFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRXZDLGdCQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUseUJBQXlCLENBQUMsQ0FBQztBQUNwRCxnQkFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDaEQsZ0JBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDdEI7OztlQUVLLGtCQUFHO0FBQ0wsZ0JBQUcsSUFBSSxDQUFDLEtBQUssRUFBQztBQUNWLG9CQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDakM7U0FDSjs7O2VBRWEsMEJBQUc7QUFDYixnQkFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7U0FDckI7OztXQS9CZ0IsT0FBTzs7O3FCQUFQLE9BQU8iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKmdsb2JhbCBQaGFzZXIqL1xudmFyIGdhbWU7XG5cbmltcG9ydCBCb290IGZyb20gXCIuL3N0YXRlcy9Cb290LmpzXCI7XG5pbXBvcnQgUHJlbG9hZCBmcm9tIFwiLi9zdGF0ZXMvUHJlbG9hZC5qc1wiO1xuaW1wb3J0IEdhbWUgZnJvbSBcIi4vc3RhdGVzL0dhbWUuanNcIjtcblxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICBnYW1lID0gbmV3IFBoYXNlci5HYW1lKDgwMCwgNjAwKTtcbiAgICBnYW1lLnN0YXRlLmFkZCgnYm9vdCcsIEJvb3QpO1xuICAgIGdhbWUuc3RhdGUuYWRkKCdwcmVsb2FkJywgUHJlbG9hZCk7XG4gICAgZ2FtZS5zdGF0ZS5hZGQoJ2dhbWUnLCBHYW1lKTtcbiAgICBnYW1lLnN0YXRlLnN0YXJ0KCdib290Jyk7XG4gICAgXG59OyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xuXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHkpIHsgXG5cdFx0XG5cdFx0c3VwZXIoZ2FtZSwgeCwgeSwgJ3N0YXInKTtcblxuICAgICBnYW1lLmFkZC5zcHJpdGUoeCx5LCdzdGFyJyk7XG5cdH1cdFx0XG5cblxuXG5cdHVwZGF0ZSgpIHtcblxuXG5cdH1cblxuXHR9XG5cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvb3Qge1xuICAgIFxuICAgIHByZWxvYWQoKSB7XG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgncHJlbG9hZGVyJywgJ2Fzc2V0cy9pbWFnZXMvbG9hZGluZ19iYXIucG5nJyk7XG4gICAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdzdGFyJywnYXNzZXRzL2ltYWdlcy9zdGFyLmpwZycpO1xuICAgIH1cbiAgICBcbiAgICBjcmVhdGUoKSB7XG4gICAgICAgIHRoaXMuZ2FtZS5pbnB1dC5tYXhQb2ludGVyID0gMTtcbiAgICAgICAgdGhpcy5nYW1lLnN0YXRlLnN0YXJ0KCdwcmVsb2FkJyk7XG4gICAgfVxuICAgIFxuICAgIFxufSIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4uL3ByZWZhYi9QbGF5ZXIuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSBleHRlbmRzIFBoYXNlci5TdGF0ZSB7XG4gICAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG4gICAgXG4gICAgY3JlYXRlKCkge1xuICAgICAgICB0aGlzLmdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gXCIjNDQ4OEFBXCI7XG4gICAgICAgIHRoaXMuY2xvdWRzID0gdGhpcy5hZGQuZ3JvdXAoKTtcbiAgICAgICAgLy8gdGhpcy5hZGQuc3ByaXRlKDUwLDEwMCwgJ3N0YXInKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2NvcmUgPSAwO1xuICAgICAgICB2YXIgc3R5bGUgPSB7XG4gICAgICAgICAgICBmb250OiAnMjRweCBBcmlhbCcsIGZpbGwgOiAnI0ZGRkZGRidcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50eHRTY29yZSA9IHRoaXMuYWRkLnRleHQoMTAsMTAsIHRoaXMuc2NvcmUudG9TdHJpbmcoKSwgc3R5bGUpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5zdGFyID0gbmV3IFBsYXllcih0aGlzLmdhbWUsIDUwLCA1MCk7XG4gICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXIpO1xuICAgICAgICBcbiAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYoTWF0aC5yYW5kb20oKSA8IC4wMSl7XG4gICAgICAgICAgICB2YXIgY2xvdWQgPSB0aGlzLmNsb3Vkcy5nZXRGaXJzdERlYWQoKTtcbiAgICAgICAgICAgIGlmKGNsb3VkKXtcbiAgICAgICAgICAgICAgICBjbG91ZC54ID0gTWF0aC5yYW5kb20oKSAqIHRoaXMuZ2FtZS53aWR0aDtcbiAgICAgICAgICAgICAgICBjbG91ZC55ID0gTWF0aC5yYW5kb20oKSAqIHRoaXMuZ2FtZS5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgY2xvdWQucmV2aXZlKCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHZhciBjbG91ZCA9IHRoaXMuY2xvdWRzLmNyZWF0ZShNYXRoLnJhbmRvbSgpICogdGhpcy5nYW1lLndpZHRoLE1hdGgucmFuZG9tKCkgKiB0aGlzLmdhbWUuaGVpZ2h0LCAnY2xvdWQnKTtcbiAgICAgICAgICAgICAgICBjbG91ZC5pbnB1dEVuYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNsb3VkLmV2ZW50cy5vbklucHV0RG93bi5hZGQodGhpcy5vbkNsb3VkQ2xpY2ssIHRoaXMpO1xuICAgICAgICAgICAgfSAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNsb3VkLmFscGhhID0gMDtcbiAgICAgICAgICAgIHRoaXMuYWRkLnR3ZWVuKGNsb3VkKS50byh7eTogXCItNTBcIiwgYWxwaGE6IDF9LCA4MDAsIFBoYXNlci5FYXNpbmcuQ3ViaWMuT3V0LCB0cnVlKTtcblxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG9uQ2xvdWRDbGljayhjbG91ZCkge1xuICAgICAgICBjbG91ZC5raWxsKCk7XG4gICAgICAgIHRoaXMuc2NvcmUrKztcbiAgICAgICAgdGhpcy50eHRTY29yZS5zZXRUZXh0KHRoaXMuc2NvcmUudG9TdHJpbmcoKSk7XG4gICAgfVxuICAgIFxuICAgIFxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZWxvYWQge1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmFzc2V0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5yZWFkeSA9IGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICBwcmVsb2FkKCkge1xuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ2xvYWRpbmdfYmcnLCAnYXNzZXRzL2ltYWdlcy9sb2FkaW5nX2JnLmpwZycpO1xuICAgIH1cbiAgICBcbiAgICBjcmVhdGUoKSB7XG4gICAgICAgIHRoaXMuYWRkLnNwcml0ZSgwLDAsIFwibG9hZGluZ19iZ1wiKTtcbiAgICAgICAgdGhpcy5hc3NldCA9IHRoaXMuYWRkLnNwcml0ZSh0aGlzLmdhbWUud2lkdGgvMiwgdGhpcy5nYW1lLmhlaWdodC8yLCBcInByZWxvYWRlclwiKTtcbiAgICAgICAgdGhpcy5hc3NldC5hbmNob3Iuc2V0VG8oMC41LDAuNSk7XG4gICAgICAgIHRoaXMubG9hZC5vbkxvYWRDb21wbGV0ZS5hZGRPbmNlKHRoaXMub25Mb2FkQ29tcGxldGUsIHRoaXMpO1xuICAgICAgICB0aGlzLmxvYWQuc2V0UHJlbG9hZFNwcml0ZSh0aGlzLmFzc2V0KTtcbiAgICAgICAgLy9sb2FkIHlvdXIgYXNzZXRzIGhlcmVcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdjbG91ZCcsICdhc3NldHMvaW1hZ2VzL2Nsb3VkLnBuZycpO1xuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3N0YXInLCdhc3NldHMvaW1hZ2VzL3N0YXIuanBnJyk7XG4gICAgICAgICB0aGlzLmxvYWQuc3RhcnQoKTtcbiAgICB9XG4gICAgXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZih0aGlzLnJlYWR5KXtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zdGF0ZS5zdGFydCgnZ2FtZScpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG9uTG9hZENvbXBsZXRlKCkge1xuICAgICAgICB0aGlzLnJlYWR5ID0gdHJ1ZTtcbiAgICB9XG59Il19
