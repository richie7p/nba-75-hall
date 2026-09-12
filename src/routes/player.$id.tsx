import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Globe,
  GraduationCap,
  School,
  Trophy,
} from "lucide-react";
import { PLAYERS, getPlayer } from "@/data";
import { Portrait } from "@/components/portrait";
import { Button } from "@/components/ui/button";
import { ERA_LABEL, POS_LABEL, neighborIds, lastStint, peakIsCurrent, hofLine } from "@/lib/hall";

export const Route = createFileRoute("/player/$id")({
  component: PlayerExhibit,
  notFoundComponent: PlayerMissing,
});

function PlayerExhibit() {
  const { id } = Route.useParams();
  const player = getPlayer(id);
  if (!player) throw notFound();

  const { prev, next } = neighborIds(PLAYERS, player.id);
  const nba = player.nba;

  return (
    <main
      className="min-h-dvh bg-bg text-fg"
      style={{
        ["--color-team" as string]: player.color,
        ["--color-team-2" as string]: player.color2,
      }}
    >
      <div className="glass-nav sticky top-0 z-20">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">
              <ArrowLeft />
              回到殿堂
            </Link>
          </Button>
          <div className="flex gap-1">
            {prev && (
              <Button variant="ghost" size="icon" asChild aria-label="上一座展櫃">
                <Link to="/player/$id" params={{ id: prev }}>
                  <ArrowLeft />
                </Link>
              </Button>
            )}
            {next && (
              <Button variant="ghost" size="icon" asChild aria-label="下一座展櫃">
                <Link to="/player/$id" params={{ id: next }}>
                  <ArrowRight />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      <header className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <Portrait player={player} eager className="h-full min-h-80" />
          <div className="hero-veil absolute inset-0" />
        </div>
        <div className="relative mx-auto grid max-w-5xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[18rem_1fr] lg:items-end lg:py-16">
          <div className="cabinet-frame hidden overflow-hidden rounded-xl p-2 lg:block">
            <div className="vitrine-pane overflow-hidden rounded-lg">
              <Portrait player={player} eager />
            </div>
          </div>
          <div className="glass-strong rounded-xl px-5 py-6 sm:px-7 sm:py-8">
            <p className="text-xs tracking-[0.18em] text-muted">
              {POS_LABEL[player.pos]} · {ERA_LABEL[player.era]}
              {player.active
                ? ` · 現役 ${lastStint(player).teamZh}`
                : ` · 代表隊 ${player.peakTeam}`}
            </p>
            {player.active && !peakIsCurrent(player) && (
              <p className="mt-1 text-xs tracking-wide text-faint">
                代表隊 {player.peakTeam}（球衣與配色依巔峰時期）
              </p>
            )}
            <h1 className="mt-2 font-display text-4xl leading-tight font-medium sm:text-5xl">
              {player.nameZh}
            </h1>
            <p className="mt-1 text-lg text-muted">{player.name}</p>
            {player.aka.length > 0 && (
              <p className="mt-2 text-sm text-faint">{player.aka.join(" · ")}</p>
            )}
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg/90">
              {player.intro}
            </p>
            <dl className="mt-6 grid grid-cols-3 gap-3 sm:max-w-md">
              <Mini label="得分" value={player.sig.pts} />
              <Mini label="籃板" value={player.sig.reb} />
              <Mini label="助攻" value={player.sig.ast} />
            </dl>
            <p className="mt-4 text-sm text-muted">
              {player.from} · {player.ht} · {player.born.slice(0, 4)} 年生 · {nba.years}
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl space-y-10 px-4 py-10 sm:px-6">
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <HonorChip
            label="總冠軍"
            value={nba.championships.length ? String(nba.championships.length) : "—"}
          />
          <HonorChip
            label="總決賽 MVP"
            value={nba.finalsMvp.length ? String(nba.finalsMvp.length) : "—"}
          />
          <HonorChip
            label="年度 MVP"
            value={nba.mvp.length ? String(nba.mvp.length) : "—"}
          />
          <HonorChip label="全明星" value={String(nba.allStar)} />
        </section>

        <Room
          icon={<School className="size-4" />}
          title="高中"
          subtitle={player.hs.school}
          items={player.hs.honors}
        />

        <Room
          icon={<GraduationCap className="size-4" />}
          title="大學"
          subtitle={player.uni ? `${player.uni.school}${player.uni.years ? ` · ${player.uni.years}` : ""}` : "未走 NCAA"}
          items={player.uni?.honors ?? ["高中或海外直接進入職業"]}
        />

        <section>
          <Header icon={<Trophy className="size-4" />} title="職業聯賽" subtitle={nba.years} />
          <div className="glass rounded-xl p-5 sm:p-6">
            <HonorList label="總冠軍" values={nba.championships} />
            <HonorList label="總決賽 MVP" values={nba.finalsMvp} />
            <HonorList label="年度 MVP" values={nba.mvp} />
            <HonorList label="最佳防守球員" values={nba.dpoy} />
            <HonorList label="年度新人" values={nba.roy ? [nba.roy] : []} />
            <HonorList label="得分王" values={nba.scoring} />
            <Row label="全明星" value={`${nba.allStar} 次`} />
            <Row label="最佳陣容" value={nba.allNba} />
            <Row label="最佳防守陣容" value={nba.allDef} />
            <HonorList label="退役背號" values={nba.retired} />
            <Row
              label="名人堂"
              value={hofLine(player)}
            />
            {nba.extras.length > 0 && (
              <ul className="mt-4 space-y-1.5 border-t border-border pt-4 text-sm text-muted">
                {nba.extras.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <Room
          icon={<Globe className="size-4" />}
          title="國際賽事"
          subtitle="奧運 / 世界盃 / 國家隊"
          items={player.intl}
        />

        <section>
          <Header title="轉會與生涯路徑" subtitle={`${player.path.length} 站`} />
          <ol className="relative space-y-0">
            {player.path.map((stint, i) => (
              <li key={`${stint.team}-${stint.years}`} className="grid grid-cols-[1rem_1fr] gap-4">
                <div className="flex flex-col items-center">
                  <span className="mt-2 size-3 rounded-full bg-accent" />
                  {i < player.path.length - 1 && (
                    <span className="w-px flex-1 bg-border" />
                  )}
                </div>
                <div className="pb-6">
                  <p className="font-display text-lg leading-tight">{stint.teamZh}</p>
                  <p className="text-sm text-muted">
                    {stint.team} · {stint.years}
                  </p>
                  <p className="mt-1 text-sm text-faint">{stint.how}</p>
                </div>
              </li>
            ))}
          </ol>

          {player.trades.length > 0 ? (
            <div className="glass mt-2 rounded-xl p-5">
              <h3 className="text-xs tracking-[0.2em] text-muted uppercase">交易紀錄</h3>
              <ul className="mt-4 space-y-4">
                {player.trades.map((t) => (
                  <li key={t.date} className="grid gap-1 sm:grid-cols-[7.5rem_1fr]">
                    <time className="text-sm tabular-nums text-accent">{t.date}</time>
                    <p className="text-sm leading-relaxed text-fg/90">{t.deal}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="mt-2 text-sm text-muted">生涯未被交易，路徑以選秀與自由球員為主。</p>
          )}
        </section>
      </div>
    </main>
  );
}

function PlayerMissing() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-bg px-6 text-center text-fg">
      <p className="text-xs tracking-[0.24em] text-muted uppercase">Exhibit 404</p>
      <h1 className="mt-3 font-display text-3xl">這座展櫃尚未開燈</h1>
      <p className="mt-2 max-w-sm text-sm text-muted">名單裡找不到這位巨星。回到殿堂再走一圈。</p>
      <Button className="mt-6" asChild>
        <Link to="/">回到殿堂</Link>
      </Button>
    </main>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-md px-3 py-2">
      <dt className="text-[0.65rem] tracking-[0.16em] text-muted uppercase">{label}</dt>
      <dd className="font-display text-xl tabular-nums">{value}</dd>
    </div>
  );
}

function HonorChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-lg px-4 py-4">
      <p className="text-[0.7rem] tracking-[0.18em] text-muted uppercase">{label}</p>
      <p className="mt-1 font-display text-3xl leading-none tabular-nums">{value}</p>
    </div>
  );
}

function Header({
  icon,
  title,
  subtitle,
}: {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="mb-4 flex items-end justify-between gap-3">
      <h2 className="flex items-center gap-2 font-display text-2xl font-medium">
        {icon}
        {title}
      </h2>
      {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
    </header>
  );
}

function Room({
  icon,
  title,
  subtitle,
  items,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  items: string[];
}) {
  return (
    <section>
      <Header icon={icon} title={title} subtitle={subtitle} />
      <ul className="glass rounded-xl px-5 py-4">
        {items.map((item) => (
          <li
            key={item}
            className="border-b border-border py-2.5 text-sm last:border-b-0"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function HonorList({ label, values }: { label: string; values: string[] }) {
  if (!values.length) return null;
  return <Row label={label} value={values.join(" · ")} />;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 border-b border-border py-3 last:border-b-0 sm:grid-cols-[8rem_1fr]">
      <p className="text-sm text-muted">{label}</p>
      <p className="text-sm leading-relaxed">{value}</p>
    </div>
  );
}
