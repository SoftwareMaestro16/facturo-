import { z } from 'zod';

const MONEY = /^\d{1,10}(?:\.\d{1,2})?$/;
const QUANTITY = /^\d{1,9}(?:[.,]\d{1,3})?$/;

/// Client validation for the invoice form. Same rules as the server so a
/// mistyped price fails without a round trip; anything the server checks
/// deeper (the issue-date window, the counterparty existing) surfaces as a
/// stable code the form maps to a sentence.
export const invoiceLineSchema = z.object({
  name: z.string().min(1, 'line_name_required').max(200),
  quantity: z.string().regex(QUANTITY, 'quantity_invalid'),
  priceNet: z.string().regex(MONEY, 'price_invalid'),
  vatRate: z.enum(['20', '8', '0'], { message: 'vat_invalid' }),
  unit: z
    .string()
    .max(10)
    .optional()
    .or(z.literal('').transform(() => undefined)),
});

export const invoiceSchema = z.object({
  cycle: z.enum(['LONG', 'SHORT']),
  issueDate: z.iso.date('issue_date_invalid'),
  counterpartyId: z.string().min(1, 'counterparty_required'),
  notes: z
    .string()
    .max(1000)
    .optional()
    .or(z.literal('').transform(() => undefined)),
  lines: z.array(invoiceLineSchema).min(1, 'lines_empty').max(100),
});

export type InvoiceLineValues = z.infer<typeof invoiceLineSchema>;
export type InvoiceValues = z.infer<typeof invoiceSchema>;

/// Normalises a user-typed quantity ("2,5" or "2.5") to what the server wants.
export function normaliseQuantity(value: string): string {
  return value.replace(',', '.');
}
