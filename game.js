	var characterAnimations = {
		'sprite_initial': 0,
		'walk_down': [0,1,2,3,4,5,6],
		'walk_left': [22,23,24,25,26,27,28],
		'walk_right': [33,34,35,36,37,38,39],
		'walk_up': [11,12,13,14,15,16,17]
	};

	var enemyAnimations = {
		'sprite_initial': 0,
		'walk_down': [0,1,2,3,4,5,6],
		'walk_left': [22,23,24,25,26,27,28],
		'walk_right': [33,34,35,36,37,38,39],
		'walk_up': [11,12,13,14,15,16,17]
	};

	Character = function(game, unique_id, x, y, sprite, controlSchema) {
		Phaser.Sprite.call(this, game, x, y, sprite);

		this.controlSchema = controlSchema;	
		this.unique_id = unique_id;

		this.walking_direction = 'stop';

		game.add.existing(this);
		game.physics.enable(this, Phaser.Physics.ARCADE);

		this.body.collideWorldBounds = true;

		this.animations.add('walk_up', characterAnimations.walk_up);
		this.animations.add('walk_down', characterAnimations.walk_down);
		this.animations.add('walk_right', characterAnimations.walk_right);
		this.animations.add('walk_left', characterAnimations.walk_left);


		this.frame = 12;
		
	}

	Character.prototype = Object.create(Phaser.Sprite.prototype);
	Character.prototype.constructor = Character;

	Character.prototype.walkLeft = function() {

		// POR ALGUM MOTIVO O CONTEXTO DESAPARECE SE NAO FIZER ISSO
		var context = this;

		//Seta a direção para cima
		context.walking_direction = 'up';

		console.log('This no começo do metodo walkLeft');
		console.log(this);
		
		//Cria o tween de movimentar para cima
		characterWalksUp = game.add.tween(context);

		//Chama o método .to passando o y desejado (negativo, pois vai andar para cima)
		characterWalksUp.to( { y: context.y - 200 }, 1400, Phaser.Easing.Linear.None, true);

		//Ao completar a animação para cima
		characterWalksUp.onComplete.add(function(){

			//Muda a direção do boneco
			context.walking_direction = 'left';

			//Cria um novo tween
			characterWalksLeft = game.add.tween(context);

			//Cria a animação para movimentar para a esquerda
			characterWalksLeft.to( { x: context.x - 460 }, 2000, Phaser.Easing.Linear.None, true);

			//Ao completar a animação
			characterWalksLeft.onComplete.add(function(){

				//Para o boneco
				context.walking_direction = 'stop';

				//Lixo do cacete
				console.log('This no fim do método walkLeft');
				console.log(this);
			});
		});

	}

	Character.prototype.walkRight = function() {

		// POR ALGUM MOTIVO O CONTEXTO DESAPARECE SE NAO FIZER ISSO
		var context = this;

		//Seta a direção para cima
		context.walking_direction = 'up';

		console.log('This no começo do metodo walkLeft');
		console.log(this);
		
		//Cria o tween de movimentar para cima
		characterWalksUp = game.add.tween(context);

		//Chama o método .to passando o y desejado (negativo, pois vai andar para cima)
		characterWalksUp.to( { y: context.y - 200 }, 1400, Phaser.Easing.Linear.None, true);

		//Ao completar a animação para cima
		characterWalksUp.onComplete.add(function(){

			//Muda a direção do boneco
			context.walking_direction = 'right';

			//Cria um novo tween
			characterWalksLeft = game.add.tween(context);

			//Cria a animação para movimentar para a direita
			characterWalksLeft.to( { x: context.x + 460 }, 2000, Phaser.Easing.Linear.None, true);

			//Ao completar a animação
			characterWalksLeft.onComplete.add(function(){

				//Para o boneco
				context.walking_direction = 'stop';

				//Lixo do cacete
				console.log('This no fim do método walkRight');
				console.log(this);
			});
		});

	}


	Character.prototype.update = function() {

		// if (this.controlSchema == 1) {
		// 	if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
		//     {
		//     	this.animations.play('walk_left', 30, true);
		//     	this.body.velocity.y = 0;
		//         this.body.velocity.x = -150;
		//     }
		//     else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
		//     {
		//     	this.animations.play('walk_right', 30, true);
		//     	this.body.velocity.y = 0;
		//         this.body.velocity.x = 150;
		//     }
		//     else if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
		//     {
		//     	this.animations.play('walk_up', 30, true);
		//     	this.body.velocity.x = 0;
		//         this.body.velocity.y = -150;
		//     }
		//     else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
		//     {
		//     	this.animations.play('walk_down', 30, true);
		//     	this.body.velocity.x = 0;
		//         this.body.velocity.y = 150;
		//     }
		//     else {
		//     	this.animations.stop();
		//     	this.body.velocity.x = 0;
		//     	this.body.velocity.y = 0;
		//     }
		// }
		// else if (this.controlSchema == 2) {
		// 	if (game.input.keyboard.isDown(Phaser.Keyboard.A))
		//     {
		//     	this.animations.play('walk_left', 30, true);
		//     	this.body.velocity.y = 0;
		//         this.body.velocity.x = -150;
		//     }
		//     else if (game.input.keyboard.isDown(Phaser.Keyboard.D))
		//     {
		//     	this.animations.play('walk_right', 30, true);
		//     	this.body.velocity.y = 0;
		//         this.body.velocity.x = 150;
		//     }
		//     else if (game.input.keyboard.isDown(Phaser.Keyboard.W))
		//     {
		//     	this.animations.play('walk_up', 30, true);
		//     	this.body.velocity.x = 0;
		//         this.body.velocity.y = -150;
		//     }
		//     else if (game.input.keyboard.isDown(Phaser.Keyboard.S))
		//     {
		//     	this.animations.play('walk_down', 30, true);
		//     	this.body.velocity.x = 0;
		//         this.body.velocity.y = 150;
		//     }
		//     else {
		//     	this.animations.stop();
		//     	this.body.velocity.x = 0;
		//     	this.body.velocity.y = 0;
		//     }
		// }



		if (this.walking_direction == 'left') {
			this.animations.play('walk_left', 30, true);
		}
		else if (this.walking_direction == 'up') {
			this.animations.play('walk_up', 30, true);
		}
		else if (this.walking_direction == 'right') {
			this.animations.play('walk_right', 30, true);
		}
		else {
			this.animations.stop();
		}

	}


	Enemy = function(game, unique_id, x, y, sprite) {
		Phaser.Sprite.call(this, game, x, y, sprite);

		this.unique_id = unique_id;


		game.add.existing(this);
		game.physics.enable(this, Phaser.Physics.ARCADE);

		this.body.collideWorldBounds = true;

		this.animations.add('walk_up', enemyAnimations.walk_up);
		this.animations.add('walk_down', enemyAnimations.walk_down);
		this.animations.add('walk_right', enemyAnimations.walk_right);
		this.animations.add('walk_left', enemyAnimations.walk_left);


		this.frame = 0;
		
	}

	Enemy.prototype = Object.create(Phaser.Sprite.prototype);
	Enemy.prototype.constructor = Enemy;


	Enemy.prototype.update = function() {
		if (this.walking_direction == 'left') {
			this.animations.play('walk_left', 30, true);
		}
		else if (this.walking_direction == 'up') {
			this.animations.play('walk_up', 30, true);
		}
		else if (this.walking_direction == 'right') {
			this.animations.play('walk_right', 30, true);
		}
		else {
			this.animations.stop();
		}

	} 

	var game = new Phaser.Game(1100, 600, Phaser.AUTO, 'phaser-example', {preload: preload, create: create, update: update, render: render });

	function preload() {
		game.stage.disableVisibilityChange = true;
		game.time.advancedTiming = true;

		game.load.spritesheet('character', 'topdown-sheet3.png', 150, 117, 44);
		game.load.spritesheet('enemy', 'topdown-nazi.png', 150, 117, 44);

		game.load.image('arrow_left', 'arrow_left.png');
		game.load.image('arrow_right', 'arrow_right.png');

	}

	var character;
	var character2;

	function create() {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.stage.backgroundColor = '#FFFAAA';
		//character = new Character(game, 'ABC123', 300, 200, 'character', 1);
		character2 = new Character(game, 'ABC1234', 500, 430, 'character', 2);
		enemy = new Enemy(game, '111222', 500, 10, 'enemy');

		arrow_left = game.add.button(game.world.centerX - 500, 400, 'arrow_left', character2.walkLeft, character2, 2, 1, 0);
		arrow_right = game.add.button(game.world.centerX + 380, 400, 'arrow_right', character2.walkRight, character2, 2, 1, 0);
    	arrow_left.input.useHandCursor = true;
    	arrow_right.input.useHandCursor = true;
		
	}

	function update () {
		//game.physics.arcade.collide(character, character2, collisionHandler, null, this);
	}


	// function walkLeft() {
	// 	character2.walking_direction = 'up';
		
	// 	characterWalksUp = game.add.tween(character2);
	// 	characterWalksLeft = game.add.tween(character2);

	// 	characterWalksUp.to( { y: character2.y - 200 }, 1400, Phaser.Easing.Linear.None, true);
	// 	characterWalksUp.onComplete.add(function(){
	// 		character2.walking_direction = 'left';
	// 		characterWalksLeft.to( { x: character2.x - 460 }, 2000, Phaser.Easing.Linear.None, true);
	// 	});

	// 	characterWalksLeft.onComplete.add(function(){
	// 		character2.walking_direction = 'stop';
	// 		console.log('parou 2');
	// 	});
	// }

	// function walkRight() {
	// 	character2.walking_direction = 'up';
		
	// 	characterWalksUp = game.add.tween(character2);
	// 	characterWalksLeft = game.add.tween(character2);

	// 	console.log(character2);

	// 	characterWalksUp.to( { y: character2.y - 200 }, 1400, Phaser.Easing.Linear.None, true);
	// 	characterWalksUp.onComplete.add(function(){
	// 		character2.walking_direction = 'right';
	// 		characterWalksLeft.to( { x: character2.x + 460 }, 2000, Phaser.Easing.Linear.None, true);
	// 	});

	// 	characterWalksLeft.onComplete.add(function(){
	// 		character2.walking_direction = 'stop';
	// 		console.log('parou 2');
	// 	});
	// }

	function collisionHandler (obj1, obj2) {
    	//  The two sprites are colliding
    	game.stage.backgroundColor = '#992d2d';
	}

	function render () {
		game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");
	}



