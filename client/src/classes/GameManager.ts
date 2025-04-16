import { IPlayer } from "@intefaces/IPlayer";
import { GameObjects, Scene } from "phaser";

class GameManager {
  private _player: IPlayer;
  private _scene: Scene;
  private _isLoadingPlayerData: boolean = true;
  private _loadingText: GameObjects.Text;
  private _apiErrorText: GameObjects.Text;
  constructor(scene: Scene) {
    this._scene = scene;
   
  }

  private async _init(): Promise<void> {
    await this._loadPlayer();
    this.SetLoading(false);
  }

  public create(): void {
    this._loadingText = new GameObjects.Text(this._scene, 0,0, "Loading...", {fontFamily: "Go Mono, monospace"});
    this._apiErrorText = new GameObjects.Text(this._scene, 0,10, "", {fontFamily: "Go Mono, monospace"});

    this._scene.add.existing(this._loadingText);
    this._scene.add.existing(this._apiErrorText);


    this._init();

  }

  public update(): void {
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
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/player/init`, { method: 'POST' });
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
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/player/${id}`, { method: 'GET' });
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

  private _dispatchLoadingEvent(isLoading: boolean): void {
    this._scene.events.emit('player-loading-changed', isLoading);
  }

  public SetLoading(isLoading: boolean): void {
    this._isLoadingPlayerData = isLoading;
    this._loadingText.text = isLoading ? "Loading..." : "" ;
    this._dispatchLoadingEvent(isLoading);
  }

}

export default GameManager;