import { Link } from "@tanstack/react-router";
import { Portrait } from "@/components/portrait";
import { POS_LABEL, clubLine } from "@/lib/hall";
import type { Player } from "@/data/types";

export function CabinetCard({ player, index }: { player: Player; index: number }) {
  const rings = player.nba.championships.length;
  const mvps = player.nba.mvp.length;
  const delay = Math.min(index, 12) * 40;

  return (
    <Link
      to="/player/$id"
      params={{ id: player.id }}
      className="cabinet-frame group block rounded-xl p-2 focus-visible:outline-none"
      style={{
        ["--color-team" as string]: player.color,
        ["--color-team-2" as string]: player.color2,
        animationDelay: `${delay}ms`,
      }}
    >
      <article className="vitrine-pane relative overflow-hidden rounded-lg">
        <Portrait player={player} />
        <div className="frost-plate absolute inset-x-0 bottom-0 px-3 pt-8 pb-3">
          <p className="text-[0.65rem] tracking-[0.18em] text-accent">
            {POS_LABEL[player.pos]} · {clubLine(player)}
          </p>
          <div className="mt-1.5 flex items-end gap-2.5">
            <span className="font-display text-2xl leading-none text-fg tabular-nums">
              {player.jersey}
            </span>
            <div className="min-w-0">
              <h3 className="truncate font-display text-base leading-tight font-medium text-fg">
                {player.nameZh}
              </h3>
              <p className="truncate text-xs tracking-wide text-muted">{player.name}</p>
            </div>
          </div>
          <div className="mt-2.5 flex items-center gap-1.5" aria-hidden="true">
            {rings > 0 &&
              Array.from({ length: Math.min(rings, 11) }).map((_, i) => (
                <span key={i} className="honor-pip" />
              ))}
            {rings === 0 && mvps > 0 && (
              <span className="text-[0.65rem] tracking-[0.16em] text-muted uppercase">
                MVP ×{mvps}
              </span>
            )}
            {rings === 0 && mvps === 0 && player.nba.hof && (
              <span className="text-[0.65rem] tracking-[0.16em] text-muted uppercase">
                名人堂 {player.nba.hof}
              </span>
            )}
            {rings === 0 && mvps === 0 && !player.nba.hof && (
              <span className="text-[0.65rem] tracking-[0.16em] text-muted uppercase">
                全明星 ×{player.nba.allStar}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
