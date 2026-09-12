import type { Era, Player, Position, TeamStint } from "@/data/types";
import { ERA_LABEL, POS_LABEL } from "@/data/types";

export { ERA_LABEL, POS_LABEL };

export const ERAS: Era[] = [
  "pioneers",
  "seventies",
  "eighties",
  "nineties",
  "aughts",
  "modern",
];

export const POSITIONS: Position[] = ["PG", "SG", "SF", "PF", "C"];

export function hallStats(players: Player[]) {
  return {
    count: players.length,
    rings: players.reduce((n, p) => n + p.nba.championships.length, 0),
    mvps: players.reduce((n, p) => n + p.nba.mvp.length, 0),
    fmvps: players.reduce((n, p) => n + p.nba.finalsMvp.length, 0),
    hof: players.filter((p) => p.nba.hof != null).length,
  };
}

export function playerQuery(p: Player) {
  return [
    p.name,
    p.nameZh,
    p.aka.join(" "),
    p.peakTeam,
    p.pos,
    p.from,
    p.path.map((s) => `${s.team} ${s.teamZh}`).join(" "),
  ]
    .join(" ")
    .toLowerCase();
}

export function filterPlayers(
  players: Player[],
  opts: { q: string; era: string; pos: string },
) {
  const q = opts.q.trim().toLowerCase();
  return players.filter((p) => {
    if (opts.era !== "all" && p.era !== opts.era) return false;
    if (opts.pos !== "all" && p.pos !== opts.pos) return false;
    if (q && !playerQuery(p).includes(q)) return false;
    return true;
  });
}

export function groupedByEra(players: Player[]) {
  return ERAS.map((era) => ({
    era,
    label: ERA_LABEL[era],
    players: players.filter((p) => p.era === era),
  })).filter((g) => g.players.length > 0);
}

export function neighborIds(players: Player[], id: string) {
  const i = players.findIndex((p) => p.id === id);
  if (i < 0) return { prev: null as string | null, next: null as string | null };
  return {
    prev: i > 0 ? players[i - 1]!.id : players[players.length - 1]!.id,
    next: i < players.length - 1 ? players[i + 1]!.id : players[0]!.id,
  };
}

export function ageLine(born: string) {
  const y = Number(born.slice(0, 4));
  if (!Number.isFinite(y)) return born;
  return `${y}`;
}

export function lastStint(player: Player): TeamStint {
  return player.path[player.path.length - 1]!;
}

/** True when the last club still matches the signature / peak franchise. */
export function peakIsCurrent(player: Player): boolean {
  const last = lastStint(player).team.toLowerCase();
  return last.includes(player.peakTeam.toLowerCase());
}

export function clubLine(player: Player): string {
  if (player.active) return `現役 ${lastStint(player).teamZh}`;
  return `代表隊 ${player.peakTeam}`;
}

export function hofLine(player: Player): string {
  if (player.nba.hof) return `${player.nba.hof} 年入選`;
  if (player.active) return "尚未入選（現役）";
  return "尚未入選";
}
