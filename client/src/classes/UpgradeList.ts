import Phaser, { GameObjects, Geom, Input, Math as PMath } from "phaser";
import { IUpgrade } from "@intefaces/IUpgrade";
import Upgrade from "./Upgrade";

const VIEW_WIDTH = 380;
const VIEW_HEIGHT = 64;
const ITEM_SPACING = 80;

export default class UpgradeList extends GameObjects.Container {
    private _maskShape: GameObjects.Graphics;
    private _dragging = false;
    private _startPointerX = 0;
    private _startX = 0;
    private _minX!: number;
    private _maxX!: number;

    constructor(
        scene: Phaser.Scene,
        viewX: number,
        viewY: number,
        upgrades: IUpgrade[]
    ) {
        super(scene, viewX, viewY);
        scene.add.existing(this);

        const contentWidth = upgrades.length * ITEM_SPACING;
        this.setSize(contentWidth, VIEW_HEIGHT);


        this._maskShape = scene.add.graphics()
            .fillStyle(0xffffff)
            .fillRect(0, 0, VIEW_WIDTH, VIEW_HEIGHT)
            .setPosition(viewX, viewY)
            .setInteractive(
                new Geom.Rectangle(0, 0, VIEW_WIDTH, VIEW_HEIGHT),
                Geom.Rectangle.Contains
            );

        this.setMask(this._maskShape.createGeometryMask());
        this._maskShape.setVisible(true);
        this._maskShape.alpha = 0.1;

        upgrades.forEach((u, i) => {
            const x = i * ITEM_SPACING;
            const item = new Upgrade(u.name, u.cost, scene, x+32, 32, u.textureName);
            item.create();
            this.add(item);
        });


        this._minX = viewX + Math.min(0, VIEW_WIDTH - contentWidth);
        this._maxX = viewX;

        this.setupScrolling();
    }

    private setupScrolling() {
        this._maskShape.on("pointerdown", (ptr: Input.Pointer) => {
            this._dragging = true;
            this._startPointerX = ptr.x;
            this._startX = this.x;
        });

        this.scene.input.on("pointerup", () => {
            this._dragging = false;
        });

        this.scene.input.on("pointermove", (ptr: Input.Pointer) => {
            if (!this._dragging) return;
            const delta = ptr.x - this._startPointerX;
            this.x = PMath.Clamp(this._startX + delta, this._minX, this._maxX);
        });

        this.scene.input.on(
            "wheel",
            (_: any, __: any, ___: number, deltaY: number) => {
                this.x = PMath.Clamp(this.x - deltaY, this._minX, this._maxX);
            }
        );
    }
}
