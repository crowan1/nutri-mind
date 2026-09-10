import { Outlet } from 'react-router-dom'

import Footer from './Footer'
import Header from './Header'
import ScrollReset from './ScrollReset'

export default function Layout() {
  return (
    <div className="min-h-svh bg-page text-ink">
      <ScrollReset />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
