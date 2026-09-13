# Legal readiness — 2026-09-13

These RU/RO documents are review drafts, not a legal opinion or a guarantee
against claims. Supplier details provided by the owner: Şcerbacov Daniil,
independent entrepreneur/freelancer, IDNO 1026023032436,
daniilscherbakov1@gmail.com. Registration and activity eligibility have not been
independently verified. A publishable correspondence address is still missing.

## Changes

- Removed unverified promises of six-year fiscal archiving, settings-based deletion,
  universal export, active maib checkout and absolute security guarantees.
- Distinguished available software from sandbox integrations and future AI.
- Limited liability clauses preserve mandatory rights and exceptions; their
  enforceability needs Moldovan counsel's assessment, particularly for a freelancer.
- Separated acceptance of contract from consent to optional data processing.
- Explained Google authentication, Supabase infrastructure, client/controller roles,
  rights and complaints, and the need for transfer safeguards and retention rules.

## Before commercial launch

1. Complete supplier address; verify registered activity, tax status and contract
   wording with Moldovan counsel/accountant. Do not represent personal liability
   as eliminated by these terms.
2. Approve final B2B terms, customer order and processing agreement. Cover documented
   instructions, confidentiality, security, subprocessors, assistance with requests,
   incidents, deletion/return and audit arrangements.
3. Verify actual hosting providers, legal entities, regions, transfer safeguards,
   contracts, monitoring configuration and international access. Publish a factual
   subprocessor list, not an assumed one.
4. Implement retention/deletion procedures with tested backup handling. Set
   per-category periods from actual purposes and applicable obligations.
   *Partly done:* a person can download their own account data (profile,
   memberships, sessions, security events) in Settings. Company documents and
   deletion still go through an emailed request.
5. *Done:* the server stores `User.termsVersion` and `termsAcceptedAt` at Google
   sign-in and refuses a sign-in from a page showing an outdated edition
   (`terms_outdated`). Bump `CURRENT_TERMS_VERSION` (server), `LEGAL_VERSION`
   (client) and both documents' `updatedAt` together.
6. Define request/complaint handling, incident response and legally required
   notification procedures. Confirm the stated email is monitored.
7. Before payments: final price/tax disclosure, renewal authorization, cancellation,
   refunds and payment-provider documentation. Before AI: data notices, provider
   contract, scoped access, review workflow and deletion/cost limits.

## Risks and free/low-cost consultation contacts

See `docs/legal/risks-and-contacts.md` (Russian) for the numbered risk list
discussed with the owner — personal liability, invoice-error liability,
personal data law, IDNO fraud/impersonation, consumer-vs-business status,
e-signature custody, payments, trademarks/third-party licences, Google OAuth
consent screen — each with a mitigation, plus free-launch strategy (no
payments/no real e-Factura sending/AI in sandbox until launch) and where to
get free or low-cost help (SFS/CTIF, CNPDCP, ODA, university legal clinics,
AGEPI).

## Official sources reviewed

- CNPDCP: Law 195/2024 took effect 23 August 2026:
  https://datepersonale.md/legea-nr-195-2024-privind-protectia-datelor-cu-caracter-personal-principalele-prevederi-si-noutati-legislative/
- CNPDCP explanation of legal bases, accountability and rights:
  https://datepersonale.md/wp-content/uploads/2026/04/GDPR.pdf
- Chisinau commerce directorate, information-society service duties:
  https://comert.chisinau.md/informatii-utile/comertul-electronic/comertul-electronic/

These sources inform the draft; they do not validate the entire business or the
enforceability of a particular limitation clause. Legal compliance also requires
operational controls and agreements, not only published website text.
