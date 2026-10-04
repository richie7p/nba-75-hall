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
          <div className="mb-24 text-center text-fg/70">
            <p className="font-display text-5xl">{player.name.split(" ").map(part => part[0]).join("")}</p>
            <p className="mt-3 font-mono text-xl">#{player.jersey}</p>
          </div>
        </div>
      )}
    </div>
  );
}
