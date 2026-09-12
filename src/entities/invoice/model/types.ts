/// The vocabulary the interface speaks about a fiscal document.
///
/// Hand-written only until `npm run api:generate` has run against the server's
/// OpenAPI document; after that the generated types are authoritative and these
/// stay as the domain words the UI uses.
///
/// The status names follow SIA "e-Factura" rather than a tidier scheme of our
/// own, because the customer sees these states on the state portal and in their
/// accountant's vocabulary. Two names for one state is how support calls start.
/// What the customer *reads* on screen is plain language; see messages/*.json.

export type InvoiceStatus =
  /// Exists only in Facturo, still editable.
  | 'DRAFT'
  /// The supplier's first signature is applied.
  | 'SIGNED'
  /// Handed to the platform, visible to the buyer.
  | 'SENT'
  /// The buyer has taken delivery in the system.
  | 'RECEIVED'
  /// Final. Short cycle: the supplier's second signature. Long cycle: the
  /// buyer's signature.
  | 'FINISHED'
  /// The supplier asked to cancel a finished long-cycle document and is waiting
  /// for the buyer to agree.
  | 'CANCELLATION_REQUESTED'
  | 'CANCELLED'
  /// Not a platform state: the send failed on our side.
  | 'ERROR';

/// SHORT finishes on the supplier's second signature and is then printed.
/// LONG finishes on the buyer's signature and stays electronic.
export type InvoiceCycle = 'SHORT' | 'LONG';

export type InvoiceDirection = 'OUTGOING' | 'INCOMING';

export interface InvoiceListItem {
  id: string;
  direction: InvoiceDirection;
  status: InvoiceStatus;
  cycle: InvoiceCycle;
  series: string;
  number: number;
  issueDate: string;
  counterpartyName: string;
  /// Fixed-scale string, never a number: a float has already lost the bani.
  total: string;
  currency: string;
}
