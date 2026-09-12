/// Legal documents are kept as structured data rather than as one blob of
/// markup, for three reasons: a lawyer can review one section at a time, the
/// page renders with the same design tokens as everything else, and the two
/// languages cannot silently drift apart in structure.
///
/// These texts are DRAFTS prepared to be reviewed by a Moldovan lawyer before
/// the first paying customer. They are written to be understood by the person
/// signing up, not to impress anyone. See docs/legal/README.md.

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface LegalDocument {
  title: string;
  /// Shown to the reader so they can tell whether anything changed since they
  /// last agreed.
  updatedAt: string;
  intro: string[];
  sections: LegalSection[];
}
