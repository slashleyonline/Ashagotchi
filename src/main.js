// Name: Ashley Seward
// Title: Ashagotchi

// CITATIONS:
// StateMachine.js from mkelly.me/blog/phaser-finite-state-machine, Thanks Nathan Altice
// AUDIONUGGET FONT BY JapanYoshi https://fontesk.com/audio-nugget-font/

//NOTE: TO SKIP TO END PORTION, PRESS H WHEN ASH HAS NO THOUGHT BUBBLE.

// COMPONENTS LIST:

// Liberal use of spritesheets and animations.
// Timers and intervals playing a key role in gameplay
// Use of Physics systems for user input
// Use of Sound
// Layer Manipulation

// CREATIVE TILT:
//      I decided that I didn't want to make a "game", and focused more on making something akin to a desktop pet. I enjoyed learning how to make a 
// game that was dependent on real-world time, and I had fun doing research on Tamagotchi, doing my best to recreate their style. I also spent 
// an extensive amount of time learning how to take 3D models, and turn them into spritesheets. Once I learned the workflow it actually saved me 
// a decent amount of time in the long run. 

// I'm really proud of the animation I did at the beginning, with the tamagotchi flying out of the box. It took some clever layer manipulation 
// and use of the timers to accomplish.

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
    zoom: 1.5,

    scene: [Menu, Play],
}

let game = new Phaser.Game(config)
game.CENTER_X = (game.config.width / 2)
game.CENTER_Y = (game.config.height / 2)
