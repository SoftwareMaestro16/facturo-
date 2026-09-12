/// The vocabulary the interface uses to talk about "who is signed in".
///
/// Copied from the generated model rather than re-exporting it, so the domain
/// layer stays a thin, stable surface even when the OpenAPI document renames a
/// field. The compiler will catch a drift at the mapping site.

export type UserRole = 'OWNER' | 'ACCOUNTANT' | 'VIEWER';

export interface CurrentUser {
  userId: string;
  companyId: string;
  email: string;
  fullName: string;
  role: UserRole;
  companyName: string;
  locale: string;
  vatCode?: string | null;
}
