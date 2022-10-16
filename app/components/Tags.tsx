import * as React from "react";
import clsx from "clsx";

export function TagWrapper({
  children,
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div className={clsx("flex flex-wrap gap-2", className)} {...props}>
      {children}
    </div>
  );
}

export function Tag({
  children,
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div
      className={clsx(
        "rounded-full bg-brand px-3 py-1 text-xs text-white",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
