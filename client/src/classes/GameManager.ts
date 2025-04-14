import { IPlayer } from "@intefaces/IPlayer";
import { Scene } from "phaser";

class GameManager {
  private _player: IPlayer;
  private _scene: Scene;
  private _isLoadingPlayerData: boolean = true;
  constructor(scene: Scene) {
    this._scene = scene;
   
    this._init();
  }

  private async _init(){
    await this._loadPlayer();
    this._isLoadingPlayerData = false;
  }

  public create(): void {

  }

  public update(): void {

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



}

export default GameManager;