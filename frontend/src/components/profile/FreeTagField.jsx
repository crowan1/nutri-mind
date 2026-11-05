import { useRef, useState } from 'react'

// Open-ended list of words, unlike ChipGroup: what someone dislikes is not a
// closed vocabulary, so the entries are typed rather than picked.
const MAX_TAGS = 30

export default function FreeTagField({ label, placeholder, value, onChange }) {
  const tags = value ?? []
  const [draft, setDraft] = useState('')
  const [adding, setAdding] = useState(false)
  const inputRef = useRef(null)

  const commit = () => {
    const clean = draft.trim().toLowerCase()
    setDraft('')

    // Comparing on the cleaned form is what keeps "Olives" from landing next
    // to an "olives" already in the list.
    if (!clean || tags.includes(clean) || tags.length >= MAX_TAGS) {
      setAdding(false)
      return
    }

    onChange([...tags, clean])
    // The field stays open: adding dislikes is something people do in bursts.
    inputRef.current?.focus()
  }

  const remove = (tag) => onChange(tags.filter((item) => item !== tag))

  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex animate-pop-in items-center gap-1.5 rounded-full border border-brand bg-brand-soft py-2 pr-2 pl-4 text-xs font-medium text-brand motion-reduce:animate-none"
        >
          <span className="first-letter:uppercase">{tag}</span>
          <button
            type="button"
            onClick={() => remove(tag)}
            aria-label={`Retirer ${tag}`}
            className="flex size-4 items-center justify-center rounded-full text-sm leading-none text-brand/70 transition duration-200 hover:bg-brand hover:text-white motion-reduce:transition-none"
          >
            ×
          </button>
        </span>
      ))}

      {adding ? (
        <input
          ref={inputRef}
          autoFocus
          value={draft}
          placeholder={placeholder}
          maxLength={40}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commit}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              commit()
            }

            if (event.key === 'Escape') {
              setDraft('')
              setAdding(false)
            }
          }}
          className="w-40 rounded-full border border-brand bg-white px-4 py-2 text-xs text-ink outline-none focus:ring-2 focus:ring-brand/20"
        />
      ) : (
        <button
          type="button"
          onClick={() => setAdding(true)}
          disabled={tags.length >= MAX_TAGS}
          className="rounded-full border border-dashed border-line px-4 py-2 text-xs font-medium text-muted transition duration-200 hover:border-brand/50 hover:text-brand disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none"
        >
          Ajouter
        </button>
      )}
    </div>
  )
}
