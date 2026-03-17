class Creature extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key)

        //instantiate to scene
        this.parentScene = scene
        this.parentScene.add.existing(this)
        this.scale = 0.4

        this.health = 50
        //overall health of the creature
        //the average of all stats
        //if it reaches 0, game over

        this.happiness = 50
        //increases gradually but the rate of increasing is maintained by playing with creature

        this.sleep = 42
        //refilled by sleeping
        
        this.hunger = 20
        //refilled by eating


        this.busy = false
        //pauses stat decremation if FSM enters an action state

        this.thoughtBubble = this.scene.add.image(game.CENTER_X + 60, game.CENTER_Y - 70, 'thoughtBubble')
        this.thoughtBubble.scale = 2
        //this.thoughtBubble.visible = false

        //add icons that display when need state is entered
        this.hungryIcon = this.scene.add.image(game.CENTER_X + 58, game.CENTER_Y - 83, 'hungryThought')
        this.hungryIcon.visible = false

        this.sleepyIcon = this.scene.add.image(game.CENTER_X + 60, game.CENTER_Y - 83, 'sleepyThought')
        this.sleepyIcon.visible = false

        this.playIcon = this.scene.add.image(game.CENTER_X + 60, game.CENTER_Y - 83, 'playThought')
        this.playIcon.visible = false


        
        this.parentScene.creatureFSM = new StateMachine('idle', {
            idle: new IdleState(),
            need: new NeedState(),
            sleeping: new SleepingState(),
            eating: new EatingState(),
            playing: new PlayingState(),
            gameOver: new GameOverState(),
            win: new WinState()
        }, [scene, this])
        //FSM for determining what state the creature is in.

        this.parentScene.rpsFSM = new StateMachine('disabled', {
            disabled: new DisabledState(),
            decision: new DecisionState(),
            reveal: new RevealState()
        }, [scene, this])
    }

    init() {
        this.incrementInterval = setInterval(() => { this.incrementStat() }, 5000)
    }

    incrementStat() {
        this.addToStat('hunger', -1)
        this.addToStat('sleep', -1)
        this.addToStat('happiness', -1)

        this.resetHealth()
        if (this.health <= 0) {
            console.log('game over!')
        }
    }

    resetHealth() {
        this.health = Math.ceil((this.happiness + this.sleep + this.hunger) / 3)
    }

    incrementTime() {
        happiness -= 1
        sleep -= 1
        hunger -= 1

        this.health = (this.happiness + this.sleep + this.hunger) / 3
        if (this.health <= 0) {
            console.log('game over!')
        }
    }

    actionState(stat) {
        if (rpsFSM.state != 'decision'){
            //If the FSM is in idle or need state, move to eating state.
            if (this.parentScene.creatureFSM.state == 'idle' || this.parentScene.creatureFSM.state == 'need') {
                if (stat == 'hunger') {
                    this.parentScene.creatureFSM.transition('eating')
                }
                else if (stat == 'sleep') {
                    this.parentScene.creatureFSM.transition('sleeping')
                }
                else {
                    this.parentScene.creatureFSM.transition('playing')
                }
            }
        }
        //if the rock paper scissors game is being played, transition to the reveal with a given answer.
        else {
            this.parentScene.rpsFSM.transition('reveal', stat)
        }
    }

    addToStat(stat, amnt) {
        if (!this.busy) {
            console.log('adding ' + amnt + ' to ' + stat)
            //console.log('FSM state: ', this.parentScene.creatureFSM.state)
            if ((stat == 'hunger') && ( (this.hunger + amnt) < 100) && !(this.health <= 0)) {
                if (amnt < 0 && this.hunger <=0) {
                    return
                }
                this.hunger += amnt

            }
            else if ((stat == 'sleep') && ( (this.sleep + amnt) < 100) && !(this.health <= 0)) {
                if (amnt < 0 && this.sleep <=0) {
                    return
                }
                this.sleep += amnt
            }
            else if ((stat == 'happiness') && ( (this.happiness + amnt) < 100) && !(this.health <= 0)) {
                if (amnt < 0 && this.happiness <=0) {
                    return
                }
                this.happiness += amnt
            }

            this.resetHealth()
        }
    }
    getStats() {
        return {
            health: this.health,
            hunger: this.hunger,
            happiness: this.happiness,
            sleep: this.sleep
        }
    }
    getLowestStat() {
        let min = Math.min(this.hunger, this.sleep, this.happiness)

        if (this.hunger == min) {
            this.parentScene.sound.play('hungry', { volume: 0.1 })
            return 'hunger'
        }
        else if (this.sleep == min) {
            this.parentScene.sound.play('sleepy', {volume: 0.4})
            return 'sleep'
        }
        else if (this.happiness == min) {
            this.parentScene.sound.play('playful', {volume: 0.2})
            return 'happiness'
        }
    }

    thoughtsVisible(bool) {
        this.thoughtBubble.visible = bool

        this.hungryIcon.visible = bool
        this.playIcon.visible = bool
        this.sleepyIcon.visible = bool
    }

    thoughtVisible(bool, type) {
        this.thoughtBubble.visible = bool
        if (type == 'hunger') {
            this.hungryIcon.visible = bool
        }
        else if (type == 'happiness') {
            this.playIcon.visible = bool
        }
        else {
            this.sleepyIcon.visible = bool
        }
    }
}

class IdleState extends State {
    enter(scene, creature) {
        creature.play('idle', true)
        creature.busy = false
        creature.thoughtsVisible(false)

        scene.hKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);

    }
    execute(scene, creature) {
        //if health reaches 0, move to gameOverState
        if (creature.health == 0) {
            scene.creatureFSM.transition('gameOver')
        }


        if (Phaser.Input.Keyboard.JustDown(scene.hKey) || (creature.happiness > 80)) { 
            scene.creatureFSM.transition('win')
        }

        //monitor all stats, if any stat dips below a given threshhold, alert the player using the need state
        if (((creature.hunger <= 40) || (creature.sleep < 30) || (creature.happiness < 30)) && creature.health != 0){
            scene.creatureFSM.transition('need', creature.getLowestStat())
        }
    }
}
class NeedState extends State {
    enter(scene, creature, needType) {
        creature.play('needing', true)
        creature.thoughtVisible(true, needType)

        if (needType == 'hunger') {
            creature.hungryIcon.visible = true
        }
        else if (needType == 'happiness') {
            creature.playIcon.visible = true
        }
        else {
            creature.sleepyIcon.visible = true
        }

        creature.on('animationcomplete', () => {
            scene.creatureFSM.transition('idle')
        })
    }
}
class SleepingState extends State {
    enter(scene, creature) {
        creature.thoughtsVisible(false)

        console.log('sleeping')
        creature.busy = true

        creature.addToStat('sleep', 25)
        scene.creatureFSM.transition('idle')

    }
    execute(scene, creature) {
        
    }
}
class EatingState extends State {
    enter(scene, creature) {
        if ((creature.hunger + 60) < 100){
            creature.addToStat('hunger', 60)
            creature.busy = true
            creature.play('eating')
            console.log('eat')
        
            creature.on('animationcomplete', () => {
                creature.thoughtsVisible('hunger', false)
                scene.creatureFSM.transition('idle')
            })
        }
        else {
            scene.creatureFSM.transition('idle')
        }
    }
    execute(scene, creature) {
        
    }
}
class PlayingState extends State {
    enter(scene, creature) {
        creature.thoughtBubble.visible = false

        creature.busy = true
        scene.rpsFSM.transition('decision')
    }
}
class GameOverState extends State {
    enter(scene, creature) {
        creature.anims.stop()
        creature.play('dead', true)

        scene.add.image(game.CENTER_X, game.CENTER_Y - 55, 'gameOverText')
        scene.sound.play('gameOver')
    }
}
class WinState extends State {
    enter(scene, creature) {
        creature.busy = true
        scene.winText = scene.add.image(game.CENTER_X - 90, game.CENTER_Y - 110, 'youWin')
        scene.winText.scale = 0.25
        creature.play('winDance')

        scene.finalMessage = new InfoDump(scene, game.CENTER_X, game.CENTER_Y, 'message')
        scene.finalMessage.visible = false

        scene.letter = new MenuButton(scene, game.CENTER_X, game.CENTER_Y - 100, 'letter')
        scene.letter.scale = 2

        scene.sound.play('winGame')
    }
}

//need new fsm for playing rock paper scissors

//not playing, default state

class DisabledState extends State {
    enter(scene, creature) {
        
    }
}

//Deciding - prompting the player to pick an option
class DecisionState extends State {
    enter(scene, creature) {
        console.log('huh')
        //make icons for choices visible
        creature.play('rockpaper')
    }
}

//Reveal - reveal who won, and add points, reveal prompt to return to disabledState
class RevealState extends State {
    enter(scene, creature, choice) {
        let choices = ['rock', 'paper', 'scissors']
        let index = Math.floor(Math.random * 3)

        let ashChoice = choices[index]

        if (choice == 'hunger') {
            choice= 'rock'
        }
        else if (choice== 'happiness') {
            choice= 'paper'
        }
        else {
            choice = 'scissors'
        }

        //compare player's choice with random choice

        let result = compareChoices(choice)

        creature.addToStat('happiness', result)

    }
    compareChoices(choice){
        if (choice == ashChoice) {
            return 5
        }
        else if (choice == 'rock') {
            if (ashChoice == 'paper') {
                return 0
            }
            else {
                return 25
            }
        }
        else if (choice == 'paper') {
            if (ashChoice == 'scissors') {
                return 0
            }
            else {
                return 25
            }
        }
        else {
            if (ashChoice == 'rock') {
                return 0
            }
            else {
                return 25
            }
        }
    }
}

//need fsm for sleep mode