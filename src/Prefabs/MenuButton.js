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

        if (key != 'button') {
            this.setEvent(key)
        }

        this.scale= 0.25
        this.on('pointerdown', () => { 
            scene.sound.play('press')
        })

    }

    setEvent(key) {
        if (key == 'playMenuButton') {
            this.on('pointerdown', () => {
                this.anims.play('open')
                this.parentScene.console.play('intro')
                setTimeout(() => {
                    this.parentScene.console.setToTop()
                }, 400);
            })
        }
        else if (key == 'quitMenuButton') {
            this.on('pointerdown', () => {
                this.parentScene.clearIntervals()
                this.parentScene.scene.start('menuScene')
            })
        }
        else if (key == 'eatButton') {
            this.on('pointerdown', () => {
                this.parentScene.replenishStat('hunger', 10)
            })
        }
        else if (key == 'sleepButton') {
            this.on('pointerdown', () => {
                this.parentScene.replenishStat('sleep', 10)
            })
        }
        else if (key == 'playButton') {
            this.on('pointerdown', () => {
                this.parentScene.replenishStat('happiness', 10)
            })
        }
        else if (key == 'statsButton') {
            this.on('pointerdown', () => {
                this.parentScene.toggleDisplayStats(!this.parentScene.creature.visible)
            })
        }
        else if (key == 'letter') {
            this.on('pointerdown', () => {
                this.visible = false
                this.parentScene.finalMessage.visible = true
                this.parentScene.finalMessage.closeButton.visible = true
            })
        }
        else if (key == 'exit') {
            this.on('pointerdown', () => {
                this.visible = false
                this.parentScene.finalMessage.visible = false
            })
        }
    }

}