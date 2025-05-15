import { type FC } from "react";
import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";
import { Button } from "./Button";

interface ErrorDisplayProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorDisplay: FC<ErrorDisplayProps> = ({
  message = "Ha ocurrido un error inesperado",
  onRetry,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-6 rounded-xl bg-error/20 border border-error/50 ${className}`}
      role="alert"
      aria-live="assertive"
    >
      <FiAlertCircle className="text-4xl text-error mb-3" />
      <p className="text-secondary-700 text-center mb-4">{message}</p>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="primary"
          className="flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-200 shadow-sm hover:shadow-md"
          aria-label="Reintentar"
        >
          <FiRefreshCw className="text-lg mr-2" />
          <span>Reintentar</span>
        </Button>
      )}
    </div>
  );
}; 