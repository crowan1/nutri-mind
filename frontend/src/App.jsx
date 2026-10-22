import { Route, Routes } from 'react-router-dom'

import AppLayout from './components/AppLayout'
import { GuestRoute, ProtectedRoute } from './components/AuthRoute'
import Layout from './components/Layout'
import Preloader from './components/Preloader'
import { useAuth } from './context/AuthContext'
import AboutPage from './pages/AboutPage'
import ComingSoonPage from './pages/ComingSoonPage'
import DashboardPage from './pages/DashboardPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import HomePage from './pages/HomePage'
import LegalPage from './pages/LegalPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import PrivacyPage from './pages/PrivacyPage'
import RecipeDetailPage from './pages/RecipeDetailPage'
import RecipesPage from './pages/RecipesPage'
import RegisterPage from './pages/RegisterPage'
import TermsPage from './pages/TermsPage'
import { routes } from './routes'

export default function App() {
  const { loading } = useAuth()

  return (
    <>
      {/* Sits above the whole router so the app can mount underneath while it
          is still covering the screen. */}
      <Preloader />

      {/* Nothing is routed until the opening session check lands. Public pages
          are not behind a guard, so without this the landing page painted
          immediately, was covered by the preloader a moment later, then came
          back — three states for one arrival. Later waits (signing in, signing
          up) leave the routes mounted on purpose, so the panel lifts on a page
          that is already there. */}
      {!loading && (
        <Routes>
          {/* Signed out: the marketing header and footer. */}
          <Route element={<Layout />}>
            <Route path={routes.home} element={<HomePage />} />
            <Route path={routes.about} element={<AboutPage />} />
            <Route path={routes.legal} element={<LegalPage />} />
            <Route path={routes.privacy} element={<PrivacyPage />} />
            <Route path={routes.terms} element={<TermsPage />} />

            <Route element={<GuestRoute />}>
              <Route path={routes.login} element={<LoginPage />} />
              <Route path={routes.register} element={<RegisterPage />} />
              <Route path={routes.forgotPassword} element={<ForgotPasswordPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Signed in: the product shell with its persistent sidebar. */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path={routes.dashboard} element={<DashboardPage />} />
              <Route path={routes.recipes} element={<RecipesPage />} />
              <Route path={routes.recipeDetail} element={<RecipeDetailPage />} />

              <Route
                path={routes.inventory}
                element={
                  <ComingSoonPage
                    title="Inventaire"
                    detail="Le suivi des produits de votre frigo demande une table d'inventaire côté serveur, qui reste à créer."
                  />
                }
              />
              <Route
                path={routes.planning}
                element={
                  <ComingSoonPage
                    title="Planning"
                    detail="La planification des repas de la semaine arrivera une fois l'inventaire en place."
                  />
                }
              />
              <Route
                path={routes.health}
                element={
                  <ComingSoonPage
                    title="Forme"
                    detail="Le suivi nutritionnel nécessite des données de composition sur les ingrédients, pas encore stockées."
                  />
                }
              />
              <Route
                path={routes.profile}
                element={
                  <ComingSoonPage
                    title="Profil"
                    detail="L'API expose déjà la modification du compte : cet écran reste à construire."
                  />
                }
              />
            </Route>
          </Route>
        </Routes>
      )}
    </>
  )
}
