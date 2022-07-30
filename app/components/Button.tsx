import * as React from "react";
import clsx from "clsx";

type ButtonProps = {
  size?: "small" | "large";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  size = "small",
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "border-4 border-text text-text drop-shadow-lg transition hover:scale-110 hover:border-brand hover:text-brand focus:scale-110 focus:border-brand focus:text-brand disabled:scale-90 disabled:cursor-default disabled:border-text/50 disabled:text-text/50",
        {
          "px-16 py-6 text-3xl": size === "large",
          "px-8 py-4 text-2xl": size === "small",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
