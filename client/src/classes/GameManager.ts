import { IPlayer } from "@intefaces/IPlayer";
import { GameObjects, Scene } from "phaser";

class GameManager {
  private _player: IPlayer;
  private _scene: Scene;
  private _isLoadingPlayerData: boolean = true;
  private _loadingText: GameObjects.Text;
  constructor(scene: Scene) {
    this._scene = scene;
   
    this._init();
  }

  private async _init(){
    await this._loadPlayer();
    this.SetLoading(false);
  }

  public create(): void {
    this._loadingText = new GameObjects.Text(this._scene, 0,0, "dasdsa", {fontFamily: "Go Mono, monospace"});
    this._scene.add.existing(this._loadingText);
  }

  public update(): void {
    this._loadingText.text =!this._isLoadingPlayerData ? "Loading..." : "aaaaaa" ;
  }

  private async _loadPlayer(): Promise<void> {
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
  }

  private async _createNewPlayer(): Promise<IPlayer> {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/player/init`, { method: 'POST' });
    const newPlayer = await response.json();
    return newPlayer as IPlayer;
  }

  private async _fetchPlayer(id: string): Promise<IPlayer | null> {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/player/${id}`, { method: 'GET' });
    if (response.ok) {
      const player = await response.json();
      return player as IPlayer;
    }
    return null;
  }



  public SetLoading(isLoading: boolean): void {
    this._isLoadingPlayerData = isLoading;
    this._dispatchLoadingEvent(isLoading);
  }

  private _dispatchLoadingEvent(isLoading: boolean): void {
    this._scene.events.emit('player-loading-changed', isLoading);
  }



}

export default GameManager;