// Name: Ashley Seward
// Title: Ashagotchi

//CITATIONS:
// StateMachine.js from mkelly.me/blog/phaser-finite-state-machine, Thanks Nathan Altice

let config = {
    type: Phaser.AUTO,

    width: 640,
    height: 480,

    render: {
        pixelArt: true
    },

    physics: {
        default: "arcade",
        arcade: {
            //debug: true
        }
    },

    autoCenter: Phaser.Scale.CENTER_BOTH,
    zoom: 1,

    scene: [Menu, Play],
}

let game = new Phaser.Game(config)
