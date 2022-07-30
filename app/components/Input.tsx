import * as React from "react";
import clsx from "clsx";

type InputProps = {
  label: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef(
  (
    { label, className, ...props }: InputProps,
    ref: React.LegacyRef<HTMLInputElement>
  ) => (
    <label className="my-2 flex w-full flex-col">
      <span className="px-4">{label}</span>
      <input
        ref={ref}
        type="text"
        placeholder={label}
        className={clsx(
          "w-full rounded-lg bg-background py-4 px-6 text-text drop-shadow-md",
          className
        )}
        {...props}
      />
    </label>
  )
);

Input.displayName = "Input";
