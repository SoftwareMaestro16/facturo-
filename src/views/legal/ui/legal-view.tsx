import { Link } from '@/shared/i18n';
import { Logo, TopoField } from '@/shared/ui';

import type { LegalDocument } from '../model/types';

export function LegalView({ document, backLabel }: { document: LegalDocument; backLabel: string }) {
  return (
    <div className="relative min-h-dvh text-white">
      <TopoField speed={0.5} density={0.85} />
      <div className="relative min-h-dvh bg-black/70">
        <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-5 sm:px-10">
          <Link href="/">
            <Logo inverted />
          </Link>
          <Link href="/" className="text-body text-white/55 hover:text-white">
            {backLabel}
          </Link>
        </header>

        <main className="mx-auto w-full max-w-5xl px-6 pb-24 pt-8 sm:px-10">
          <div className="border-y border-white/10 py-10 sm:py-14">
            <p className="text-sm text-white/45">{document.updatedAt}</p>
            <h1 className="mt-3 max-w-3xl text-4xl leading-tight font-medium sm:text-5xl">
              {document.title}
            </h1>

            <div className="mt-8 grid gap-5 text-body-lg leading-8 text-white/70 lg:grid-cols-2">
              {document.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="grid gap-x-12 lg:grid-cols-[260px_1fr]">
            {document.sections.map((section) => (
              <section
                key={section.heading}
                className="border-b border-white/10 py-9 lg:grid lg:grid-cols-subgrid lg:col-span-2"
              >
                <h2 className="text-xl text-white">{section.heading}</h2>

                <div className="mt-4 lg:mt-0">
                  {section.paragraphs?.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="mt-3 max-w-3xl text-body leading-7 text-white/65 first:mt-0"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {section.bullets ? (
                    <ul className="mt-4 flex max-w-3xl list-disc flex-col gap-2 pl-5 text-body leading-7 text-white/65">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
