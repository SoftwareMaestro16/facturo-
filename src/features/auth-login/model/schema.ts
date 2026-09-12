import { z } from 'zod';

/// Login form validation. Runs on the client before the request so a mistyped
/// email fails without a round trip.
///
/// The rules are deliberately weaker than what the server enforces on register:
/// login accepts any string as a password, because rejecting it here would leak
/// what the account's real password looked like.
export const loginSchema = z.object({
  email: z.email({ message: 'invalid_email' }).max(254),
  password: z.string().min(1, { message: 'password_required' }).max(128),
});

export type LoginValues = z.infer<typeof loginSchema>;
