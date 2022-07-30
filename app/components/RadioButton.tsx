import * as React from "react";
import clsx from "clsx";

type RadioButtonProps = {
  name: string;
  value: string | number;
  label: string | number | React.ReactNode;
  disabled?: boolean;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const RadioButton = React.forwardRef(
  (
    { name, value, label, disabled, className, ...props }: RadioButtonProps,
    ref: React.LegacyRef<HTMLInputElement>
  ) => {
    const id = `${name}-${value}`.replace(/\s/g, "");
    return (
      <div>
        <input
          ref={ref}
          type="radio"
          name={name}
          value={value}
          disabled={disabled}
          id={id}
          className="peer absolute opacity-0"
          {...props}
        />
        <label
          htmlFor={id}
          className={clsx(
            "cursor-pointer text-text peer-disabled:cursor-default peer-disabled:text-text/25",
            className
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);

RadioButton.displayName = "RadioButton";
