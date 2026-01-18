class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load imgs/tile sprites
        this.load.image('puppycat', './assets/puppycat.png');
        this.load.image('fish', './assets/fish.png');
        this.load.image('sky', './assets/sky.png');
        // load spritesheet
        this.load.spritesheet('om', './assets/puppycat_om_spritesheet.png', {
            frameWidth: 48,
            frameHeight: 72,
            startFrame: 0,
            endFrame: 11
        });
        // load audio sfx
        this.load.audio('om_sfx', './assets/sfx/om2_sfx.wav');
        this.load.audio('tap_sfx', './assets/sfx/tap_sfx.wav');
        this.load.audio('fsh_sfx', './assets/sfx/fsh_sfx.wav');
    }

    create() {
        // animation config
        this.anims.create({
            key: 'om',
            frames: this.anims.generateFrameNumbers('om', {start: 0, end: 11, first: 0}),
            frameRate: 15
        });

        // menu config
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FFFFFF',
            color: '#bc3c54',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        };
        // display menu text
        this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize - borderPadding, 'PUPPYCAT PATROL', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '24px';
        this.add.text(game.config.width / 2, game.config.height / 2, 'use (<-, ->) arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#ffdfdf';
        menuConfig.color = '#cf4f67';
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding, 'press (<-) for easy or (->) for hard', menuConfig).setOrigin(0.5);
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 2,
                gameTimer: 60000
            };
            this.sound.play('tap_sfx');
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            };
            this.sound.play('tap_sfx');
            this.scene.start('playScene');
        }
    }
}