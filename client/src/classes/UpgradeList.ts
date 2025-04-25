import Phaser, { GameObjects, Geom, Input, Math as PMath } from "phaser";
import { IUpgrade } from "@intefaces/IUpgrade";
import Upgrade from "./Upgrade";

const VIEW_WIDTH   = 380;
const VIEW_HEIGHT  = 128;
const ITEM_SPACING = 60;     
const ITEM_OFFSET_X = 32;    
const ITEM_OFFSET_Y = 16;

export default class UpgradeList extends GameObjects.Container {
  private _maskShape: GameObjects.Graphics;
  private _upgradeList: Upgrade[] = [];
  private _dragging = false;
  private _startPointerX = 0;
  private _startX = 0;
  private _minX!: number;
  private _maxX!: number;
  private _viewX: number;
  private _viewY: number;

  constructor(
    scene: Phaser.Scene,
    viewX: number,
    viewY: number,
    upgrades: IUpgrade[]
  ) {
    super(scene, viewX, viewY);
    scene.add.existing(this);

    this._viewX = viewX;
    this._viewY = viewY;

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
    this._upgradeList = upgrades.map((u, i) => {
      const item = new Upgrade(
        u.name,
        u.cost,
        u.cps,
        scene,
        i * ITEM_SPACING + ITEM_OFFSET_X,
        ITEM_OFFSET_Y,
        u.textureName
      );
      this.add(item);
      return item;
    });

    this._maxX = viewX;
    this.updateScrollBounds();

    this.setupScrolling();
  }

  private updateScrollBounds() {
    this._upgradeList.forEach((item, i) => {
      item.x = i * ITEM_SPACING;
    });

    const contentWidth = this._upgradeList.length * ITEM_SPACING;

    this._minX = this._viewX + Math.min(0, VIEW_WIDTH - contentWidth);

    this.x = PMath.Clamp(this.x, this._minX, this._maxX);
  }

  public removeUpgrade(_name: string) {
    this._upgradeList = this._upgradeList.filter(el => el.name !== _name);
    console.log(this._upgradeList)
    this.updateScrollBounds();
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
