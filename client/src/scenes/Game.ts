import GameManager from '@classes/GameManager';
import GOLang from '@classes/GOLang';
import { Scene, GameObjects } from 'phaser';

export class Game extends Scene {
    private _golang: GOLang;
    private _gameManager: GameManager;
    private _startGame: boolean;

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
        this.events.on('player-loading-changed', this._onPlayerLoadingChanged, this);
        
    }

    update(): void {
    }

    private _onPlayerLoadingChanged(isLoading: boolean): void {
        if (!isLoading) {
            console.log('Player finished loading!');
            this.add.existing(this._golang);
    }
}


}
