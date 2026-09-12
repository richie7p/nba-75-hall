import { useMemo, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { DATA_AS_OF, PLAYERS } from "@/data";
import { ERA_LABEL } from "@/data/types";
import { CabinetCard } from "@/components/cabinet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ERAS,
  POSITIONS,
  POS_LABEL,
  filterPlayers,
  groupedByEra,
  hallStats,
} from "@/lib/hall";
import { cn } from "@/lib/utils";

type SearchParams = {
  q?: string;
  era?: string;
  pos?: string;
};

export const Route = createFileRoute("/")({
  validateSearch: (raw: Record<string, unknown>): SearchParams => ({
    q: typeof raw.q === "string" ? raw.q : undefined,
    era: typeof raw.era === "string" ? raw.era : undefined,
    pos: typeof raw.pos === "string" ? raw.pos : undefined,
  }),
  component: Home,
});

function Home() {
  const search = Route.useSearch();
  const q = search.q ?? "";
  const era = search.era ?? "all";
  const pos = search.pos ?? "all";
  const navigate = Route.useNavigate();
  const stats = useMemo(() => hallStats(PLAYERS), []);

  const filtered = useMemo(
    () => filterPlayers(PLAYERS, { q, era, pos }),
    [q, era, pos],
  );
  const rooms = useMemo(() => groupedByEra(filtered), [filtered]);
  const grouped = era === "all" && !q && pos === "all";

  function patch(next: Partial<SearchParams>) {
    void navigate({
      search: (prev) => ({ ...prev, ...next }),
    });
  }

  return (
    <main className="min-h-dvh bg-bg text-fg">
      <header className="relative overflow-hidden border-b border-border">
        <div className="relative mx-auto max-w-6xl px-4 pt-10 pb-8 sm:px-6 sm:pt-14 sm:pb-10">
          <p className="stagger-in text-xs tracking-[0.28em] text-muted uppercase">
            NBA 75th Anniversary Team
          </p>
          <h1 className="stagger-in mt-3 font-display text-4xl leading-[1.1] font-medium tracking-tight sm:text-6xl">
            榮耀殿堂
          </h1>
          <p className="stagger-in mt-4 max-w-xl text-base leading-relaxed text-muted">
            七十六座獨立展櫃。從高中、大學、職業聯賽到國際賽事，以及每一段轉會軌跡。資料更新至 {DATA_AS_OF}。
          </p>
          <p className="glass stagger-in mt-6 max-w-2xl rounded-lg px-4 py-3 text-sm leading-relaxed text-fg/90">
            2026 總冠軍：紐約尼克 4–1 擊敗聖安東尼奧馬刺，總決賽 MVP Jalen Brunson。
          </p>
          <dl className="stagger-in mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="傳奇展櫃" value={String(stats.count)} />
            <Stat label="總冠軍戒指" value={String(stats.rings)} />
            <Stat label="年度 MVP" value={String(stats.mvps)} />
            <Stat label="籃球名人堂" value={String(stats.hof)} />
          </dl>
        </div>
      </header>

      <div className="glass-nav sticky top-0 z-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:px-6">
          <label className="relative block">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
            <Input
              value={q}
              onChange={(e) => patch({ q: e.target.value })}
              placeholder="搜尋中英文名、綽號、球隊…"
              className="pl-10"
              aria-label="搜尋巨星"
            />
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <Chip active={era === "all"} onClick={() => patch({ era: "all" })}>
              全部年代
            </Chip>
            {ERAS.map((e) => (
              <Chip key={e} active={era === e} onClick={() => patch({ era: e })}>
                {ERA_LABEL[e]}
              </Chip>
            ))}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <Chip active={pos === "all"} onClick={() => patch({ pos: "all" })}>
              全部位置
            </Chip>
            {POSITIONS.map((p) => (
              <Chip key={p} active={pos === p} onClick={() => patch({ pos: p })}>
                {p} {POS_LABEL[p]}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <p className="mb-6 text-sm text-muted">
          {filtered.length === PLAYERS.length
            ? "76 座展櫃全開"
            : `找到 ${filtered.length} 座展櫃`}
        </p>

        {filtered.length === 0 && (
          <div className="glass rounded-xl px-6 py-16 text-center">
            <p className="font-display text-xl">這條走廊暫時空著</p>
            <p className="mt-2 text-sm text-muted">換個關鍵字，或清掉篩選再走一圈。</p>
            <Button
              className="mt-6"
              variant="secondary"
              onClick={() => patch({ q: "", era: "all", pos: "all" })}
            >
              重設篩選
            </Button>
          </div>
        )}

        {grouped
          ? rooms.map((room) => (
              <section key={room.era} className="mb-12">
                <header className="mb-5 flex items-end justify-between gap-4 border-b border-border pb-3">
                  <h2 className="font-display text-2xl font-medium">{room.label}</h2>
                  <p className="text-sm text-muted tabular-nums">{room.players.length} 座</p>
                </header>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {room.players.map((p, i) => (
                    <CabinetCard key={p.id} player={p} index={i} />
                  ))}
                </div>
              </section>
            ))
          : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((p, i) => (
                  <CabinetCard key={p.id} player={p} index={i} />
                ))}
              </div>
            )}
      </section>

      <footer className="border-t border-border px-4 py-8 text-center text-xs leading-relaxed text-faint">
        2021 年 NBA 75 週年紀念隊因票數平手選出 76 人。榮譽與轉會紀錄更新至 {DATA_AS_OF}。
        肖像取自維基百科公開檔案，僅供展示。
      </footer>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-lg px-4 py-3">
      <dt className="text-[0.7rem] tracking-[0.18em] text-muted uppercase">{label}</dt>
      <dd className="mt-1 font-display text-2xl leading-none tabular-nums">{value}</dd>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-11 shrink-0 rounded-full px-4 text-sm transition-[background-color,color,box-shadow] duration-150",
        active
          ? "bg-accent text-accent-fg"
          : "glass text-muted hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}
