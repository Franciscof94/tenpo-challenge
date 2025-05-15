import { type ButtonHTMLAttributes, type FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export const Button: FC<ButtonProps> = ({
  variant = "primary",
  className = "",
  children,
  ...props
}) => {
  const base =
    "font-semibold rounded-xl px-4 py-2 transition-colors cursor-pointer duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary:
      "bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-400",
    secondary:
      "bg-secondary-100 text-secondary-700 border border-secondary-300 hover:bg-secondary-200 focus:ring-secondary-300",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
