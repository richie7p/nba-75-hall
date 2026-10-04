export const CHECKED_AT = "2026-10-04";
export const MEMBERSHIP_SOURCE = "https://www.nba.com/75/";
export type Source = { scope: string; url: string; published: string };
/** Scope is deliberately narrow: a transaction source does not verify a biography. */
export const PLAYER_SOURCES: Record<string, Source[]> = {
  "giannis-antetokounmpo": [{ scope: "2026-07-06 熱火交易正式完成；原資料誤用報導日期", url: "https://www.nba.com/players/transactions?TeamID=1610612748", published: "2026-07-06" }],
  "stephen-curry": [{ scope: "2026 第 12 次全明星入選及傷退", url: "https://www.nba.com/news/raptors-brandon-ingram-replaces-stephen-curry-all-star-game", published: "2026-02-10" }],
  "anthony-davis": [{ scope: "2026-02-05 正式加盟巫師；原 2 月 4 日為報導日期", url: "https://www.nba.com/gamenotes/wizards.pdf", published: "2025-26 season notes" }],
  "james-harden": [{ scope: "2026 騎士交易", url: "https://www.nba.com/news/james-harden-darius-garland-trade", published: "2026-02-05" }],
  "lebron-james": [{ scope: "2026 七六人簽約；球隊未公布合約條款", url: "https://www.nba.com/sixers/news/philadelphia-76ers-sign-4x-nba-champion-and-22x-all-star-lebron-james", published: "2026-07-27" }],
  "kawhi-leonard": [{ scope: "2026 年 9 月重返暴龍；更正原本仍在快艇的過期資訊", url: "https://www.nba.com/news/raptors-clippers-kawhi-leonard-trade", published: "2026-09-23" }],
  "damian-lillard": [{ scope: "2025–26 缺陣與 2026–27 復出目標（非已復出）", url: "https://www.nba.com/news/2026-comeback-players-to-watch", published: "2026-08-24" }],
  "chris-paul": [{ scope: "2026-02-13 宣布退役", url: "https://www.nba.com/news/chris-paul-announces-nba-retirement", published: "2026-02-13" }],
  "russell-westbrook": [{ scope: "2026-08-12 宣布退役", url: "https://www.nba.com/news/russell-westbrook-retires-nba-after-18-seasons", published: "2026-08-13" }],
};
