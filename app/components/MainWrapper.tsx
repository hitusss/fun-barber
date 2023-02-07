import * as React from "react";
import clsx from "clsx";

export function MainWrapper({
  children,
  style,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <main
      style={{
        background: `linear-gradient(160deg, transparent -50%, rgb(var(--c-gray-d)) 65%), url(/images/background.jpg), rgb(var(--c-gray-d))`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        ...style,
      }}
      className={clsx("min-h-screen pt-20", className)}
      {...props}
    >
      {children}
    </main>
  );
}
