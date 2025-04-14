import { Game as MainGame } from './scenes/Game';
import { AUTO, Game, Types } from 'phaser';

const config: Types.Core.GameConfig = {
    type: AUTO,
    width: 1024, 
    height: 768,
    parent: 'app',
    backgroundColor:"#ffff",
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        MainGame
    ]
};

export default new Game(config);
