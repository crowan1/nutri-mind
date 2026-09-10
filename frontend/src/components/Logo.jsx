import { Link } from 'react-router-dom'

import { routes } from '../routes'

export default function Logo({ wordmarkClassName = 'text-ink' }) {
  return (
    <Link to={routes.home} className="group flex items-center gap-2.5">
      {/* favicon.svg doubles as the tab icon and the logo: one source for both. */}
      <img
        src="/favicon.svg"
        alt=""
        width="28"
        height="28"
        className="size-7 transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110 motion-reduce:transition-none"
      />

      {/* The underline grows from the left like the ones on the nav links, and
          bg-current picks up whichever colour the wordmark is given: ink in the
          header, brand green in the footer. */}
      <span
        className={`relative text-lg font-bold tracking-tight after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 group-hover:after:scale-x-100 motion-reduce:after:transition-none ${wordmarkClassName}`}
      >
        Nutri&apos;Mind
      </span>
    </Link>
  )
}
