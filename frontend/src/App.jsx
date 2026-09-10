import { Route, Routes } from 'react-router-dom'

import { GuestRoute, ProtectedRoute } from './components/AuthRoute'
import Layout from './components/Layout'
import AboutPage from './pages/AboutPage'
import DashboardPage from './pages/DashboardPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import HomePage from './pages/HomePage'
import LegalPage from './pages/LegalPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import PrivacyPage from './pages/PrivacyPage'
import RegisterPage from './pages/RegisterPage'
import TermsPage from './pages/TermsPage'
import { routes } from './routes'

export default function App() {
  return (
    <Routes>
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

        <Route element={<ProtectedRoute />}>
          <Route path={routes.dashboard} element={<DashboardPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
