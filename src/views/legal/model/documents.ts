import type { Locale } from '@/shared/i18n';

import { privacyRo } from './privacy.ro';
import { privacyRu } from './privacy.ru';
import { termsRo } from './terms.ro';
import { termsRu } from './terms.ru';
import type { LegalDocument } from './types';

export type LegalDocumentKind = 'terms' | 'privacy';

const DOCUMENTS: Record<LegalDocumentKind, Record<Locale, LegalDocument>> = {
  terms: { ro: termsRo, ru: termsRu },
  privacy: { ro: privacyRo, ru: privacyRu },
};

export function legalDocument(kind: LegalDocumentKind, locale: Locale): LegalDocument {
  return DOCUMENTS[kind][locale];
}
