import { z } from 'zod';

export const productSchema = z.object({
  code: z
    .string()
    .max(32)
    .optional()
    .or(z.literal('').transform(() => undefined)),
  name: z.string().min(1, 'name_required').max(200),
  unit: z
    .string()
    .max(10)
    .optional()
    .or(z.literal('').transform(() => undefined)),
  priceNet: z.string().regex(/^\d{1,10}(?:\.\d{1,2})?$/, 'price_invalid'),
  vatRate: z.enum(['20', '8', '0'], { message: 'vat_invalid' }),
});

export type ProductValues = z.infer<typeof productSchema>;
