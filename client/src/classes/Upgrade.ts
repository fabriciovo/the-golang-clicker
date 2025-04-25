import { IPlayer } from "@intefaces/IPlayer";
import { GameObjects, Scene, Textures } from "phaser";
import UpgradeList from "./UpgradeList";



class Upgrade extends GameObjects.Container {
    private _name: string;
    private _cost: number;
    private _cps: number;
    private _costText: GameObjects.Text;
    private _image: GameObjects.Image;

    constructor(name: string, cost: number, cps: number, scene: Scene, x: number, y: number, texture: string | Textures.Texture, frame?: string | number) {
        super(scene, x, y)
        this._name = name;
        this._cost = cost;
        this._cps = cps;
        console.log(name);
        this._image = new GameObjects.Image(scene, x, y, texture, frame);
        this._costText = new GameObjects.Text(scene, x - 16, y + 30, cps.toString(), { fontFamily: "Go Mono, monospace", fontSize: 24 });


        this.add(this._costText)
        this.add(this._image);

        this._image.setInteractive({ useHandCursor: true });
        this._image.on('pointerdown', this._dispatchBuyEvent.bind(this));
    }


    private _dispatchBuyEvent(): void {
        this.scene.events.emit('buy-upgrade', this);
    }

    public UnlockUpgrade(_player: IPlayer, _upgradeContainer: UpgradeList): void {
        if (_player.coins >= this._cost) {
            _player.cps += this._cps;
            _player.upgrades[this._name] = true;
            _player.coins -= this._cost;
            _upgradeContainer.removeUpgrade(this._name);
            this.destroy();
        }   
    }

    public GetCps(): number {
        return this._cps;
    }

}


export default Upgrade;