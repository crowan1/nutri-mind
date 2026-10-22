// Routes de l'application : les chemins sont en anglais, les libelles affiches
// restent en francais.
export const routes = {
  home: '/',
  about: '/about',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  dashboard: '/dashboard',

  // Produit
  features: '/features',
  inventory: '/inventory',
  recipes: '/recipes',
  recipeDetail: '/recipes/:id',
  pricing: '/pricing',

  // Ressources
  blog: '/blog',
  gettingStarted: '/getting-started',
  help: '/help',
  community: '/community',

  // Entreprise
  mission: '/mission',
  contact: '/contact',
  legal: '/legal',

  // Mentions
  privacy: '/privacy',
  terms: '/terms',
}

// Parameterised paths are declared as patterns above so <Route> can match
// them; links go through a builder rather than concatenating the id by hand.
export const recipePath = (id) => `/recipes/${id}`
