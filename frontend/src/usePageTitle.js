import { useEffect } from 'react'

const NAME = "Nutri'Mind"
const HOME_TITLE = `${NAME} - Prêts à ne plus gaspiller ?`

// A single-page app never touches <title> on its own, so every route inherited
// the one written in index.html. That title is what the browser tab, the
// history entry, the bookmark and the search result all show, so each page
// states its own. Called with no argument, it restores the home title.
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} - ${NAME}` : HOME_TITLE
  }, [title])
}
