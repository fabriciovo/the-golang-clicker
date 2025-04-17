import { IPlayer } from "@intefaces/IPlayer";
import { IUpgrade } from "@intefaces/IUpgrade";
import { GameObjects, Scene } from "phaser";
import Upgrade from "./Upgrade";

class GameManager {
  private _player: IPlayer;
  private _scene: Scene;
  private _isLoadingPlayerData: boolean = true;
  private _loadingText: GameObjects.Text;
  private _apiErrorText: GameObjects.Text;
  private _coinsText: GameObjects.Text;
  private _upgradeList: IUpgrade[] | undefined = [];
  private _refreshInterval: number = 5000;
  private _updatePlayerTimer: Phaser.Time.TimerEvent;

  constructor(scene: Scene) {
    this._scene = scene;
   
    
    
  }

  private async _init(): Promise<void> {
    await this._loadPlayer();
    await this._loadUpgrades();
    this._startPlayerUpdateLoop()
    this.SetLoading(false);
  }

  public create(): void {
    const centerX = this._scene.cameras.main.width / 2;
    const centerY = this._scene.cameras.main.height / 2;

    this._loadingText = new GameObjects.Text(this._scene, 0,0, "Loading...", {fontFamily: "Go Mono, monospace"});
    this._apiErrorText = new GameObjects.Text(this._scene, 0,10, "", {fontFamily: "Go Mono, monospace"});
    this._coinsText = new GameObjects.Text(this._scene, centerX,centerY + 80, "0",{fontFamily: "Go Mono, monospace", fontSize: 46})
    this._scene.add.existing(this._loadingText);
    this._scene.add.existing(this._apiErrorText);
    this._scene.add.existing(this._coinsText);
    this._scene.events.on('player-click', this._playerClick, this);


    this._init();

  }

  public update(): void {
    if(this._player){
      this._coinsText.text = this._player.coins.toString();
    }

  }

  private async _loadPlayer(): Promise<void> {
    try{
      const playerId = localStorage.getItem('playerId');
      if (!playerId) {
        const newPlayer = await this._createNewPlayer();
        localStorage.setItem('playerId', newPlayer.id);
        this._player = newPlayer;
      } else {
        const player = await this._fetchPlayer(playerId);
        if (player) {
          this._player = player;
        } else {
          const newPlayer = await this._createNewPlayer();
          localStorage.setItem('playerId', newPlayer.id);
          this._player = newPlayer;
        }
      }
    }catch(err: any){
      this._apiErrorText.text = "API ERROR";
      this.SetLoading(false)
      throw new Error(err.message);
    }

    
  }

  private async _createNewPlayer(): Promise<IPlayer> {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/player/init`, { method: 'POST' });
      const newPlayer = await response.json();
      return newPlayer as IPlayer;
    }catch(err:any) {
      this._apiErrorText.text = "API ERROR";
      this.SetLoading(false)
      throw new Error(err.message);
    }

  }

  private async _fetchPlayer(id: string): Promise<IPlayer | null> {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/player/${id}`, { method: 'GET' });
      if (response.ok) {
        const player = await response.json();
        return player as IPlayer;
      }
      return null;
    }catch(err:any){
      this._apiErrorText.text = "API ERROR";
      this.SetLoading(false)
      throw new Error(err.message);
    }
  }

  private _startPlayerUpdateLoop(): void {
    this._updatePlayerTimer = this._scene.time.addEvent({
      delay: this._refreshInterval,
      loop: true,
      callback: async () => {
        await this._savePlayerData();
      }
    });
  }
  
  private async _savePlayerData(): Promise<void> {
    const playerId = localStorage.getItem('playerId');
    if (!playerId) return;
  
    try {
      await fetch(`${import.meta.env.VITE_BASE_URL}/player/save`, {
        method: 'PUT',
        body: JSON.stringify(this._player),
      });
    } catch (err: any) {
      this._apiErrorText.text = "API ERROR";
    }
  }

  private _dispatchLoadingEvent(isLoading: boolean): void {
    this._scene.events.emit('player-loading-changed', isLoading);
  }

  private _playerClick():void{
    this._player.coins += this._player.clickForce;
  }

  private async _loadUpgrades(): Promise<void> {
    try{
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/upgradeList`, { method: 'GET' });
      if (response.ok){
        const upgrades = await response.json() as IUpgrade[];
        upgrades.forEach((upgrade:IUpgrade, index:number) => {
          const _upgrade = new Upgrade(upgrade.name, upgrade.cost, this._scene,0*index,0, upgrade.textureName);
          this._scene.add.existing(_upgrade);
        })
      }
    }catch(err: any){
      this._apiErrorText.text = "API ERROR";
      throw Error(err.message);
    }
  }
  
  public SetLoading(isLoading: boolean): void {
    this._isLoadingPlayerData = isLoading;
    this._loadingText.text = isLoading ? "Loading..." : "" ;
    this._dispatchLoadingEvent(isLoading);
  }



}

export default GameManager;