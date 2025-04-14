import GameManager from '@classes/GameManager';
import GOLang from '@classes/GOLang';
import { Scene, GameObjects } from 'phaser';

export class Game extends Scene {
    private _golang: GOLang;
    private _gameManager: GameManager;

    constructor() {
        super('Game');

        this._gameManager = new GameManager(this);
    }

    preload(): void {
        this.load.setPath('assets');
        this.load.image('golang', 'golang.png');


    }

    create(): void {
        this._gameManager.create();
        
        this._golang = new GOLang(this, 0, 0, 'golang');
        this._golang.create()

        this.add.existing(this._golang);
    }


}
