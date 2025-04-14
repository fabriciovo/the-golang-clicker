import GOLang from '@classes/GOLang';
import { Scene, GameObjects } from 'phaser';

export class Game extends Scene {
    private _golang: GOLang;
    constructor() {
        super('Game');
    }

    preload(): void {
        this.load.setPath('assets');
        this.load.image('golang', 'golang.png');


    }

    create(): void {
        this._golang = new GOLang(this, 0, 0, 'golang');
        this._golang.create()

        this.add.existing(this._golang);
    }


}
