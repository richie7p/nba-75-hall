import { cn } from "@/lib/utils";

type JerseyProps = {
  number: number | string;
  lastName: string;
  className?: string;
};

export function Jersey({ number, lastName, className }: JerseyProps) {
  const display = lastName.split(" ").pop() ?? lastName;
  return (
    <div
      className={cn(
        "jersey-cut relative mx-auto flex aspect-[5/6] w-full max-w-[11rem] flex-col items-center justify-end overflow-hidden",
        "bg-team text-team-2",
        className,
      )}
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-x-[8%] top-0 h-[18%] bg-team-2/20" />
      <div className="pointer-events-none absolute inset-y-[22%] left-0 w-[10%] bg-team-2/25" />
      <div className="pointer-events-none absolute inset-y-[22%] right-0 w-[10%] bg-team-2/25" />
      <div className="absolute top-[18%] left-1/2 h-[10%] w-[28%] -translate-x-1/2 rounded-b-[40%] bg-elevated" />
      <p className="relative z-10 mb-1 px-2 text-center text-[0.65rem] font-semibold tracking-[0.28em] uppercase opacity-90">
        {display.slice(0, 10)}
      </p>
      <p className="relative z-10 font-display text-5xl leading-none font-medium tracking-tight tabular-nums">
        {number}
      </p>
      <div className="h-[12%]" />
    </div>
  );
}
