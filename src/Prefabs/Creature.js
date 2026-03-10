class Creature extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key)

        //instantiate to scene
        this.parentScene = scene
        this.parentScene.add.existing(this)
        this.scale = 0.4
    }
}