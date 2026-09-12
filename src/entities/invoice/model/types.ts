/// Types describing what the API returns for an invoice.
///
/// Hand-written only until `npm run api:generate` has run against the server's
/// OpenAPI document; after that the generated types are authoritative and these
/// stay as the domain vocabulary the UI speaks.

export type InvoiceStatus =
  'DRAFT' | 'SIGNING' | 'SENT' | 'DELIVERED' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED' | 'ERROR';

export type InvoiceDirection = 'OUTGOING' | 'INCOMING';

export interface InvoiceListItem {
  id: string;
  direction: InvoiceDirection;
  status: InvoiceStatus;
  series: string;
  number: number;
  issueDate: string;
  counterpartyName: string;
  /// Fixed-scale string, never a number: a float has already lost the cents.
  total: string;
  currency: string;
}
