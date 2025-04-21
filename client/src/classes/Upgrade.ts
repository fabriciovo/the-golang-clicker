import { GameObjects, Scene, Textures } from "phaser";



class Upgrade  extends GameObjects.Image {
    private _name:string;
    private _cost: number;
    constructor(name:string, cost: number, scene: Scene, x: number, y: number, texture: string | Textures.Texture, frame?: string | number){
        super(scene, x,y,texture, frame)
    }


    public create():void{
        this.setInteractive({ useHandCursor: true });
        
        this.on('pointerdown', this._dispatchBuyEvent);
    }

    public update(): void {
        
    }

    private _dispatchBuyEvent():void{
        this.scene.events.emit('buy-upgrade', this);
    }

    
}


export default Upgrade;