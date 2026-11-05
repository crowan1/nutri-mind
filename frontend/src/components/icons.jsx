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

// Head and shoulders: the account's identity card.
export function UserIcon(props) {
  return (
    <svg {...strokeProps} {...props}>
      <circle cx="12" cy="8" r="3.75" />
      <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" />
    </svg>
  )
}

// Bathroom scale seen from above: the dial and its needle.
export function ScaleIcon(props) {
  return (
    <svg {...strokeProps} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <path d="M8.5 15a4 4 0 1 1 7 0" />
      <path d="m12 15 2.5-3.5" />
    </svg>
  )
}

// Warning triangle: the allergens to keep out.
export function AlertIcon(props) {
  return (
    <svg {...strokeProps} {...props}>
      <path d="M12 3.75 21 19.5H3z" />
      <path d="M12 9.5v4" />
      <path d="M12 16.75h.01" />
    </svg>
  )
}

// Target: what the user is aiming for.
export function TargetIcon(props) {
  return (
    <svg {...strokeProps} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.75" fill="currentColor" />
    </svg>
  )
}

// Oven: the control strip, its dial and the door handle.
export function OvenIcon(props) {
  return (
    <svg {...strokeProps} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <path d="M3.5 8.5h17" strokeLinecap="butt" />
      <path d="M6.5 11.5h11" />
      <circle cx="7" cy="6" r="0.75" fill="currentColor" />
    </svg>
  )
}

// House: the household and its habits.
export function HomeIcon(props) {
  return (
    <svg {...strokeProps} {...props}>
      <path d="M4 10.5 12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19z" />
      <path d="M9.75 20.5v-6h4.5v6" />
    </svg>
  )
}

// Crossed circle: what should never reach the plate.
export function BanIcon(props) {
  return (
    <svg {...strokeProps} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m6 18 12-12" />
    </svg>
  )
}

// Bell: the notifications.
export function BellIcon(props) {
  return (
    <svg {...strokeProps} {...props}>
      <path d="M6.5 10a5.5 5.5 0 0 1 11 0c0 3.5 1.25 5 1.75 5.5h-14.5C5.25 15 6.5 13.5 6.5 10Z" />
      <path d="M10.25 18.5a2 2 0 0 0 3.5 0" />
    </svg>
  )
}

// Cup: milestones reached and badges unlocked.
export function TrophyIcon(props) {
  return (
    <svg {...strokeProps} {...props}>
      <path d="M7.5 3.5h9v5a4.5 4.5 0 0 1-9 0z" />
      <path d="M7.5 5.5H5a2 2 0 0 0 2.5 3" />
      <path d="M16.5 5.5H19a2 2 0 0 1-2.5 3" />
      <path d="M12 13v3.5" />
      <path d="M8.5 20.5h7l-.75-4h-5.5z" />
    </svg>
  )
}

// Coin: the euros a saved product did not cost.
export function CoinIcon(props) {
  return (
    <svg {...strokeProps} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M14.75 9.25A3.25 3.25 0 0 0 9.5 11.75v.5a3.25 3.25 0 0 0 5.25 2.5" />
      <path d="M8.5 11h5" />
      <path d="M8.5 13h5" />
    </svg>
  )
}

// Flame: a streak still running. One outline and no inner tongue — at the
// 20px the badges render it at, a second shape turns into a smudge.
export function FlameIcon(props) {
  return (
    <svg {...strokeProps} {...props}>
      <path d="M12.5 2.5c.4 2.4 1.6 4 3.2 5.6 1.5 1.5 2.3 3.2 2.3 5.1a6 6 0 0 1-12 0c0-1.5.5-2.9 1.6-4.2.2 1.4.9 2.2 1.8 2.2 1.2 0 1.9-1.2 1.9-3.3 0-1.9.4-3.7 1.2-5.4Z" />
    </svg>
  )
}

// Globe: the CO₂ kept out of the air.
export function GlobeIcon(props) {
  return (
    <svg {...strokeProps} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" strokeLinecap="butt" />
      <path d="M12 3.5c2.25 2.3 3.4 5.1 3.4 8.5s-1.15 6.2-3.4 8.5c-2.25-2.3-3.4-5.1-3.4-8.5S9.75 5.8 12 3.5Z" />
    </svg>
  )
}

// Heart: eating better for its own sake.
export function HeartIcon(props) {
  return (
    <svg {...strokeProps} {...props}>
      <path d="M12 20s-6.75-4.4-6.75-9.25a3.75 3.75 0 0 1 6.75-2.3 3.75 3.75 0 0 1 6.75 2.3C18.75 15.6 12 20 12 20Z" />
    </svg>
  )
}

// Dumbbell: the protein end of the goals.
export function DumbbellIcon(props) {
  return (
    <svg {...strokeProps} {...props}>
      <path d="M4 9.5v5" />
      <path d="M7.5 6.5v11" />
      <path d="M7.5 12h9" />
      <path d="M16.5 6.5v11" />
      <path d="M20 9.5v5" />
    </svg>
  )
}

// Microwave: door on the left, control panel on the right.
export function MicrowaveIcon(props) {
  return (
    <svg {...strokeProps} {...props}>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <rect x="5" y="8" width="10" height="8" rx="1.5" />
      <circle cx="18.25" cy="9" r="0.75" fill="currentColor" stroke="none" />
      <path d="M17.25 13h2" />
      <path d="M17.25 15.5h2" />
    </svg>
  )
}

// Hob seen from above: four burners.
export function StoveIcon(props) {
  return (
    <svg {...strokeProps} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <circle cx="9" cy="9" r="2.25" />
      <circle cx="15" cy="9" r="2.25" />
      <circle cx="9" cy="15" r="2.25" />
      <circle cx="15" cy="15" r="2.25" />
    </svg>
  )
}

// Blender: the tapered jar on its base.
export function BlenderIcon(props) {
  return (
    <svg {...strokeProps} {...props}>
      <path d="M7 3h10l-1.3 12.6a1.5 1.5 0 0 1-1.5 1.4h-4.4a1.5 1.5 0 0 1-1.5-1.4z" />
      <path d="M8.5 19.5h7" />
      <path d="M9 21.5h6" />
    </svg>
  )
}

// Stand mixer, drawn as two beaters over a bowl: the machine's own silhouette
// turns to a blob at the 20px these tiles render at, so the icon names what it
// does instead of what it looks like.
export function StandMixerIcon(props) {
  return (
    <svg {...strokeProps} {...props}>
      <path d="M4.5 11h15l-1.5 7a3.5 3.5 0 0 1-3.45 2.8H9.45A3.5 3.5 0 0 1 6 18z" />
      <path d="M9.5 8.5V3.5" />
      <path d="M14.5 8.5V3.5" />
      <path d="M8.25 3.5h2.5" />
      <path d="M13.25 3.5h2.5" />
    </svg>
  )
}

// Air fryer: the drawer handle and the dial.
export function AirFryerIcon(props) {
  return (
    <svg {...strokeProps} {...props}>
      <rect x="4.5" y="3" width="15" height="18" rx="3.5" />
      <circle cx="12" cy="8" r="2.5" />
      <path d="M4.5 14h15" strokeLinecap="butt" />
      <path d="M9.5 17.5h5" />
    </svg>
  )
}

// Steamer: the same pot as the pressure cooker, but giving off steam — which
// is the only thing that tells the two apart at this size.
export function SteamerIcon(props) {
  return (
    <svg {...strokeProps} {...props}>
      <path d="M3.5 11.5h17" strokeLinecap="butt" />
      <path d="M5 11.5v4.5a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4v-4.5" />
      <path d="M9 8.5c0-1.25 1-1.5 1-2.75S9 3.5 9 3.5" />
      <path d="M14 8.5c0-1.25 1-1.5 1-2.75s-1-2.25-1-2.25" />
    </svg>
  )
}

// Toaster: the bread slot and the lever on the side.
export function ToasterIcon(props) {
  return (
    <svg {...strokeProps} {...props}>
      <rect x="2.5" y="8" width="16" height="11" rx="3" />
      <path d="M6.5 11.5h8" />
      <path d="M18.5 12.5h3" />
      <circle cx="15.5" cy="15.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  )
}

// Kettle: spout, handle and body.
export function KettleIcon(props) {
  return (
    <svg {...strokeProps} {...props}>
      <path d="M7 10h8a3.5 3.5 0 0 1 3.5 3.5v4a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-4A3.5 3.5 0 0 1 7 10Z" />
      <path d="M5 13 1.5 9.5 5 8" />
      <path d="M9.5 10V7.5h5V10" />
      <path d="M11 5.5h2" />
    </svg>
  )
}

// Cup and saucer: the coffee machine, named by what it produces — a drawing
// of the machine itself would be a box like three of its neighbours.
export function CoffeeIcon(props) {
  return (
    <svg {...strokeProps} {...props}>
      <path d="M4.5 9.5h11.5v4.75a4.5 4.5 0 0 1-4.5 4.5H9a4.5 4.5 0 0 1-4.5-4.5z" />
      <path d="M16 11h1.75a2.5 2.5 0 0 1 0 5H16" />
      <path d="M3 21.5h15" />
      <path d="M8.5 6.5c0-1 .75-1.25.75-2.25" />
      <path d="M12 6.5c0-1 .75-1.25.75-2.25" />
    </svg>
  )
}

// Frying pan from the side rather than from above: a circle with a stick on
// it reads as a magnifying glass, a shallow body with a long handle does not.
export function PanIcon(props) {
  return (
    <svg {...strokeProps} {...props}>
      <path d="M2.5 9.5h12v2.5a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5z" />
      <path d="m14.5 10.25 6.5-1.75" />
    </svg>
  )
}
