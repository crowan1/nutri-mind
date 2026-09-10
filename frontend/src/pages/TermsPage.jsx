import { Link } from 'react-router-dom'

import LegalLayout, { INLINE_LINK } from '../components/LegalLayout'
import { PUBLISHER } from '../legalEntity'
import { routes } from '../routes'

// Terms of use. Baseline text to be reviewed before going live, the liability
// and termination clauses in particular.

const INTRO =
  "Les règles qui encadrent l'utilisation du service Nutri'Mind, les engagements que nous prenons et ceux que vous prenez en créant un compte."

const sections = [
  {
    id: 'objet',
    title: 'Objet',
    blocks: [
      {
        p: "Les présentes conditions générales d'utilisation définissent les modalités d'accès et d'utilisation du site et de l'application Nutri'Mind, ainsi que les droits et obligations respectifs de l'éditeur et de l'utilisateur.",
      },
      {
        dl: [
          ['Éditeur du service', PUBLISHER.name],
          ['Contact', PUBLISHER.email],
        ],
      },
    ],
  },
  {
    id: 'acceptation',
    title: 'Acceptation des conditions',
    blocks: [
      {
        p: "La création d'un compte vaut acceptation pleine et entière des présentes conditions. Si vous n'en acceptez pas les termes, vous devez renoncer à utiliser le service.",
      },
      {
        p: "Nous vous invitons à conserver une copie de ces conditions, dont la version en vigueur est à tout moment consultable sur cette page.",
      },
    ],
  },
  {
    id: 'service',
    title: 'Description du service',
    blocks: [
      {
        p: "Nutri'Mind est un assistant de gestion des stocks alimentaires du foyer. Il permet de tenir l'inventaire de ses provisions, d'être alerté avant qu'un produit ne se périme, d'obtenir des suggestions de recettes à partir de ce qui reste et de préparer ses repas et ses courses.",
      },
      {
        p: "Les suggestions de recettes et les alertes de péremption sont fournies à titre indicatif. Elles ne remplacent ni votre propre jugement sur la comestibilité d'un produit, ni les dates figurant sur son emballage, ni l'avis d'un professionnel de santé pour toute question diététique ou médicale.",
      },
    ],
  },
  {
    id: 'compte',
    title: 'Compte utilisateur',
    blocks: [
      {
        p: "L'accès aux fonctionnalités du service suppose la création d'un compte. Vous vous engagez à fournir des informations exactes et à les maintenir à jour.",
      },
      {
        ul: [
          "Le compte est personnel : vos identifiants ne doivent pas être partagés avec un tiers.",
          "Vous êtes responsable de la confidentialité de votre mot de passe et des actions effectuées depuis votre compte.",
          "Toute utilisation non autorisée de votre compte doit nous être signalée sans délai.",
          "Un même utilisateur ne peut détenir plusieurs comptes sans notre accord.",
        ],
      },
      {
        p: "Vous pouvez supprimer votre compte à tout moment depuis les réglages du service. La suppression entraîne l'effacement de vos données dans les conditions prévues par la politique de confidentialité.",
      },
    ],
  },
  {
    id: 'obligations',
    title: "Obligations de l'utilisateur",
    blocks: [
      {
        p: 'En utilisant le service, vous vous engagez à ne pas :',
      },
      {
        ul: [
          "porter atteinte au fonctionnement du service, tenter d'y accéder par des moyens non prévus ou en contourner les limitations techniques ;",
          "extraire ou réutiliser de manière massive et automatisée le contenu du service ;",
          "publier ou transmettre un contenu illicite, diffamatoire, haineux, ou portant atteinte aux droits d'un tiers ;",
          "usurper l'identité d'un tiers ou porter atteinte à la vie privée d'autrui ;",
          "utiliser le service à des fins commerciales sans notre accord écrit préalable.",
        ],
      },
    ],
  },
  {
    id: 'contenus',
    title: 'Vos contenus',
    blocks: [
      {
        p: "Les données que vous saisissez, notamment votre inventaire et vos recettes personnelles, vous appartiennent. Vous nous accordez uniquement le droit de les héberger et de les traiter dans la mesure nécessaire au fonctionnement du service.",
      },
      {
        p: "Vous restez responsable de l'exactitude et de la licéité des contenus que vous saisissez. Nous nous réservons la possibilité de retirer un contenu manifestement illicite qui nous serait signalé.",
      },
    ],
  },
  {
    id: 'disponibilite',
    title: 'Disponibilité et évolutions du service',
    blocks: [
      {
        p: "Nous nous efforçons d'assurer l'accessibilité du service en continu, sans pouvoir la garantir : une interruption peut survenir pour maintenance, mise à jour, incident technique ou fait d'un tiers, notamment de l'hébergeur.",
      },
      {
        p: "Le service évolue régulièrement. Nous pouvons ajouter, modifier ou retirer des fonctionnalités. Le retrait d'une fonctionnalité importante vous sera annoncé dans un délai raisonnable, avec la possibilité d'exporter vos données.",
      },
    ],
  },
  {
    id: 'propriete',
    title: 'Propriété intellectuelle',
    blocks: [
      {
        jsx: (
          <p>
            Le service, son interface, son code, ses textes et ses éléments graphiques restent la
            propriété de l&apos;éditeur. L&apos;accès au service vous confère un droit d&apos;usage
            personnel, non exclusif et non cessible, pour la durée de votre inscription, à
            l&apos;exclusion de tout autre droit. Les précisions figurent dans les{' '}
            <Link to={routes.legal} className={INLINE_LINK}>
              mentions légales
            </Link>
            .
          </p>
        ),
      },
    ],
  },
  {
    id: 'responsabilite',
    title: 'Responsabilité',
    blocks: [
      {
        p: "Nous sommes tenus d'une obligation de moyens dans la fourniture du service. Notre responsabilité ne peut être engagée qu'en cas de faute prouvée et pour les dommages directs et prévisibles qui en résulteraient.",
      },
      {
        p: "Nous ne saurions être tenus responsables des conséquences d'une information erronée que vous auriez saisie, d'une décision prise sur la seule base d'une suggestion du service, de la consommation d'un produit périmé, ni d'une perte de données imputable à votre terminal ou à votre connexion.",
      },
      {
        p: "Aucune des présentes stipulations n'a pour effet d'écarter les droits que la loi reconnaît impérativement au consommateur.",
      },
    ],
  },
  {
    id: 'suspension',
    title: 'Suspension et résiliation',
    blocks: [
      {
        p: "En cas de manquement grave ou répété aux présentes conditions, nous pouvons suspendre l'accès à votre compte après vous en avoir informé et vous avoir laissé la possibilité de vous expliquer, sauf urgence tenant à la sécurité du service ou à la protection des tiers.",
      },
      {
        p: "Si le manquement persiste, le compte peut être résilié. Vous disposez alors d'un délai de trente jours pour demander l'export de vos données avant leur suppression.",
      },
    ],
  },
  {
    id: 'donnees',
    title: 'Données personnelles',
    blocks: [
      {
        jsx: (
          <p>
            Le traitement de vos données personnelles est décrit dans notre{' '}
            <Link to={routes.privacy} className={INLINE_LINK}>
              politique de confidentialité
            </Link>
            , qui fait partie intégrante des présentes conditions.
          </p>
        ),
      },
    ],
  },
  {
    id: 'modification',
    title: 'Modification des conditions',
    blocks: [
      {
        p: "Nous pouvons modifier les présentes conditions pour tenir compte d'une évolution du service ou de la réglementation. Toute modification substantielle vous sera notifiée au moins trente jours avant son entrée en vigueur.",
      },
      {
        p: "Si vous n'acceptez pas les nouvelles conditions, vous pouvez supprimer votre compte avant cette date. La poursuite de l'utilisation du service après l'entrée en vigueur vaut acceptation.",
      },
    ],
  },
  {
    id: 'droit',
    title: 'Droit applicable et règlement des litiges',
    blocks: [
      {
        p: "Les présentes conditions sont soumises au droit français.",
      },
      {
        jsx: (
          <p>
            En cas de différend, nous vous invitons à nous contacter en premier lieu afin de
            rechercher une solution amiable. À défaut d&apos;accord, un consommateur peut recourir
            gratuitement à un médiateur de la consommation, dont les coordonnées seront
            communiquées sur demande, ou saisir la plateforme européenne de règlement en ligne des
            litiges sur{' '}
            <a
              href="https://consumer-redress.ec.europa.eu"
              target="_blank"
              rel="noreferrer"
              className={INLINE_LINK}
            >
              le site de la Commission européenne
            </a>
            . À défaut de résolution amiable, les tribunaux français sont compétents.
          </p>
        ),
      },
    ],
  },
]

export default function TermsPage() {
  return (
    <LegalLayout
      eyebrow="Conditions"
      title="Conditions générales d'utilisation"
      intro={INTRO}
      sections={sections}
    />
  )
}
