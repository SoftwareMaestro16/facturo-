export function sessionDestination(session: { companyId: string | null }): '/invoices' | '/onboarding' {
  return session.companyId ? '/invoices' : '/onboarding';
}
