import { PLAYERS_A } from "./players-a";
import { PLAYERS_B } from "./players-b";
import type { Player } from "./types";

export * from "./types";
export { PHOTOS, photoOf } from "./photos";

export const PLAYERS: Player[] = [...PLAYERS_A, ...PLAYERS_B];

export const DATA_AS_OF = "2026 年 8 月編輯快照（部分更正於 2026-10-04）";

export function getPlayer(id: string): Player | undefined {
  return PLAYERS.find((p) => p.id === id);
}
