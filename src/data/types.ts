export type Position = "PG" | "SG" | "SF" | "PF" | "C";

export type Era =
  | "pioneers"
  | "seventies"
  | "eighties"
  | "nineties"
  | "aughts"
  | "modern";

export type TeamStint = {
  team: string;
  teamZh: string;
  years: string;
  how: string;
};

export type Trade = {
  date: string;
  deal: string;
};

export type SchoolHonors = {
  school: string;
  years?: string;
  honors: string[];
};

export type Player = {
  id: string;
  name: string;
  nameZh: string;
  aka: string[];
  pos: Position;
  born: string;
  from: string;
  ht: string;
  jersey: number | string;
  peakTeam: string;
  color: string;
  color2: string;
  era: Era;
  active: boolean;
  intro: string;
  hs: SchoolHonors;
  uni: SchoolHonors | null;
  nba: {
    years: string;
    championships: string[];
    finalsMvp: string[];
    mvp: string[];
    dpoy: string[];
    roy: string | null;
    allStar: number;
    allNba: string;
    allDef: string;
    scoring: string[];
    retired: string[];
    hof: number | null;
    extras: string[];
  };
  intl: string[];
  path: TeamStint[];
  trades: Trade[];
  sig: { pts: string; reb: string; ast: string };
};

export const ERA_LABEL: Record<Era, string> = {
  pioneers: "開創期 1940s–60s",
  seventies: "輝煌 1970s",
  eighties: "Showtime 1980s",
  nineties: "王朝 1990s",
  aughts: "新世紀 2000s",
  modern: "當代 2010s–",
};

export const POS_LABEL: Record<Position, string> = {
  PG: "控球後衛",
  SG: "得分後衛",
  SF: "小前鋒",
  PF: "大前鋒",
  C: "中鋒",
};
