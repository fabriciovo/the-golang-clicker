import { GameObjects, Scene } from "phaser";

class GOLang extends GameObjects.Image {

    constructor(scene: Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number) {
        super(scene, x, y, texture, frame)

    }

    public create(): void {
        this.setDepth(100)
        this.setScale(0.5);
        this.setInteractive({ useHandCursor: true });

        this.on('pointerdown', this._onClick);

        this._centerGolang();

        this.scene.scale.on('resize', this._centerGolang, this);
    }

    public update(): void {

    }

    private _onClick(): void {

    }

    private _centerGolang(): void {
        const centerX = this.scene.cameras.main.width / 2;
        const centerY = this.scene.cameras.main.height / 2;
        this.setPosition(centerX, centerY);
    }
}

export default GOLang;