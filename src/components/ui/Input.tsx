import { type InputHTMLAttributes, type FC, type ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

export const Input: FC<InputProps> = ({
  className = "",
  iconLeft,
  iconRight,
  ...props
}) => {
  const paddingLeft = iconLeft ? "pl-10" : "pl-4";
  const paddingRight = iconRight ? "pr-10" : "pr-4";

  return (
    <div className="relative flex items-center">
      {iconLeft && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {iconLeft}
        </div>
      )}
      <input
        className={`w-full rounded-xl border border-secondary-200 bg-white py-2 text-secondary-800 placeholder-secondary-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-200 transition-all ${paddingLeft} ${paddingRight} ${className}`}
        {...props}
      />
      {iconRight && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          {iconRight}
        </div>
      )}
    </div>
  );
};
