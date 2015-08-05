	// var characterAnimations = {
	// 	'sprite_initial': 0,
	// 	'walk_down': [0,1,2,3,4,5,6],
	// 	'walk_left': [22,23,24,25,26,27,28],
	// 	'walk_right': [33,34,35,36,37,38,39],
	// 	'walk_up': [11,12,13,14,15,16,17]
	// };

	// Character = function(game, unique_id, x, y, sprite) {
	// 	Phaser.Sprite.call(this, game, x, y, sprite);

	// 	this.playergroup = game.add.group();

	// 	this.unique_id = unique_id;
	// 	this.walking_direction = 'stop';
	// 	this.hp = 20;
	// 	this.totalhp = 20;
	// 	this._lasthp = 0;


	// 	game.add.existing(this);
	// 	game.physics.enable(this, Phaser.Physics.ARCADE);

	// 	this.body.collideWorldBounds = true;

	// 	this.animations.add('walk_up', characterAnimations.walk_up);
	// 	this.animations.add('walk_down', characterAnimations.walk_down);
	// 	this.animations.add('walk_right', characterAnimations.walk_right);
	// 	this.animations.add('walk_left', characterAnimations.walk_left);

	// 	this.frame = 11;

	// 	this.healthbar = new Healthbar(this);	
	// }

	// Character.prototype = Object.create(Phaser.Sprite.prototype);
	// Character.prototype.constructor = Character;

	// Character.prototype.update = function() {

	// 	if (this.walking_direction == 'left') {
	// 		this.animations.play('walk_left', 30, true);
	// 	}
	// 	else if (this.walking_direction == 'up') {
	// 		this.animations.play('walk_up', 30, true);
	// 	}
	// 	else if (this.walking_direction == 'right') {
	// 		this.animations.play('walk_right', 30, true);
	// 	}
	// 	else if (this.walking_direction == 'down') {
	// 		this.animations.play('walk_down', 30, true);
	// 	}
	// 	else {
	// 		this.animations.stop();
	// 	}

	// 	this.healthbar.draw(this);

	// }

	var game = new Phaser.Game(1100, 560, Phaser.AUTO, 'phaser-example', {preload: preload, create: create, update: update, render: render });

	function preload() {
		game.stage.disableVisibilityChange = true;
		game.load.tilemap('tilemap', 'map.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('tiles', 'tileset_forTiled.png');

		game.load.spritesheet('dude', 'dude.png', 32, 48);

	}

	var map;
	var backgroundlayer;
	var groundlayer;
	var player;
	var jumpTimer = 0;
	var cursors;
	var jumpButton;

	function create() {

		map = game.add.tilemap('tilemap');
		map.addTilesetImage('tileset_forTiled', 'tiles');

		backgroundlayer = map.createLayer('background');
		groundlayer = map.createLayer('platform');

		groundlayer.debug = true;

		map.setCollision(44, true, 'platform');
		backgroundlayer.resizeWorld();

		player = game.add.sprite(50, 32, 'dude'); //50 x 32 = starting position
		game.physics.enable(player, Phaser.Physics.ARCADE);

		player.body.gravity.y = 1000;

		player.body.collideWorldBounds = true;
		player.body.setSize(50, 32, 0, 0);

		player.anchor.setTo(.5, 1); //so it flips around its middle
		player.animations.add('move', [5, 6, 7, 8], 10, true);

		game.camera.follow(player);

		cursors = game.input.keyboard.createCursorKeys();
		jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		
	}

	function update () {

		player.body.velocity.x = 0; //default speed - stationary
		game.physics.arcade.collide(player, groundlayer);
		

		if (cursors.left.isDown) {
			player.scale.x = -1;
			player.body.velocity.x = -150;
			player.animations.play('move');
		}
		else if (cursors.right.isDown) {
			player.scale.x = 1;
			player.body.velocity.x = 150;
			player.animations.play('move');
		}
		else {
			player.animations.stop();
			player.frame = 5;
		}

		if (cursors.up.isDown || jumpButton.isDown) {
			if (player.body.onFloor()) {
				player.body.velocity.y = -650;
			}
		}

		
	}

	function render () {
		game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");
	}





