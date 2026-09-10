import { Link } from 'react-router-dom'

import LegalLayout, { INLINE_LINK } from '../components/LegalLayout'
import { PUBLISHER } from '../legalEntity'
import { routes } from '../routes'

// Privacy policy. Baseline GDPR text, to be reviewed before going live: the
// processing described here has to match what the service actually does.

const INTRO =
  "Comment Nutri'Mind collecte, utilise et protège vos données personnelles, et comment exercer vos droits sur celles-ci."

const sections = [
  {
    id: 'responsable',
    title: 'Responsable du traitement',
    blocks: [
      {
        p: "Le responsable du traitement de vos données personnelles est l'éditeur du site, dont les coordonnées complètes figurent dans les mentions légales.",
      },
      {
        dl: [
          ['Responsable du traitement', PUBLISHER.name],
          ['Siège social', PUBLISHER.registeredOffice],
          ['Contact', PUBLISHER.email],
          ['Délégué à la protection des données', PUBLISHER.dataProtectionOfficer],
        ],
      },
    ],
  },
  {
    id: 'donnees',
    title: 'Données que nous collectons',
    blocks: [
      {
        p: "Nous appliquons le principe de minimisation : nous ne collectons que ce qui est nécessaire au fonctionnement du service. Les données collectées se répartissent en quatre catégories.",
      },
      {
        ul: [
          "Données de compte : adresse électronique, mot de passe chiffré et, si vous choisissez de les renseigner, prénom et préférences alimentaires.",
          "Données que vous saisissez : contenu de votre inventaire, dates de péremption, recettes enregistrées, listes de courses et planning de repas.",
          "Données d'usage : pages consultées, fonctionnalités utilisées et interactions avec le service, sous forme agrégée, pour comprendre ce qui est utile et ce qui ne l'est pas.",
          "Données techniques : adresse IP, type de navigateur et de terminal, journaux de connexion, nécessaires à la sécurité et au bon acheminement des pages.",
        ],
      },
      {
        p: "Nous ne collectons pas de données de santé. Les préférences et restrictions alimentaires que vous renseignez servent uniquement à filtrer les suggestions de recettes et ne font l'objet d'aucun autre usage.",
      },
    ],
  },
  {
    id: 'finalites',
    title: 'Finalités et bases légales',
    blocks: [
      {
        p: "Chaque traitement répond à une finalité précise et repose sur une base légale identifiée au sens du règlement général sur la protection des données.",
      },
      {
        dl: [
          [
            'Fournir le service',
            "Gestion de votre compte, de votre inventaire et des suggestions de recettes. Base légale : exécution du contrat qui nous lie.",
          ],
          [
            'Sécurité du service',
            "Prévention des accès frauduleux, journalisation, sauvegardes. Base légale : intérêt légitime.",
          ],
          [
            'Amélioration du service',
            "Mesure d'audience et analyse des usages, sous forme agrégée. Base légale : votre consentement, révocable à tout moment.",
          ],
          [
            'Communications',
            "Messages liés au fonctionnement du service, et lettre d'information si vous y avez souscrit. Base légale : exécution du contrat pour les premiers, consentement pour la seconde.",
          ],
          [
            'Obligations légales',
            "Conservation des pièces comptables et réponse aux demandes des autorités. Base légale : obligation légale.",
          ],
        ],
      },
      {
        p: "Vos données ne sont ni vendues, ni louées, ni cédées à des tiers à des fins publicitaires.",
      },
    ],
  },
  {
    id: 'destinataires',
    title: 'Destinataires et sous-traitants',
    blocks: [
      {
        p: "Vos données sont accessibles aux personnes habilitées au sein de notre équipe, dans la limite de ce que nécessite leur mission. Elles peuvent également être traitées par des prestataires techniques agissant sur nos instructions, encadrés par un contrat conforme à l'article 28 du règlement général sur la protection des données.",
      },
      {
        ul: [
          "Hébergement et sauvegarde de l'application et de la base de données.",
          "Envoi des courriers électroniques liés au service.",
          "Mesure d'audience, si vous y avez consenti.",
        ],
      },
      {
        p: "La liste nominative de ces prestataires, ainsi que leur pays d'établissement, peut être obtenue sur simple demande à l'adresse de contact indiquée plus haut.",
      },
    ],
  },
  {
    id: 'conservation',
    title: 'Durées de conservation',
    blocks: [
      {
        p: "Nous ne conservons vos données que le temps nécessaire aux finalités décrites ci-dessus.",
      },
      {
        dl: [
          ['Données de compte', "Toute la durée de vie du compte, puis douze mois après sa suppression pour permettre une réactivation."],
          ['Contenu de votre inventaire', 'Supprimé avec le compte, sans délai de rétention.'],
          ["Données d'usage", 'Vingt-cinq mois au maximum, sous forme agrégée.'],
          ['Journaux techniques', 'Douze mois.'],
          ['Pièces comptables', 'Dix ans, conformément aux obligations légales.'],
        ],
      },
      {
        p: "Un compte resté inactif pendant trois ans fait l'objet d'un message d'avertissement, puis d'une suppression si vous n'y donnez pas suite.",
      },
    ],
  },
  {
    id: 'transferts',
    title: "Transferts hors de l'Union européenne",
    blocks: [
      {
        p: "Nous privilégions des prestataires établis dans l'Union européenne. Lorsqu'un transfert hors de l'Union est inévitable, il n'a lieu que vers un pays reconnu comme offrant un niveau de protection adéquat par la Commission européenne, ou sous couvert de clauses contractuelles types accompagnées des mesures techniques complémentaires nécessaires.",
      },
    ],
  },
  {
    id: 'securite',
    title: 'Sécurité',
    blocks: [
      {
        p: "Nous mettons en oeuvre des mesures techniques et organisationnelles adaptées au risque : chiffrement des échanges, mots de passe stockés sous forme de condensats non réversibles, accès aux données restreint et journalisé, sauvegardes régulières et cloisonnement des environnements.",
      },
      {
        p: "En cas de violation de données susceptible d'engendrer un risque élevé pour vos droits et libertés, nous vous en informerons dans les meilleurs délais et notifierons l'autorité de contrôle dans les soixante-douze heures.",
      },
    ],
  },
  {
    id: 'droits',
    title: 'Vos droits',
    blocks: [
      {
        p: 'Vous disposez, sur les données qui vous concernent, des droits suivants :',
      },
      {
        ul: [
          "Droit d'accès : obtenir la confirmation que vos données sont traitées et en recevoir une copie.",
          'Droit de rectification : faire corriger une donnée inexacte ou incomplète.',
          "Droit à l'effacement : demander la suppression de vos données, dans les limites de nos obligations légales.",
          'Droit à la limitation : demander le gel temporaire du traitement, le temps par exemple de contester une donnée.',
          "Droit d'opposition : vous opposer à un traitement fondé sur notre intérêt légitime.",
          'Droit à la portabilité : récupérer vos données dans un format structuré et lisible par machine.',
          'Droit de retirer votre consentement : à tout moment, pour les traitements qui en dépendent.',
        ],
      },
      {
        jsx: (
          <p>
            Ces droits s&apos;exercent auprès de l&apos;adresse de contact indiquée à la section 1.
            Nous répondons dans un délai d&apos;un mois, porté à trois mois pour les demandes
            complexes. Si la réponse ne vous satisfait pas, vous pouvez adresser une réclamation à
            la Commission nationale de l&apos;informatique et des libertés, sur{' '}
            <a href="https://www.cnil.fr" target="_blank" rel="noreferrer" className={INLINE_LINK}>
              cnil.fr
            </a>
            .
          </p>
        ),
      },
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies et traceurs',
    blocks: [
      {
        p: "Les cookies strictement nécessaires au fonctionnement du site, notamment celui qui maintient votre session ouverte, sont déposés sans votre consentement : le service ne peut pas fonctionner sans eux.",
      },
      {
        p: "Tout autre traceur, en particulier ceux servant à la mesure d'audience, n'est déposé qu'après votre accord et peut être refusé sans que cela dégrade votre usage du service. Votre choix est conservé six mois et peut être modifié à tout moment.",
      },
      {
        p: "Vous pouvez également configurer votre navigateur pour bloquer les cookies ou les supprimer. Le blocage des cookies nécessaires vous empêchera toutefois de rester connecté.",
      },
    ],
  },
  {
    id: 'mineurs',
    title: 'Mineurs',
    blocks: [
      {
        p: "Le service n'est pas destiné aux personnes de moins de quinze ans. Si un compte a été créé par un mineur de moins de quinze ans sans l'accord du titulaire de l'autorité parentale, nous procéderons à sa suppression dès que nous en serons informés.",
      },
    ],
  },
  {
    id: 'modifications',
    title: 'Modifications de cette politique',
    blocks: [
      {
        jsx: (
          <p>
            Cette politique peut évoluer avec le service ou la réglementation. La date de dernière
            mise à jour figure en haut de cette page. En cas de modification substantielle, nous
            vous en informerons par courrier électronique ou par un message dans l&apos;application
            avant son entrée en vigueur. Les conditions d&apos;utilisation du service sont
            détaillées dans nos{' '}
            <Link to={routes.terms} className={INLINE_LINK}>
              conditions générales
            </Link>
            .
          </p>
        ),
      },
    ],
  },
]

export default function PrivacyPage() {
  return (
    <LegalLayout
      eyebrow="Vos données"
      title="Politique de confidentialité"
      intro={INTRO}
      sections={sections}
    />
  )
}
