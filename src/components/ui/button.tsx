import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-[transform,background-color,box-shadow,color] duration-150 ease-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 active:scale-[0.96] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-accent text-accent-fg hover:bg-accent/90",
        secondary:
          "bg-elevated text-fg shadow-[var(--shadow-border)] hover:bg-subtle",
        ghost: "text-fg hover:bg-subtle",
        outline:
          "text-fg shadow-[var(--shadow-border)] hover:bg-subtle hover:shadow-[var(--shadow-border-hover)]",
        inverse: "bg-fg text-bg hover:bg-fg/90",
      },
      size: {
        default: "h-11 rounded-md px-4",
        sm: "h-9 rounded-sm px-3 text-sm",
        lg: "h-12 rounded-md px-5",
        icon: "size-11 rounded-md",
        pill: "h-10 rounded-full px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
