import { Link } from 'react-router-dom'

import LegalLayout, { INLINE_LINK } from '../components/LegalLayout'
import { PUBLISHER } from '../legalEntity'
import { routes } from '../routes'

// Legal notice. Baseline text following article 6-III of the French LCEN,
// to be reviewed by a lawyer before going live.

const INTRO =
  "Informations relatives à l'éditeur de ce site, à son hébergement et aux conditions de réutilisation de son contenu."

const sections = [
  {
    id: 'editeur',
    title: 'Éditeur du site',
    blocks: [
      {
        p: "Le présent site est édité par l'entité dont les coordonnées figurent ci-dessous, désignée dans l'ensemble des documents légaux du site sous le nom Nutri'Mind.",
      },
      {
        dl: [
          ['Raison sociale', PUBLISHER.name],
          ['Forme juridique', PUBLISHER.legalForm],
          ['Capital social', PUBLISHER.shareCapital],
          ['Siège social', PUBLISHER.registeredOffice],
          ['Immatriculation (RCS / SIREN)', PUBLISHER.registrationNumber],
          ['TVA intracommunautaire', PUBLISHER.vatNumber],
          ['Adresse électronique', PUBLISHER.email],
          ['Téléphone', PUBLISHER.phone],
        ],
      },
    ],
  },
  {
    id: 'publication',
    title: 'Responsable de la publication',
    blocks: [
      { dl: [['Responsable de la publication', PUBLISHER.publicationManager]] },
      {
        p: "Toute demande relative au contenu éditorial du site peut être adressée au responsable de la publication, à l'adresse électronique indiquée ci-dessus.",
      },
    ],
  },
  {
    id: 'hebergement',
    title: 'Hébergement',
    blocks: [
      { p: 'Le site est hébergé par :' },
      {
        dl: [
          ['Hébergeur', PUBLISHER.host],
          ['Adresse', PUBLISHER.hostAddress],
          ['Téléphone', PUBLISHER.hostPhone],
        ],
      },
    ],
  },
  {
    id: 'propriete',
    title: 'Propriété intellectuelle',
    blocks: [
      {
        p: "La structure générale du site, ainsi que les textes, illustrations, logos et éléments graphiques qui le composent, sont la propriété de Nutri'Mind ou de ses partenaires, et sont protégés par le droit d'auteur et le droit des marques.",
      },
      {
        p: "Toute reproduction, représentation, adaptation ou exploitation, totale ou partielle, de ces éléments, par quelque procédé que ce soit et sur quelque support que ce soit, est interdite sans autorisation écrite préalable. Le nom et le logo Nutri'Mind ne peuvent être utilisés sans cette autorisation.",
      },
      {
        p: "La citation de courts extraits est admise dans les conditions prévues par la loi, à condition d'indiquer clairement la source et d'accompagner la citation d'un lien vers la page d'origine.",
      },
    ],
  },
  {
    id: 'credits',
    title: 'Crédits et ressources tierces',
    blocks: [
      { p: 'Le site s\'appuie sur les ressources suivantes :' },
      {
        jsx: (
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Photographie de la page d&apos;accueil :{' '}
              <a
                href="https://unsplash.com/photos/a-bowl-of-food-with-a-variety-of-vegetables"
                target="_blank"
                rel="noreferrer"
                className={INLINE_LINK}
              >
                Unsplash
              </a>
              , sous licence libre ne requérant pas d&apos;attribution.
            </li>
            <li>
              Interface développée avec React et Tailwind CSS, distribués sous licence MIT.
            </li>
            <li>
              Pictogrammes et logo dessinés spécifiquement pour Nutri&apos;Mind.
            </li>
          </ul>
        ),
      },
    ],
  },
  {
    id: 'liens',
    title: 'Liens hypertextes',
    blocks: [
      {
        p: "Le site peut contenir des liens vers des sites tiers. Ces sites ne sont pas édités par Nutri'Mind, qui n'exerce aucun contrôle sur leur contenu et ne saurait en être tenue responsable.",
      },
      {
        p: "La mise en place d'un lien vers le site est libre, à condition qu'il ouvre la page dans une nouvelle fenêtre ou un nouvel onglet, qu'il n'utilise pas la technique de l'inclusion en cadre et qu'il ne présente pas Nutri'Mind sous un jour trompeur ou dénigrant.",
      },
    ],
  },
  {
    id: 'donnees',
    title: 'Données personnelles et cookies',
    blocks: [
      {
        jsx: (
          <p>
            Le traitement des données personnelles des visiteurs et des utilisateurs, ainsi que
            l&apos;usage des cookies, sont détaillés dans notre{' '}
            <Link
              to={routes.privacy}
              className={INLINE_LINK}
            >
              politique de confidentialité
            </Link>
            . Les conditions d&apos;utilisation du service font l&apos;objet de{' '}
            <Link
              to={routes.terms}
              className={INLINE_LINK}
            >
              conditions générales
            </Link>{' '}
            distinctes.
          </p>
        ),
      },
    ],
  },
  {
    id: 'droit',
    title: 'Droit applicable',
    blocks: [
      {
        p: "Le présent site et les présentes mentions légales sont soumis au droit français. En cas de litige, et à défaut de résolution amiable, les tribunaux français sont seuls compétents.",
      },
    ],
  },
]

export default function LegalPage() {
  return (
    <LegalLayout
      eyebrow="Informations légales"
      title="Mentions légales"
      intro={INTRO}
      sections={sections}
    />
  )
}
