import { type FC } from "react";
import { ImSpinner9 } from "react-icons/im";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
}

export const Spinner: FC<SpinnerProps> = ({
  size = "md",
  color = "text-primary-400",
}) => {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-5xl",
  };

  return (
    <div className="flex justify-center items-center">
      <ImSpinner9
        className={`${sizeClasses[size]} ${color} animate-spin`}
        data-testid="spinner-svg"
      />
    </div>
  );
};
