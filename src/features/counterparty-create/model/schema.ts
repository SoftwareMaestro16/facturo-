import { z } from 'zod';

export const counterpartySchema = z.object({
  name: z.string().min(2, 'name_required').max(200),
  idno: z.string().regex(/^\d{13}$/, 'idno_invalid'),
  vatCode: z
    .string()
    .regex(/^\d{6}$/, 'vat_invalid')
    .optional()
    .or(z.literal('').transform(() => undefined)),
  email: z
    .email('email_invalid')
    .max(254)
    .optional()
    .or(z.literal('').transform(() => undefined)),
  phone: z
    .string()
    .max(32)
    .optional()
    .or(z.literal('').transform(() => undefined)),
  address: z
    .string()
    .max(300)
    .optional()
    .or(z.literal('').transform(() => undefined)),
  iban: z
    .string()
    .regex(/^MD\d{2}[A-Z0-9]{20}$/, 'iban_invalid')
    .optional()
    .or(z.literal('').transform(() => undefined)),
  bankName: z
    .string()
    .max(120)
    .optional()
    .or(z.literal('').transform(() => undefined)),
});

export type CounterpartyValues = z.infer<typeof counterpartySchema>;
