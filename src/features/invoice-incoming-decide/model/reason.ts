/// What the company writes down when it does not agree with a document a
/// supplier sent. The server accepts 1 to 500 characters; checking here too
/// means the person is told before the round trip, not after it.

export const REASON_MAX_LENGTH = 500;

export type ReasonProblem = 'empty' | 'tooLong';

export function checkReason(value: string): ReasonProblem | null {
  const trimmed = value.trim();

  if (trimmed.length === 0) return 'empty';
  if (trimmed.length > REASON_MAX_LENGTH) return 'tooLong';

  return null;
}
