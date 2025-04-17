import { GameObjects, Scene, Textures } from "phaser";



class Upgrade  extends GameObjects.Image {
    private _name:string;
    private _cost: number;
    constructor(name:string, cost: number, scene: Scene, x: number, y: number, texture: string | Textures.Texture, frame?: string | number){
        super(scene, x,y,texture, frame)
    }


    public create():void{

    }

    public update(): void {
        
    }

    public buy():void{

    }

    
}


export default Upgrade;