import { Button } from './button';

interface ErrorStateProps {
  /// A human sentence. A status code or an API error name is not one.
  message: string;
  retryLabel: string;
  onRetry: () => void;
}

export function ErrorState({ message, retryLabel, onRetry }: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-3 rounded-(--radius-card) border border-danger-600/20 bg-danger-50 px-6 py-10 text-center"
    >
      <p className="max-w-sm text-body text-danger-700">{message}</p>
      <Button variant="secondary" onClick={onRetry}>
        {retryLabel}
      </Button>
    </div>
  );
}
