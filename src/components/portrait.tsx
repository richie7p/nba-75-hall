import { useState } from "react";
import { photoOf } from "@/data/photos";
import type { Player } from "@/data/types";
import { cn } from "@/lib/utils";

type PortraitProps = {
  player: Player;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
};

export function Portrait({ player, className, imgClassName, eager }: PortraitProps) {
  const src = photoOf(player.id);
  const [ok, setOk] = useState(Boolean(src));

  return (
    <div className={cn("size-full overflow-hidden", className)}>
      {src && ok ? (
        <img
          src={src}
          alt={`${player.nameZh}，${player.name}`}
          className={cn("portrait-img", imgClassName)}
          width={720}
          height={960}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={() => setOk(false)}
        />
      ) : (
        <div className="portrait-fallback flex size-full items-end justify-center" aria-hidden="true">
          <span className="mb-8 font-display text-6xl leading-none text-fg/30 tabular-nums">
            {player.jersey}
          </span>
        </div>
      )}
    </div>
  );
}
