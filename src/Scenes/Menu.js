class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        this.load.path = "./assets/"
        this.load.spritesheet('playMenuButton', 'Box/box_back_sprite.png', {
            frameWidth: 224,
            frameHeight: 209
        })
        this.load.spritesheet('quitMenuButton', 'UI/restartButton.png', {
            frameWidth: 300,
            frameHeight: 49
        })
        this.load.spritesheet('ashSprite', 'Ash/AshSpritesheet.png', {
            frameWidth: 640,
            frameHeight: 480
        })
        this.load.spritesheet('playButton', 'Buttons/playButton.png', {
            frameWidth: 38
        })
        this.load.spritesheet('eatButton', 'Buttons/eatButton.png', {
            frameWidth: 38
        })
        this.load.spritesheet('sleepButton', 'Buttons/sleepButton.png', {
            frameWidth: 38
        })
        this.load.spritesheet('statsButton', 'Buttons/statsButton.png', {
            frameWidth: 38
        })
        this.load.spritesheet('console', 'Console/sprite_sheet_4.png', {
            frameWidth: 655,
            frameHeight: 480
        })
        this.load.spritesheet('needing', 'Ash/needing.png', {
            frameWidth: 640,
            frameHeight: 548
        })
        this.load.spritesheet('dead', 'Ash/dead.png', {
            frameWidth: 640,
            frameHeight: 548
        })
        this.load.spritesheet('winDance', 'Ash/winDance.png',{
            frameWidth: 655,
            frameHeight: 548
        })
        this.load.spritesheet('message', 'UI/Message.png', {
            frameWidth: 400,
            frameHeight: 300
        })
        this.load.spritesheet('letter', 'UI/letter.png', {
            frameWidth: 20
        })
        this.load.spritesheet('exit', 'UI/Exit.png', {
            frameWidth: 20
        })
        this.load.spritesheet('eating', 'Ash/eating.png', {
            frameWidth: 655,
            frameHeight: 548
        })
        this.load.spritesheet('rockpaper', 'Ash/rockpaper.png', {
            frameWidth: 655,
            frameHeight: 548
        })

        this.load.image('thoughtBubble', 'UI/thoughtBubble.png')
        this.load.image('hungryThought', 'UI/burger.png')
        this.load.image('sleepyThought', 'UI/sleepIcon.png')
        this.load.image('playThought', 'UI/rockpaperscissors.png')
        this.load.image('gameOverText', 'UI/GameOverText.png')
        this.load.image('gameOverText', 'UI/restartButton.png')

        this.load.image('background', 'background/FiRoom.png')
        this.load.image('box_front', 'Box/box_front_sprite.png')
        this.load.image('shell', 'consoleShellRender.png')
        this.load.image('youWin', 'UI/youWin.png')
        this.load.image('youLose', 'UI/youLose.png')
        this.load.image('tie', 'UI/Tie.png')
        this.load.image('rockIcon', 'UI/rock.png')
        this.load.image('paperIcon', 'UI/paper.png')
        this.load.image('scissorsIcon', 'UI/scissors.png')
        this.load.image('blackScreen', 'blackScreen.png')

        this.load.audio('gameOver', 'Sounds/gameOver.wav')
        this.load.audio('hungry', 'Sounds/Hungry.wav')
        this.load.audio('playful', 'Sounds/Playful.wav')
        this.load.audio('sleepy', 'Sounds/Sleepy.wav')
        this.load.audio('press', 'Sounds/Press.wav')
        this.load.audio('winGame', 'Sounds/winGame.wav')
    }

    create() {
        //animations
        this.anims.create({
            key: 'idle',
            frameRate: 2,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('ashSprite', {
                start: 0,
                end: 1
            })
        })
        this.anims.create({
            key: 'dead',
            frameRate: 1,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('dead', {
                start: 0,
                end:0
            })
        })
        this.anims.create({
            key: 'rockpaper',
            frameRate: 3,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('rockpaper', {
                start: 0,
                end:1
            })            
        })
        this.anims.create({
            key: 'winDance',
            frameRate: 2,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('winDance', {
                start: 0,
                end:3
            })
        })
        this.anims.create({
            key: 'eating',
            frameRate: 6,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('eating', {
                start: 0,
                end: 5
            })
        })
        this.anims.create({
            key:'open',
            frameRate: 24,
            repeat:0,

            frames: this.anims.generateFrameNumbers('playMenuButton', {
                start: 0,
                end: 24
            })
        })
        this.anims.create({
            key: 'needing',
            frameRate: 2,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('needing', {
                start: 0,
                end: 1
            })
        })
        this.anims.create({
            key:'intro',
            duration: 1000,
            repeat:0,

            frames: this.anims.generateFrameNumbers('console', {
                start: 0,
                end: 17
            })
        })
        

        //set up visuals
        this.add.image(game.CENTER_X, game.CENTER_Y, 'background')

        this.add.text(game.CENTER_X - 50, (game.config.height / 2)- 200, "Ashagotchi", {
            align: "center"
        })

        let playButton = new MenuButton(this, game.CENTER_X - 12, game.CENTER_Y -23, 'playMenuButton')
        playButton.scale = 3.5
        this.console = this.add.sprite(game.CENTER_X - 12, game.CENTER_Y - 23, 'console')
        this.console.scale = 1.5
        this.front = this.add.image(game.CENTER_X + 13, game.CENTER_Y- 23, 'box_front')
        this.front.scale = 3.5

        this.console.on('animationcomplete', () => {
                setTimeout(() => {
                    this.scene.start('playScene')
                }, 1000);
        })
    }
}