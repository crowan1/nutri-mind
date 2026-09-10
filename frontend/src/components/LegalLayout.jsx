import { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { LAST_UPDATED, PLACEHOLDER } from '../legalEntity'
import { routes } from '../routes'
import usePageTitle from '../usePageTitle'
import Eyebrow from './Eyebrow'
import Reveal from './Reveal'

// Inline link style, shared by the three documents.
export const INLINE_LINK =
  'text-brand underline decoration-brand/30 underline-offset-2 transition-colors hover:decoration-brand'

const LEGAL_DOCUMENTS = [
  { label: 'Mentions légales', to: routes.legal },
  { label: 'Politique de confidentialité', to: routes.privacy },
  { label: "Conditions générales d'utilisation", to: routes.terms },
]

// Sections describe their content as an ordered list of blocks: { p } for a
// paragraph, { ul } for a bullet list, { dl } for label / value pairs, and
// { jsx } for the rare case of a link mid-sentence. Prose therefore stays in
// plain JS strings, apostrophes and all, as on the rest of the site.
function Block({ block }) {
  if (block.p) return <p>{block.p}</p>

  if (block.ul) {
    return (
      <ul className="list-disc space-y-2 pl-5">
        {block.ul.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )
  }

  if (block.dl) {
    return (
      <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]">
        {block.dl.map(([label, value]) => (
          <Fragment key={label}>
            <dt className="font-medium text-ink">{label}</dt>
            {/* Stacked on mobile: tighten the value under its label so the
                pair reads as one block. */}
            <dd className="-mt-2 sm:mt-0">
              {value === PLACEHOLDER ? (
                <span className="font-medium text-danger">{value}</span>
              ) : (
                value
              )}
            </dd>
          </Fragment>
        ))}
      </dl>
    )
  }

  return block.jsx
}

// Shared chrome for the legal pages: header, anchored table of contents,
// dense body copy and cross-links to the other two documents. Pages supply
// only their sections, so they cannot drift apart.
export default function LegalLayout({ eyebrow, title, intro, sections }) {
  const { pathname } = useLocation()
  usePageTitle(title)

  const otherDocuments = LEGAL_DOCUMENTS.filter(({ to }) => to !== pathname)

  return (
    <>
      <section className="border-b border-line px-6 py-16 text-center sm:px-10 sm:py-20 lg:px-16">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>

        <Reveal
          as="h1"
          delay={80}
          className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl"
        >
          {title}
        </Reveal>

        <Reveal
          as="p"
          delay={160}
          className="mx-auto mt-6 max-w-2xl leading-relaxed text-muted"
        >
          {intro}
        </Reveal>

        <Reveal as="p" delay={240} className="mt-8 text-xs text-muted">
          Dernière mise à jour : {LAST_UPDATED}
        </Reveal>
      </section>

      {/* From lg up, the table of contents becomes a sticky side column and the
          body copy takes every remaining pixel. No inner cap: the padding here
          is the one every other section uses, so both edges line up with the
          wordmark in the header and the pages read as one grid. */}
      <section className="px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <div className="lg:grid lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:items-start lg:gap-16">
          <Reveal
            as="nav"
            aria-label="Sommaire"
            className="rounded-xl bg-white p-6 ring-1 ring-line/70 sm:p-7 lg:sticky lg:top-8 lg:max-h-[calc(100svh-4rem)] lg:overflow-y-auto"
          >
            <h2 className="text-sm font-semibold text-ink">Sommaire</h2>

            <ol className="mt-4 space-y-2.5 text-sm">
              {sections.map(({ id, title: sectionTitle }, index) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="text-muted transition-colors hover:text-brand"
                  >
                    <span className="text-brand">{index + 1}.</span> {sectionTitle}
                  </a>
                </li>
              ))}
            </ol>
          </Reveal>

          <div className="mt-14 lg:mt-0">
            <div className="space-y-12">
              {sections.map(({ id, title: sectionTitle, blocks }, index) => (
                // scroll-mt-8 keeps the heading off the viewport edge after
                // a jump from the table of contents.
                <Reveal as="section" key={id} id={id} className="scroll-mt-8">
                  <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                    <span className="text-brand">{index + 1}.</span> {sectionTitle}
                  </h2>

                  <div className="mt-5 space-y-4 leading-relaxed text-muted">
                    {blocks.map((block, blockIndex) => (
                      <Block key={blockIndex} block={block} />
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-16 rounded-xl bg-mint p-6 ring-1 ring-line/70 sm:p-7">
              <h2 className="text-sm font-semibold text-ink">Documents liés</h2>

              <ul className="mt-4 space-y-2.5 text-sm">
                {otherDocuments.map(({ label, to }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="inline-block text-muted transition duration-200 hover:translate-x-0.5 hover:text-brand motion-reduce:transition-none"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
