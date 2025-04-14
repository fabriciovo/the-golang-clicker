export interface IPlayer {
    id: string;
    clickForce: number;
    coins: number;
    cps: number;
    level: number;
    upgrades: Record<string, number>;
  }
  