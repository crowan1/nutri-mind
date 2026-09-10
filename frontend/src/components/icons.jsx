// Pictogrammes dessines a la main : pas la peine d'ajouter une dependance
// d'icones pour si peu. Grille 24x24, trait de 1.75, couleur heritee du
// parent via currentColor.
const strokeProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

// Refrigerateur : deux compartiments et leurs poignees.
export function FridgeIcon(props) {
  return (
    <svg {...strokeProps} {...props}>
      <rect x="5" y="2.5" width="14" height="19" rx="2.5" />
      {/* bouts droits : arrondis, les caps depasseraient du cadre */}
      <path d="M5 9.5h14" strokeLinecap="butt" />
      <path d="M8.5 5.5v2" />
      <path d="M8.5 12.5v3" />
    </svg>
  )
}

// Cocotte : couvercle, bouton et anses laterales.
export function PotIcon(props) {
  return (
    <svg {...strokeProps} {...props}>
      <path d="M12 6v3.5" />
      <path d="M3.5 9.5h17" />
      <path d="M5 9.5v5a3.5 3.5 0 0 0 3.5 3.5h7a3.5 3.5 0 0 0 3.5-3.5v-5" />
      <path d="M5 12H3" />
      <path d="M19 12h2" />
    </svg>
  )
}

// Calendrier coche : la semaine planifiee.
export function CalendarCheckIcon(props) {
  return (
    <svg {...strokeProps} {...props}>
      <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
      <path d="M3.5 9.5h17" strokeLinecap="butt" />
      <path d="M8 2.5V6" />
      <path d="M16 2.5V6" />
      <path d="m8.75 14.75 2.25 2.25 4.25-4.25" />
    </svg>
  )
}

// Horloge : une echeance qui approche.
export function ClockIcon(props) {
  return (
    <svg {...strokeProps} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.25 2" />
    </svg>
  )
}

// Feuille : le contour exact du logo de la marque, soit l'intersection de
// deux cercles de rayon 10.5 centres en (6.75, 6.75) et (17.25, 17.25),
// ramenee sur la grille 24. Pas de nervure centrale : la lentille ne fait
// que 6.2 unites d'epaisseur, un second trait la boucherait.
export function LeafIcon(props) {
  return (
    <svg {...strokeProps} {...props}>
      <path d="M6.75 17.25C12.5492 17.25 17.25 12.5492 17.25 6.75C11.4509 6.75 6.75 11.4509 6.75 17.25Z" />
    </svg>
  )
}
