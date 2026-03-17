class InfoDumpCloseButton extends Phaser.Physics.Arcade.Sprite { 
    constructor(scene, x, y, key, parent) {
        super(scene, x, y, key)

        this.parent = parent

        this.parentScene = scene
        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)
        
        this.body.setImmovable(true)
        this.setInteractive()

        this.body.allowGravity = false

        this.on('pointerdown', () => { 
            this.parent.visible = false
            this.visible = false
        })

        this.scale= 0.25
        this.on('pointerdown', () => { 
            scene.sound.play('press')
        })
    }

}
