import type { ReactNode } from 'react';
import { useId } from 'react';

import { cn } from '@/shared/lib';

interface FieldProps {
  label: string;
  hint?: string;
  /// A sentence, never a validation code. The customer has to know what to fix.
  error?: string;
  required?: boolean;
  children: (props: {
    id: string;
    'aria-describedby': string | undefined;
    'aria-invalid': boolean;
  }) => ReactNode;
}

/// Wraps a control with its label, hint and error, and wires the accessibility
/// attributes that connect them. Doing this per form is how half the inputs end
/// up unlabelled.
export function Field({ label, hint, error, required = false, children }: FieldProps) {
  const id = useId();
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-body font-medium text-ink">
        {label}
        {required && <span className="ml-0.5 text-danger-600">*</span>}
      </label>

      {children({ id, 'aria-describedby': describedBy, 'aria-invalid': Boolean(error) })}

      {error ? (
        <p id={`${id}-error`} className="text-sm text-danger-700">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className={cn('text-sm text-ink-muted')}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}
