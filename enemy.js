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

module.exports = Enemy;