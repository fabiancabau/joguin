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

	Character = function(game, unique_id, x, y, sprite) {
		Phaser.Sprite.call(this, game, x, y, sprite);

		this.playergroup = game.add.group();

		this.unique_id = unique_id;
		this.walking_direction = 'stop';
		this.hp = 20;
		this.totalhp = 20;
		this._lasthp = 0;


		game.add.existing(this);
		game.physics.enable(this, Phaser.Physics.ARCADE);

		this.body.collideWorldBounds = true;

		this.animations.add('walk_up', characterAnimations.walk_up);
		this.animations.add('walk_down', characterAnimations.walk_down);
		this.animations.add('walk_right', characterAnimations.walk_right);
		this.animations.add('walk_left', characterAnimations.walk_left);

		this.frame = 11;

		this.healthbar = new Healthbar(this);
		
		
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


	Character.prototype.attackEnemy = function() {

		// POR ALGUM MOTIVO O CONTEXTO DESAPARECE SE NAO FIZER ISSO
		var context = this;
		initial_y = this.y;
		
		//Seta a direção para cima
		context.walking_direction = 'up';

		console.log('This no começo do metodo walkLeft');
		console.log(this);
		
		//Cria o tween de movimentar para cima
		characterWalksUp = game.add.tween(context);

		//Chama o método .to passando o y desejado (negativo, pois vai andar para cima)
		characterWalksUp.to( { y: enemy.y + enemy.height }, 900, Phaser.Easing.Linear.None, true);
		//characterWalksUp.yoyo(true, 500);

		//Ao completar a animação para cima
		characterWalksUp.onComplete.add(function(){

			var text = createText(enemy.x + 130, enemy.y + 60, '300');
    		text.setShadow(1, 1, 'rgba(0,0,0,0.5)', 3);

			//Muda a direção do boneco
			context.walking_direction = 'down';

			//Cria um novo tween
			characterWalksLeft = game.add.tween(context);

			//Cria a animação para movimentar para a direita
			characterWalksLeft.to( { y: initial_y }, 2000, Phaser.Easing.Linear.None, true);

			//Ao completar a animação
			characterWalksLeft.onComplete.add(function(){

				//Para o boneco
				context.walking_direction = 'stop';
				
				context.animations.stop();
				context.frame = 11;

				//Lixo do cacete
				console.log('This no fim do método walkRight');
				console.log(this);
			});
		});

	}


	Character.prototype.update = function() {

		if (this.walking_direction == 'left') {
			this.animations.play('walk_left', 30, true);
		}
		else if (this.walking_direction == 'up') {
			this.animations.play('walk_up', 30, true);
		}
		else if (this.walking_direction == 'right') {
			this.animations.play('walk_right', 30, true);
		}
		else if (this.walking_direction == 'down') {
			this.animations.play('walk_down', 30, true);
		}
		else {
			this.animations.stop();
		}

		this.healthbar.draw(this);

	}

	function rgbToHex(r, g, b) {
    	return "0x" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	}


	var Healthbar = function(){
		this.bar = game.add.graphics(0,0);
	};

	Healthbar.prototype.draw = function(character) {

		if (character._lasthp !== character.hp) {
			this.bar.clear();
			var x = (character.hp / character.totalhp) * 100;

			var colour = this.rgbToHex((x > 50 ? 1-2*(x-50)/100.0 : 1.0) * 255, (x > 50 ? 1.0 : 2*x/100.0) * 255, 0);

			this.bar.beginFill(colour);
		    this.bar.lineStyle(5, colour, 1);
		    this.bar.moveTo(0,-5);
		    this.bar.lineTo(7 * character.hp, -5);
		    this.bar.endFill();

		    this.bar.x = character.x;
		    this.bar.y = character.y;
		}
	};

	Healthbar.prototype.rgbToHex = function(r, g, b) {
		return "0x" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	};



	Enemy = function(game, unique_id, x, y, sprite) {
		Phaser.Sprite.call(this, game, x, y, sprite);

		this.unique_id = unique_id;

		game.add.existing(this);
		game.physics.enable(this, Phaser.Physics.ARCADE);

		this.hp = 20;
		this.totalhp = 20;
		this._lasthp = 0;

		this.body.collideWorldBounds = true;

		this.animations.add('walk_up', enemyAnimations.walk_up);
		this.animations.add('walk_down', enemyAnimations.walk_down);
		this.animations.add('walk_right', enemyAnimations.walk_right);
		this.animations.add('walk_left', enemyAnimations.walk_left);

		this.healthbar = new Healthbar();

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

		this.healthbar.draw(this);

	} 

	var game = new Phaser.Game(1100, 600, Phaser.AUTO, 'phaser-example', {preload: preload, create: create, update: update, render: render });

	function preload() {
		game.stage.disableVisibilityChange = true;
		game.time.advancedTiming = true;

		game.load.spritesheet('character', 'topdown-sheet3.png', 150, 117, 44);
		game.load.spritesheet('enemy', 'topdown-nazi.png', 150, 117, 44);

		game.load.image('arrow_left', 'arrow_left.png');
		game.load.image('arrow_right', 'arrow_right.png');

		game.load.image('attack', 'attack.png');

	}

	var character;
	var enemy;
	var text;

	function create() {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.stage.backgroundColor = '#E8E8E8';

		character = new Character(game, 'ABC1234', 500, 430, 'character');
		enemy = new Enemy(game, '111222', 500, 20, 'enemy');

		arrow_left = game.add.button(game.world.centerX - 500, 400, 'arrow_left', character.walkLeft, character, 2, 1, 0);
		arrow_right = game.add.button(game.world.centerX + 380, 400, 'arrow_right', character.walkRight, character, 2, 1, 0);

		attack_button = game.add.button(game.world.centerX - 200, 500, 'attack', character.attackEnemy, character, 2, 1, 0);

    	arrow_left.input.useHandCursor = true;
    	arrow_right.input.useHandCursor = true;
		
	}

	function update () {
		//game.physics.arcade.collide(character, character, collisionHandler, null, this);
	}


	function collisionHandler (obj1, obj2) {
    	//  The two sprites are colliding
    	game.stage.backgroundColor = '#992d2d';
	}

	function render () {
		game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");
	}

	function createText(x, y, text) {

	    var text = game.add.text(x, y, text);
	    text.alpha = 0;
	    text.anchor.set(0.5);
	    text.align = 'center';

	    //	Font style
	    text.font = 'Arial Black';
	    text.fontSize = 22;
	    text.fontWeight = '';
	    text.fill = '#E60039';

	    var text_tween = game.add.tween(text).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
	    text_tween.onComplete.add(function(){
	    	console.log(text);
	    	text.destroy();
	    });
	    return text;

	}



