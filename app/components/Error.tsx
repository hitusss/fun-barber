import clsx from "clsx";

export function Error({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="alert"
      className={clsx("text-sm text-red-700 shadow-sm", className)}
      {...props}
    />
  );
}
