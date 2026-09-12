import { Link } from '@/shared/i18n';
import { Logo } from '@/shared/ui';

import type { LegalDocument } from '../model/types';

/// One narrow column, generous line height, headings that can be scanned. A
/// legal page that looks like a wall of text does not get read, and a document
/// nobody read protects nobody.
export function LegalView({ document, backLabel }: { document: LegalDocument; backLabel: string }) {
  return (
    <div className="min-h-dvh">
      <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-5">
        <Link href="/">
          <Logo />
        </Link>
        <Link href="/" className="text-body text-ink-muted hover:text-ink">
          {backLabel}
        </Link>
      </header>

      <main className="mx-auto w-full max-w-3xl px-4 pb-20">
        <h1 className="text-3xl">{document.title}</h1>
        <p className="mt-2 text-sm text-ink-muted">{document.updatedAt}</p>

        {document.intro.map((paragraph) => (
          <p key={paragraph} className="mt-4 text-body-lg text-ink">
            {paragraph}
          </p>
        ))}

        {document.sections.map((section) => (
          <section key={section.heading} className="mt-10">
            <h2 className="text-xl">{section.heading}</h2>

            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph} className="mt-3 text-body text-ink">
                {paragraph}
              </p>
            ))}

            {section.bullets ? (
              <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-body text-ink">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </main>
    </div>
  );
}
