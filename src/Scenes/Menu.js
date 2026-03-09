class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    init() {
        this.CENTER = (game.config.width / 2) - 50
    }

    preload() {
        this.load.path = "./assets/"
        this.load.spritesheet('playButton', 'playButton.png', {
            frameWidth: 303,
            frameHeight: 175
        })
    }

    create() {
        this.add.text(this.CENTER, (game.config.height / 2)- 200, "Ashagotchi", {
            align: "center"
        })

        let playButton = new MenuButton(this, (game.config.width / 2), 300, 'playButton')
        playButton.scale = 0.25
    }
}