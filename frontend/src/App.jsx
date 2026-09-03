function App() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 bg-slate-900 px-6">
      <h1 className="text-6xl font-extrabold tracking-tight text-emerald-400 sm:text-8xl">
        HOMEPAGE
      </h1>

      <p className="max-w-md text-lg text-slate-300">
        Page de test. Si ce texte est centre sur fond sombre et que le titre est
        vert et enorme, Tailwind fonctionne.
      </p>

      <span className="rounded-full bg-emerald-500/10 px-4 py-1 text-sm font-medium text-emerald-300 ring-1 ring-emerald-500/40">
        Tailwind CSS 4 actif
      </span>
    </main>
  )
}

export default App
