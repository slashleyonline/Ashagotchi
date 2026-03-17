class InfoDump extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key)

        this.parentScene = scene
        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)

        this.body.setImmovable()
        this.body.allowGravity = false

       //add a button for closing it
       this.closeButton = new InfoDumpCloseButton(scene, 100, 80, 'exit', this)
       this.closeButton.scale = 2
       this.closeButton.visible = true
    }
}