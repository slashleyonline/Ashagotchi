class Creature extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key)

        //instantiate to scene
        this.parentScene = scene
        this.parentScene.add.existing(this)
        this.scale = 0.4

        this.health = 100
        //overall health of the creature
        //the average of all stats
        //if it reaches 0, game over

        this.happiness = 10
        //increases gradually but the rate of increasing is maintained by playing with creature

        this.sleep = 100
        //refilled by sleeping
        
        this.hunger = 20
        //refilled by eating

        this.parentScene.creatureFSM = new StateMachine('idle', {
            idle: new IdleState(),
            need: new NeedState(),
            sleeping: new SleepingState(),
            eating: new EatingState(),
            playing: new PlayingState(),
            gameOver: new GameOverState(),
        }, [scene, this])
        //FSM for determining what state the creature is in.
    }

    init() {
        this.incrementInterval = setInterval(() => { this.incrementStat() }, 1000)

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

    addToStat(stat, amnt) {
        //console.log('adding ' + amnt + ' to ' + stat)
        if ((stat == 'hunger') && ( (this.hunger + amnt) < 100) && !(this.health <= 0)) {
            this.hunger += amnt
        }
        else if ((stat == 'sleep') && ( (this.sleep + amnt) < 100) && !(this.health <= 0)) {
            this.sleep += amnt
        }
        else if ((stat == 'happiness') && ( (this.happiness + amnt) < 100) && !(this.health <= 0)) {
            this.happiness += amnt
        }

        this.resetHealth()
    }
    getStats() {
        return {
            health: this.health,
            hunger: this.hunger,
            happiness: this.happiness,
            sleep: this.sleep
        }
    }
    
}

class IdleState extends State {
    enter(scene, creature) {
        console.log('in idle!')
        creature.play('idle', true)
    }
    execute(scene, creature) {
        //monitor all stats, if any stat dips below a given threshhold, alert the player using the need state
        //if eat, sleep, play buttons are pressed, pause stat decremation and move to the corresponding action state.
        //if health reaches 0, move to gameOverState
    }
}
class NeedState extends State {
    enter(scene, creature) {

    }
    execute(scene, creature) {
        
    }
}
class SleepingState extends State {
    enter(scene, creature) {

    }
    execute(scene, creature) {
        
    }
}
class EatingState extends State {
    enter(scene, creature) {

    }
    execute(scene, creature) {
        
    }
}
class PlayingState extends State {
    enter(scene, creature) {

    }
    execute(scene, creature) {
        
    }
}
class GameOverState extends State {
    enter(scene, creature) {

    }
    execute(scene, creature) {
        
    }
}