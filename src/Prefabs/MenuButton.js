class MenuButton extends Phaser.Physics.Arcade.Sprite { 
    constructor(scene, x, y, key) {
        super(scene, x, y, key)

        this.parentScene = scene
        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)

        this.scale = 1.5
        
        this.body.setImmovable(true)
        this.setInteractive()

        this.body.allowGravity = false

        this.key = key

        this.on('pointerdown', () => {
            console.log('wa')
            this.parentScene.scene.start('playScene')
        })

    }
    moveScene() {
        if (this.key == 'playButton') {
            console.log('play!')
            this.parentScene.scene.start('playScene')
        }
    }
}