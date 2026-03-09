class InfoDump extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key)

        this.parentScene = scene
        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)

        this.body.setImmovable()
        this.body.allowGravity = false

        //this.exitButton = new ReplayButton(scene, game.config.width * 8/9, game.config.height * 1/9, 'quitButton')
    }
}