class Play extends Phaser.Scene {
    constructor() {
        super("playScene")

    }

    create() {
        this.add.image(game.CENTER_X, game.CENTER_Y, 'background')
        this.console = this.add.image(game.CENTER_X, game.CENTER_Y, 'shell')
        this.console.scale = 1.5

        this.creature = new Creature(this,game.CENTER_X,game.CENTER_Y,'ashSprite')
        let ash = this.creature
        ash.init()

        let quitButton = new MenuButton(this, 540, 20, 'quitMenuButton')
        quitButton.scale = 0.55

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
        
        let textConfig = {
            align: "center",
            color: "black"
        }
        this.healthText = this.add.text(game.CENTER_X - 120, (game.config.height / 2) - 40, "Ashagotchi", textConfig)
        this.hungerText = this.add.text(game.CENTER_X - 120, (game.config.height / 2)- 15, "Ashagotchi", textConfig)
        this.sleepText = this.add.text(game.CENTER_X - 120, (game.config.height / 2) + 15, "Ashagotchi", textConfig)
        this.happyText = this.add.text(game.CENTER_X - 120, (game.config.height / 2) + 40, "Ashagotchi", textConfig)

        this.statsText = {
            health: this.healthText,
            hunger: this.hungerText,
            sleep: this.sleepText,
            happy: this.happyText
        }

        this.statsLayer.add([this.healthText, this.hungerText, this.sleepText, this.happyText])
        this.statsLayer.setVisible(false)

        this.setStatText(this.creature, this.statsText)

        this.time = new Date()
        let timeText = this.add.text(game.CENTER_X + 50, (game.config.height / 4), this.time.getHours(), {
            align: "center",
            color: "black"
        })

        this.resetDate(timeText)
        
        this.resetInterval = setInterval(this.resetDate, 1000, timeText)
        this.textInterval = setInterval(this.setStatText, 1000, this.creature, this.statsText)

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
        this.creature.actionState()
        this.setStatText(this.creature, this.statsText)
    }

    setStatText(creature, statsText) {
        let stats = creature.getStats()
        statsText.health.text = ('Health: ' + stats.health)
        statsText.hunger.text = ('Hunger: ' + stats.hunger)
        statsText.happy.text = ('Happiness: ' + stats.happiness)
        statsText.sleep.text = ('Sleep: ' + stats.sleep)
    }

    toggleDisplayStats(toggle) {
        //when this button is pressed the stats screen will show up
        this.creature.visible = toggle
        this.statsLayer.setVisible(!toggle)

    }

    clearIntervals() {
        clearInterval(this.resetInterval)
        clearInterval(this.textInterval)
        clearInterval(this.creature.incrementInterval)
        this.creature.destroy()
    }

    update() {
        this.creatureFSM.step()
    }
}