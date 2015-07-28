	// Bar = function (game, unique_id, x, y, sprite, enemy) {

	//     Phaser.Sprite.call(this, game, x, y, sprite);

	//     this.unique_id = unique_id;
	//     this.enemy = enemy;
	// 	//this.x = x;
	// 	//this.y = y;

	//     game.add.existing(this);
	//     game.physics.enable([this,ball], Phaser.Physics.ARCADE);
	//     this.body.immovable = true;

	// };

	// Bar.prototype = Object.create(Phaser.Sprite.prototype);
	// Bar.prototype.constructor = Bar;

	// Bar.prototype.update = function() {		
	// 	game.physics.arcade.collide(this, ball);
	// }


	// Ball = function(game, unique_id, x, y, sprite) {
	// 	Phaser.Sprite.call(this, game, x, y, sprite);

	// 	this.unique_id = unique_id;
	// 	game.add.existing(this);
	// 	game.physics.arcade.enable(this);
	// 	//this.body.velocity.setTo(400, 400);
	// 	this.body.collideWorldBounds = true;
	// 	this.body.bounce.setTo(1, 1);
	// }

	// Ball.prototype = Object.create(Phaser.Sprite.prototype);
	// Ball.prototype.constructor = Ball;


	// Ball.prototype.update = function() {

	// } 


	var characterAnimations = {
		'sprite_initial': 0,
		'walk_down': [0,1,2,3,4,5,6],
		'walk_left': [23,24,25,26,27,28,29],
		'walk_right': [34,35,36,37,38,39,40],
		'walk_up': [11,12,13,14,15,16,17]
	};

	var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'phaser-example', {preload: preload, create: create, update: update, render: render });

	function preload() {
		game.stage.disableVisibilityChange = true;
		game.time.advancedTiming = true;

		game.load.spritesheet('character', 'topdown-sheet3.png', 150, 117, 22);

		game.load.image('ball', 'ball.png');

	}


	function create() {

		game.physics.startSystem(Phaser.Physics.ARCADE);

		cursors = game.input.keyboard.createCursorKeys();
		var character = game.add.sprite(300, 200, 'character');
		character.animations.add('walk-down', characterAnimations.walk_up);
		character.animations.play('walk-down', 20, true);
		//ball = new Ball(game, 'aaa', 500, 370, 'ball');

		// if (localStorage.getItem("nickname") == '' || localStorage.getItem("nickname") == null) {
		// 	var nick = prompt('Enter your nickname');
		// 	localStorage.setItem("nickname", nick);
		// }

		// var nickname = localStorage.getItem("nickname");
	}


	function update () {

		

	}


	function render () {
		game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");
	}



