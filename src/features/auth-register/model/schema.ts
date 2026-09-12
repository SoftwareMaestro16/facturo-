import { z } from 'zod';

/// Registration form. Rules match what the server enforces so a mistyped IDNO
/// or a short password fails without a round trip. Anything the server checks
/// deeper (IDNO already registered, password equal to phone) stays on the
/// server and comes back as a stable code the interface translates.
export const registerSchema = z.object({
  companyName: z.string().min(2, 'company_too_short').max(200),
  idno: z.string().regex(/^\d{13}$/, 'idno_invalid'),
  vatCode: z
    .string()
    .regex(/^\d{6}$/, 'vat_invalid')
    .optional()
    .or(z.literal('').transform(() => undefined)),
  email: z.email({ message: 'email_invalid' }).max(254),
  phone: z
    .string()
    .max(32)
    .optional()
    .or(z.literal('').transform(() => undefined)),
  fullName: z.string().min(2, 'name_too_short').max(120),
  password: z.string().min(8, 'password_too_short').max(128),
});

export type RegisterValues = z.infer<typeof registerSchema>;
