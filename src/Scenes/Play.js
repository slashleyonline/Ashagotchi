class Play extends Phaser.Scene {
    constructor() {
        super("playScene")

    }

    create() {
        this.bgImg = this.add.image(game.CENTER_X, game.CENTER_Y, 'shell')
        this.bgImg.scale = 1.5

        let ash = new Creature(this,game.CENTER_X,game.CENTER_Y,'ashSprite')
        ash.play('idle', true)
        ash.init()

        this.creature = ash

        let quitButton = new MenuButton(this, 600, 450, 'quitMenuButton')

        this.time = new Date()
        this.timeText = this.add.text(game.CENTER_X + 50, (game.config.height / 4), this.time.getHours(), {
            align: "center",
            color: "black"
        })
        this.resetDate(this.timeText)
        setInterval(this.resetDate, 1000, this.timeText)

        //set of buttons that the player presses to interact with the creature.
        //inefficient method of assigning scale, will change soon.
        let foodButton = new MenuButton(this, game.CENTER_X -135, 415, 'eatButton')
        foodButton.scale = 1.2
        let sleepButton = new MenuButton(this, game.CENTER_X -50, 413, 'sleepButton')
        sleepButton.scale = 1.2
        let playButton = new MenuButton(this, this.game.CENTER_X + 36, 413, 'playButton')
        playButton.scale = 1.2
        let statsButton = new MenuButton(this, this.game.CENTER_X + 127, 413, 'statsButton')
        statsButton.scale = 1.2


        this.statsLayer = this.add.layer()

        this.healthText = this.add.text(game.CENTER_X - 120, (game.config.height / 2) - 40, "Ashagotchi", {
            align: "center",
            color: "pink"
        })
        this.hungerText = this.add.text(game.CENTER_X - 120, (game.config.height / 2)- 15, "Ashagotchi", {
            align: "center",
            color: "black"
        })
        this.sleepText = this.add.text(game.CENTER_X - 120, (game.config.height / 2) + 15, "Ashagotchi", {
            align: "center",
            color: "black"
        })
        this.happyText = this.add.text(game.CENTER_X - 120, (game.config.height / 2) + 40, "Ashagotchi", {
            align: "center",
            color: "pink"
        })

        this.statsLayer.add([this.healthText, this.hungerText, this.sleepText, this.happyText])
        this.statsLayer.setVisible(false)

    }

    //defines and formats the date for the player to see.
    resetDate(timeText) {
        this.time = new Date()

        let militaryHours = this.time.getHours()
        let hours = militaryHours
        let ampm = 'PM'
        if (militaryHours == 12) {
            ampm = 'PM'
        }
        else if (militaryHours > 12) {
            hours = militaryHours - 12
        }
        else if (militaryHours == 0) {
            hours = 12
            ampm = 'AM'
        }
        else {
            hours = militaryHours
            ampm = 'AM'
        }
        let minutes =  this.time.getMinutes()

        if (minutes < 10) {
            minutes = ('0' + minutes)
        }

        timeText.text = (hours + ':' + minutes + ' ' + ampm)
    }

    //called by the menu button. Adds any particular amount to a set of stats for the creature
    //acceptable values for stat include: 'hunger', 'sleep', and 'happiness'
    //amnt should be a positive integer value.
    replenishStat(stat, amnt) {
        this.creature.addToStat(stat, amnt)
    }

    toggleDisplayStats(toggle) {
        //when this button is pressed the stats screen will show up
        this.creature.visible = toggle
        this.statsLayer.setVisible(!toggle)

    }
}