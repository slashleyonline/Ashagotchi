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


        this.busy = false
        //pauses stat decremation if FSM enters an action state

        this.thoughtBubble = this.scene.add.image(game.CENTER_X + 60, game.CENTER_Y - 70, 'thoughtBubble')
        this.thoughtBubble.scale = 2
        this.thoughtBubble.visible = false

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

    addToStat(stat, amnt) {
        if (!this.busy) {
            //console.log('adding ' + amnt + ' to ' + stat)
            //console.log('FSM state: ', this.parentScene.creatureFSM.state)
            if ((stat == 'hunger') && ( (this.hunger + amnt) < 100) && !(this.health <= 0)) {
                if (amnt < 0 && this.hunger <=0) {
                    return
                }
                this.hunger += amnt

                //If the FSM is in idle or need state, move to eating state.
                if (this.parentScene.creatureFSM.state == 'idle' || this.parentScene.creatureFSM.state == 'need') {
                    this.parentScene.creatureFSM.transition('eating')
                }

            }
            else if ((stat == 'sleep') && ( (this.sleep + amnt) < 100) && !(this.health <= 0)) {
                if (amnt < 0 && this.sleep <=0) {
                    return
                }
                this.sleep += amnt

                //If the FSM is in idle or need state, move to sleeping state.
                if (this.parentScene.creatureFSM.state == 'idle' || this.parentScene.creatureFSM.state == 'need') {
                    this.parentScene.creatureFSM.transition('sleeping')
                }
            }
            else if ((stat == 'happiness') && ( (this.happiness + amnt) < 100) && !(this.health <= 0)) {
                if (amnt < 0 && this.happiness <=0) {
                    return
                }
                this.happiness += amnt

                //If the FSM is in idle or need state, move to playing state.
                if (this.parentScene.creatureFSM.state == 'idle' || this.parentScene.creatureFSM.state == 'need') {
                    this.parentScene.creatureFSM.transition('playing')
                }
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
            return 'hunger'
        }
        else if (this.sleep == min) {
            return 'sleep'
        }
        else if (this.happiness == min) {
            return 'happiness'
        }
    }
}

class IdleState extends State {
    enter(scene, creature) {
        creature.play('idle', true)
        creature.busy = false
        creature.thoughtBubble.visible = false
    }
    execute(scene, creature) {
        //monitor all stats, if any stat dips below a given threshhold, alert the player using the need state
        if ((creature.hunger < 30) || (creature.sleep < 30) || (creature.happiness < 30)) {
            scene.creatureFSM.transition('need', creature.getLowestStat())
        }
        //if health reaches 0, move to gameOverState
        if (this.health == 0) {
            scene.creatureFSM.transition('gameOver')
        }
    }
}
class NeedState extends State {
    enter(scene, creature, needType) {
        creature.play('needing', true)
        creature.thoughtBubble.visible = true

        creature.on('animationcomplete', () => {
            scene.creatureFSM.transition('idle', creature.getLowestStat())
        })

    }
    execute(scene, creature) {
        
    }
}
class SleepingState extends State {
    enter(scene, creature) {
        console.log('sleeping')
        creature.busy = true
        scene.creatureFSM.transition('idle', creature.getLowestStat())

    }
    execute(scene, creature) {
        
    }
}
class EatingState extends State {
    enter(scene, creature) {
        creature.busy = true
        scene.creatureFSM.transition('idle', creature.getLowestStat())
    }
    execute(scene, creature) {
        
    }
}
class PlayingState extends State {
    enter(scene, creature) {
        creature.busy = true
        scene.creatureFSM.transition('idle', creature.getLowestStat())
    }
    execute(scene, creature) {
        
    }
}
class GameOverState extends State {
    enter(scene, creature) {
        creature.busy = true
    }
}